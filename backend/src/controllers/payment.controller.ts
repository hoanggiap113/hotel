import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  response,
  RestBindings,
  Request,
  Response,
  HttpErrors,
} from '@loopback/rest';
import {Payment, Booking} from '../models';
import {PaymentRepository, BookingRepository} from '../repositories';
import {VnPayService} from '../services/vnpay.service';

export class PaymentController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
    @repository(BookingRepository)
    public bookingRepository: BookingRepository,
    @service(VnPayService)
    public vnPayService: VnPayService,
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
  ) {}

  // --- API 1: TẠO URL THANH TOÁN (Frontend gọi cái này) ---
  @post('/payments/vnpay-url/{bookingId}')
  async createVnPayUrl(
    @param.path.string('bookingId') bookingId: string,
  ): Promise<{url: string}> {
    // 1. Tìm Booking và Payment liên quan
    const booking = await this.bookingRepository.findById(bookingId, {
      include: [{relation: 'payment'}],
    });

    if (!booking || !booking.payment) {
      throw new HttpErrors.NotFound('Booking or Payment not found');
    }

    const payment = booking.payment;

    // 2. Kiểm tra nếu đã thanh toán rồi thì chặn lại
    if (payment.status === 'completed') {
      throw new HttpErrors.BadRequest('This order has already been paid.');
    }

    // 3. Lấy IP người dùng (VNPay yêu cầu)
    // Note: Khi deploy lên server thật (qua Nginx/Proxy), có thể cần check header 'x-forwarded-for'
    const ipAddr =
      this.req.headers['x-forwarded-for'] ||
      this.req.connection.remoteAddress ||
      this.req.socket.remoteAddress ||
      '127.0.0.1';

    // 4. Gọi Service tạo URL
    // Dùng payment.id làm mã giao dịch (TxnRef)
    const url = this.vnPayService.buildPaymentUrl(
      payment.amount,
      ipAddr.toString(),
      payment.id!, // Dùng ID của payment làm mã tham chiếu
      `Thanh toan booking ${bookingId}`, 
    );

    return {url};
  }

  // --- API 2: IPN (Instant Payment Notification) - VNPay gọi ngầm vào đây ---
  // URL này phải Public ra Internet (dùng Ngrok nếu đang dev localhost)
  @get('/payments/vnpay-ipn')
  async vnpayIpn(): Promise<any> {
    const vnp_Params = this.req.query;

    // 1. Verify chữ ký
    const verify = this.vnPayService.verifyReturnUrl(vnp_Params);

    if (!verify.isSuccess) {
      return {RspCode: '97', Message: 'Checksum failed'};
    }

    const paymentId = vnp_Params['vnp_TxnRef'] as string; // Chính là payment.id mình gửi đi
    const rspCode = vnp_Params['vnp_ResponseCode'];
    const amount = parseInt(vnp_Params['vnp_Amount'] as string) / 100; // Chia 100 để về đúng tiền

    // 2. Tìm Payment trong DB
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) {
      return {RspCode: '01', Message: 'Order not found'};
    }

    // 3. Kiểm tra số tiền (Chống hack sửa amount)
    if (payment.amount !== amount) {
      return {RspCode: '04', Message: 'Amount invalid'};
    }

    // 4. Kiểm tra xem đơn này đã xử lý trước đó chưa (tránh trùng lặp)
    if (payment.status !== 'pending') {
      // Giả sử trạng thái khởi tạo là PENDING
      return {RspCode: '02', Message: 'Order already confirmed'};
    }

    // 5. Cập nhật trạng thái (Logic quan trọng nhất)
    if (rspCode === '00') {
      // Thanh toán thành công
      payment.status = 'completed';
      payment.vnpTransactionNo = vnp_Params['vnp_TransactionNo'] as string;
      payment.paidAt = new Date().toISOString();

      // Update luôn Booking status
      await this.bookingRepository.updateById(payment.bookingId, {
        status: 'CONFIRMED',
      });
    } else {
      // Thanh toán thất bại
      payment.status = 'failed';
    }

    // Lưu log response code
    payment.vnpResponseCode = rspCode as string;
    await this.paymentRepository.update(payment);

    // 6. Trả về đúng định dạng VNPay yêu cầu
    return {RspCode: '00', Message: 'Confirm Success'};
  }

  // --- API 3: RETURN URL ---
  @get('/payments/vnpay/return')
  async vnpayReturn(): Promise<any> {
    const vnp_Params = this.req.query;
    const verify = this.vnPayService.verifyReturnUrl(vnp_Params);

    // URL Frontend
    const frontendUrl = `${process.env.FRONTEND_URL}/booking/vnpay-success`;

    // 1. Nếu Checksum sai -> Redirect báo lỗi ngay, không làm gì thêm
    if (!verify.isSuccess) {
      return this.res.redirect(
        `${frontendUrl}?status=error&code=${vnp_Params['vnp_TxnRef']}&msg=ChecksumFailed`,
      );
    }

    // 2. Lấy thông tin
    const paymentId = vnp_Params['vnp_TxnRef'] as string;
    const responseCode = vnp_Params['vnp_ResponseCode']; // '00' là thành công

    try {
      // 3. Chỉ update DB ở Return URL nếu trạng thái vẫn đang là PENDING
      // Điều này giúp User thấy kết quả ngay mà không cần đợi IPN chạy xong (dù IPN thường rất nhanh)
      const payment = await this.paymentRepository.findById(paymentId);

      if (payment && payment.status === 'pending' && responseCode === '00') {
        payment.status = 'success';
        payment.vnpTransactionNo = vnp_Params['vnp_TransactionNo'] as string;
        payment.paidAt = new Date().toISOString();

        await this.paymentRepository.update(payment);

        // Update Booking
        await this.bookingRepository.updateById(payment.bookingId, {
          status: 'confirmed',
        });
      }

      // 4. Redirect về Frontend
      if (responseCode === '00') {
        return this.res.redirect(
          `${frontendUrl}?status=success&code=${paymentId}`,
        );
      } else {
        // Trường hợp verify đúng nhưng thanh toán thất bại (VD: hủy giao dịch, không đủ tiền)
        return this.res.redirect(
          `${frontendUrl}?status=failed&code=${paymentId}`,
        );
      }
    } catch (error) {
      // Phòng trường hợp lỗi DB hoặc lỗi khác, vẫn redirect về để user không bị treo
      console.error('Error in vnpayReturn:', error);
      return this.res.redirect(`${frontendUrl}?status=error&code=${paymentId}`);
    }
  }
}
