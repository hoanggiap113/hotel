import { IRoom } from "./room.type";

export enum EBookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export interface IBookingPricing {
  roomPrice: number;
  tax: number;
  discount: number;
  total: number;
}
export interface SessionBookingInfo {
  checkIn: string;
  checkOut: string;
  roomId: string;
}

export interface IBookingGuests {
  name: string;
  phone: string;
  note?: string;
  email: string;
  paymentMethod: string;
}
export interface IBooking {
  _id: string;
  userId: string;
  roomId: string;
  room?: IRoom;
  checkIn: Date;
  checkOut: Date;
  status: EBookingStatus;
  pricing: IBookingPricing;
  guests: IBookingGuests;
  createdAt: Date;
  updatedAt: Date;
  redirectUrl?: string;
}

export interface PricingBreakdown {
  roomPrice: number;
  tax: number;
  discount: number;
  total: number;
}
export interface IBookingPayload {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: {
    name: string;
    phone: string;
    email: string;
    note?: string;
  };
  paymentMethod: string;
  discountId?: string;
} 
export interface BookingResponse {
  Booking: IBooking;
  redirectUrl?: string;
}