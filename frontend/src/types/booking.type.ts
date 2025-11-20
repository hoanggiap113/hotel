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
  room?:IRoom
  checkIn: Date;
  checkOut: Date;
  status: EBookingStatus;
  pricing: IBookingPricing;
  guests: IBookingGuests;
  createdAt: Date;
  updatedAt: Date;
  redirectUrl?: string
}


export interface PricingBreakdown {
  roomPrice: number;
  tax: number;
  discount: number;
  total: number;
}
export interface CreateBookingPayload {
  roomId: string;
  checkIn: Date | string;
  checkOut: Date | string;
  guestInfo: {
    name: string;
    phone: string;
    email: string;
    note?: string;
  };
  discountId?: string; 
  paymentMethod: string; 
}
