export interface IRoomLocation {
  city: string;
  ward: string;
  address: string;
}
export enum ERoomType{
  SUITE = "suite",
  DELUXE = "deluxe",
  SINGLE = "single",
  DOUBLE = "double",
}
export enum EBedType {
  KING = "king",
  QUEEN = "queen",
  TWIN = "twin",
  SINGLE = "single",
}

export enum EAmenity {
  TV = "tv",
  WIFI = "wifi",
  BREAKFAST = "breakfast",
  BATHTUB = "bathtub",   
  POOL = "pool",
  PARKING = "parking"
}

export interface IRoom {
  id: string;
  name: string;
  description?: string;
  images?: string[];
  roomType: ERoomType;
  bedType: EBedType;
  price: number;
  amenities: EAmenity[];
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
  location: IRoomLocation;
}

export type TRoomFormInput = Omit<IRoom, "id" | "location"> & {
  name: string;
  description?: string;
  roomType: ERoomType;
  bedType: EBedType;
  price: number;
  amenities: EAmenity[];
  capacity: number;
  location: IRoomLocation;
  image?: string; 
};

export interface RoomFilter{
  name?:string,
  roomType?:string;
  bedType?:string;
  priceFrom?:number;
  priceTo?:number;
  capacity?:number;
  amenities?:EAmenity[];
  rating?:object;
}

export const RoomTypeLabel: Record<ERoomType, string> = {
  [ERoomType.SUITE]: "Phòng Suite",
  [ERoomType.DELUXE]: "Phòng Deluxe",
  [ERoomType.SINGLE]: "Phòng Đơn",
  [ERoomType.DOUBLE]: "Phòng Đôi",
};

export const BedTypeLabel: Record<EBedType, string> = {
  [EBedType.KING]: "Giường King",
  [EBedType.QUEEN]: "Giường Queen",
  [EBedType.TWIN]: "Giường Đôi (Twin)",
  [EBedType.SINGLE]: "Giường Đơn",
};

export const AmenityLabel: Record<EAmenity, string> = {
  [EAmenity.TV]: "TV",
  [EAmenity.WIFI]: "Wi-Fi",
  [EAmenity.BREAKFAST]: "Bữa sáng",
  [EAmenity.BATHTUB]: "Bồn tắm",
  [EAmenity.POOL]: "Hồ bơi",
  [EAmenity.PARKING]: "Bãi gửi xe"
};