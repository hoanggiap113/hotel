import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import * as QRCode from 'qrcode';
import * as nodemailer from 'nodemailer';
import {Booking} from '../models';
import * as path from 'path';
import * as ejs from 'ejs';
@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  private transporter;
  constructor(/* Add @inject to inject parameters */) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  }
  //Luồng tạo mail và QR code gửi về cho client

  /** 
   * Hàm này là hàm gửi QR code đến email của client sau khi đặt phòng thành công
   * @param{Booking} booking: - Đơn hàng 
  */
  async sendBookingQRCode(booking: Booking) {
    try {
      //Check thông tin khách hàng
      const guestInfo = booking.guests as {
        name: string;
        email: string;
        phone: string;
        note?: string;
      };
      if (!guestInfo || !guestInfo.email) {
        console.error('Không tìm thấy email khách hàng trong booking');
        return;
      }
      //Tạo QR
      const qrData = JSON.stringify({
        bookingId: booking.id,
        type: 'HOTEL_CHECKIN',
      });
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        width: 300,
      });
      const templateData = {
        name: guestInfo.name,
        bookingId: booking.id,
        checkIn: new Date(booking.checkIn).toLocaleString('vi-VN'),
        checkOut: new Date(booking.checkOut!).toLocaleString('vi-VN'),
        total: (booking.pricing as any)['total']?.toLocaleString('vi-VN'),
      };

      //Kết thúc tạo template
      
      /** 
       * Đọc và Render Template EJS
       * Lưu ý: Đường dẫn file phải tính từ thư mục chạy (thường là dist hoặc root)
       * // @param{__dirname} trong Loopback khi build ra thường nằm trong dist/services
      */

      const templatePath = path.join(
        __dirname,
        '../templates/booking-success.ejs',
      );

      // Render HTML từ file
      const htmlContent = await ejs.renderFile(templatePath, templateData);

      // 4. Gửi Email
      await this.transporter.sendMail({
        from: '"AgendaStay." <agenda@gmail.com>',
        to: guestInfo.email,
        subject: `Xác nhận đặt phòng thành công - Mã: ${booking.id}`,
        html: htmlContent, 
        attachments: [
          {
            filename: 'qrcode.png',
            path: qrCodeDataUrl,
            cid: 'bookingQRCode',
          },
        ],
      });

      // console.log('📧 Email sent to:', guestInfo.email);
    } catch (err) {
      console.log(err);
    }
  }
}
