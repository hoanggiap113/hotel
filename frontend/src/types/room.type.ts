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
  AIR_CONDITIONING = "air_conditioning",
  POOL = "pool",         
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
