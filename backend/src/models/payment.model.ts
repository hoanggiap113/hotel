import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Booking} from './booking.model';

@model({
  settings: {
    mongodb: {collection: 'payments'},
  },
})
export class Payment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {
      dataType: 'ObjectId',
    },
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  method: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;
  @property({
    type: 'string',
    required: false, // Không bắt buộc vì lúc tạo payment chưa có
  })
  vnpTxnRef?: string; // Mã đơn hàng gửi sang VNPay (thường dùng luôn id hoặc mã booking)

  @property({
    type: 'string',
    required: false,
  })
  vnpTransactionNo?: string; // Mã giao dịch CỦA VNPAY trả về 

  @property({
    type: 'string',
    required: false,
  })
  vnpResponseCode?: string; // Mã lỗi chi tiết (vd: '00' là thành công, '24' là hủy gd)

  @property({
    type: 'string',
    required: false,
  })
  vnpBankCode?: string; // Ngân hàng khách dùng

  @property({
    type: 'string',
  })
  vnpPayDate?: string; // Thời gian thanh toán ghi nhận từ phía VNPay

  @property({
    type: 'date',
  })
  paidAt?: string;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  @belongsTo(() => Booking)
  bookingId: string;

  [prop: string]: any;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  booking: Booking;
}

export type PaymentWithRelations = Payment & PaymentRelations;
