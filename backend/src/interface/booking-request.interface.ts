export interface BookingRequestInterface {
  pricing: PricingInterface;
  guests: Object;
  checkIn: string;
  checkOut?: string;
  userId?: string;
  roomId: string;
  paymentMethod: string;
  discountId?:string;
}

export interface PricingInterface {
  roomPrice: number;
  tax: number;
  discount: number;
  total: number;
}
