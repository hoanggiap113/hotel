// File: src/types/discount.type.ts

export type DiscountType = 'percent' | 'fixed' | 'nightly';

export interface IDiscount {
  id: string; // Trong ảnh Postman là "id", nhưng DB gốc là "_id", nên handle cả 2
  _id?: string; 
  code: string;
  name: string;
  description?: string;
  type: DiscountType;
  value: number;
  active: boolean;
}

// Interface cho response từ API /discount-rooms/for-room/...
export interface IDiscountRoomResponse {
  id: string;
  validAt: string;
  validTo: string;
  roomId: string;
  discountId: string;
  discount: IDiscount; // <--- Quan trọng: Object discount lồng bên trong
}