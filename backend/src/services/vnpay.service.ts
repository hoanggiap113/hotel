import {injectable, BindingScope} from '@loopback/core';
import * as crypto from 'crypto';
import * as qs from 'qs';
import moment from 'moment';

@injectable({scope: BindingScope.TRANSIENT})
export class VnPayService {
  private tmnCode = process.env.VNP_TMNCODE || '';
  private hashSecret = process.env.VNP_HASHSECRET || '';
  private vnpUrl =
    process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private returnUrl = process.env.VNP_RETURNURL || '';

  constructor() {
    // Check config nếu cần
  }

  buildPaymentUrl(
    amount: number,
    ipAddr: string,
    txnRef: string,
    orderInfo: string,
  ): string {
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const orderId = moment(date).format('DDHHmmss'); // Mã đơn hàng tạm thời nếu cần

    // 1. Tạo Object tham số (Chưa encode)
    let vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = this.tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = txnRef;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = Math.floor(amount * 100); // Đảm bảo là số nguyên
    vnp_Params['vnp_ReturnUrl'] = this.returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    // 2. Sắp xếp tham số theo Key (a-z)
    // VNPay yêu cầu bắt buộc bước này
    vnp_Params = this.sortObject(vnp_Params);

    // 3. Tạo chuỗi dữ liệu để ký (Sign Data)
    // KHÔNG DÙNG QS Ở ĐÂY để tránh lỗi encode khác nhau
    const signData = Object.keys(vnp_Params)
      .map(key => {
        return (
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(vnp_Params[key]).replace(/%20/g, '+')
        );
      })
      .join('&');

    // 4. Tạo mã băm (HMAC SHA512)
    const hmac = crypto.createHmac('sha512', this.hashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // 5. Gán mã băm vào params
    vnp_Params['vnp_SecureHash'] = signed;

    // 6. Tạo URL cuối cùng (Dùng qs ở đây để tạo query string cho URL trình duyệt là an toàn)
    return this.vnpUrl + '?' + qs.stringify(vnp_Params, {encode: true});
  }

  verifyReturnUrl(vnp_Params: any): {
    isSuccess: boolean;
    message: string;
    code?: string;
    amount?: number;
    txnRef?: string;
  } {
    let secureHash = vnp_Params['vnp_SecureHash'];
    let secretKey = this.hashSecret;

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // Sắp xếp lại
    vnp_Params = this.sortObject(vnp_Params);

    // Tái tạo chuỗi ký (Giống hệt lúc tạo URL)
    const signData = Object.keys(vnp_Params)
      .map(key => {
        return (
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(vnp_Params[key]).replace(/%20/g, '+')
        );
      })
      .join('&');

    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      if (vnp_Params['vnp_ResponseCode'] === '00') {
        return {
          isSuccess: true,
          message: 'Giao dịch thành công',
          code: vnp_Params['vnp_ResponseCode'],
          amount: parseInt(vnp_Params['vnp_Amount']) / 100,
          txnRef: vnp_Params['vnp_TxnRef'],
        };
      } else {
        return {
          isSuccess: false,
          message: 'Giao dịch thất bại',
          code: vnp_Params['vnp_ResponseCode'],
          txnRef: vnp_Params['vnp_TxnRef'],
        };
      }
    } else {
      return {
        isSuccess: false,
        message: 'Checksum failed',
        txnRef: vnp_Params['vnp_TxnRef'],
      };
    }
  }

  // Hàm sort đơn giản chỉ sort key, không encode value bên trong
  private sortObject(obj: any) {
    let sorted: any = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(key);
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = obj[str[key]];
    }
    return sorted;
  }
}
