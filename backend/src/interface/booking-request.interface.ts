export interface BookingRequestInterface {
  guests:{
    name: string,
    phone:string,
    email:string,
    note?:string
  };
  checkIn: string;
  checkOut: string;
  userId?: string;
  roomId: string;
  paymentMethod: string;
  discountId?: string;
}

