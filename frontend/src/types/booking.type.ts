export enum EBookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export interface IBookingPricing {
  roomPrice: number; // Tổng giá phòng (price * nights)
  tax: number;
  discount: number;
  total: number; // Tổng phải trả cuối cùng
}
export interface SessionBookingInfo{
  checkIn:string,
  checkOut:string,
  roomId:string
}

export interface IBookingGuests {
  name: string;
  phone: string;
  note?: string;
  email:string
  paymentMethod:string;
}
export interface IBooking {
  _id: string;
  userId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  status: EBookingStatus;
  pricing: IBookingPricing;
  guests: IBookingGuests;
  createdAt: Date;
  updatedAt: Date;
}

export interface PricingBreakdown {
  roomPrice: number;
  tax: number;
  discount: number;
  total: number;
}