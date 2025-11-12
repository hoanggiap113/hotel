// Payment
export enum EPaymentMethod {
  CREDIT_CARD = "credit_card",
  CASH = "cash",
  BANK_TRANSFER = "bank_transfer",
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
  [EPaymentMethod.CREDIT_CARD]: "Thẻ Tín Dụng/Ghi Nợ",
  [EPaymentMethod.CASH]: "Thanh toán tại chỗ (Tiền mặt)",
  [EPaymentMethod.BANK_TRANSFER]: "Chuyển khoản ngân hàng",
};
