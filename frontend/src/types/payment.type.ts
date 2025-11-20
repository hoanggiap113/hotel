// Payment
export enum EPaymentMethod {
  CASH = "cash",
  VNPAY = "vnpay",
  MOMO = "momo"
}

export enum EPaymentStatus {
  PENDING = "pending", PAID = "paid", FAILED = "failed",
}

export interface IPayment {
  _id: string;
  bookingId: string;
  amount: number;
  method: EPaymentMethod;
  status: EPaymentStatus;
  transactionId: string | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Label cho phương thức thanh toán
export const PaymentMethodLabel: Record<EPaymentMethod, string> = {
  [EPaymentMethod.CASH]: "Thanh toán tại chỗ (Tiền mặt)",
  [EPaymentMethod.VNPAY] : "Thanh toán bằng VNPay",
  [EPaymentMethod.MOMO] : "Thanh toán bằng MOMO"
};
