import { ILocation } from "./location.type";

// --- ENUMS ---

export enum ERoomType {
  STANDARD = "standard",
  SUPERIOR = "superior", // Bổ sung
  DELUXE = "deluxe",
  SUITE = "suite",
  SINGLE = "single",
  DOUBLE = "double",
  BUNGALOW = "bungalow", // Bổ sung
  VILLA = "villa", // Bổ sung
}

export enum EBedType {
  SINGLE = "single",
  TWIN = "twin",
  DOUBLE = "double",
  QUEEN = "queen",
  KING = "king",
}

export enum EAmenity {
  TV = "tv",
  WIFI = "wifi",
  BREAKFAST = "breakfast",
  BATHTUB = "bathtub",
  POOL = "pool",
  PARKING = "parking",
  BALCONY = "balcony",
  KITCHENETTE = "kitchenette",
  LIVING_ROOM = "living_room",
  PRIVATE_POOL = "private_pool",
  AIR_CON = "air_con",
}

// --- INTERFACES ---

export interface IRoom {
  id: string;
  _id?: string;
  name: string;
  images?: string[];
  roomType: ERoomType | string;
  bedType: EBedType | string;
  price: number;
  amenities: (EAmenity | string)[];
  capacity: number;
  rating: {
    average: number;
    reviewsCount: number;
  };
  ownerId?: string;
  buildingId?: string;
  createdAt: Date;
  updatedAt: Date;
  location: ILocation;
}

// ... (Giữ nguyên các interface Filter khác) ...
export type TRoomFormInput = Omit<
  IRoom,
  "id" | "_id" | "location" | "createdAt" | "updatedAt"
> & {
  location: ILocation;
  image?: string;
};

export interface SidebarFilterState {
  location?: ILocation;
  roomType?: string;
  bedType?: string;
  priceFrom?: number;
  priceTo?: number;
  amenities?: EAmenity[];
}

export interface BuildingFilter extends SidebarFilterState {
  checkIn?: string;
  checkOut?: string;
  capacity?: number;
}
// --- LABELS (MAPPING) ---
export const RoomTypeLabel: Record<string, string> = {
  [ERoomType.STANDARD]: "Phòng Tiêu chuẩn",
  [ERoomType.SUPERIOR]: "Phòng Cao cấp (Superior)",
  [ERoomType.DELUXE]: "Phòng Sang trọng (Deluxe)",
  [ERoomType.SUITE]: "Phòng Thượng hạng (Suite)",
  [ERoomType.SINGLE]: "Phòng Đơn",
  [ERoomType.DOUBLE]: "Phòng Đôi",
  [ERoomType.BUNGALOW]: "Nhà Bungalow",
  [ERoomType.VILLA]: "Biệt thự (Villa)",
};

export const BedTypeLabel: Record<string, string> = {
  [EBedType.SINGLE]: "Giường Đơn",
  [EBedType.TWIN]: "2 Giường Đơn (Twin)",
  [EBedType.DOUBLE]: "Giường Đôi",
  [EBedType.QUEEN]: "Giường Queen",
  [EBedType.KING]: "Giường King",
};

export const AmenityLabel: Record<string, string> = {
  [EAmenity.TV]: "TV",
  [EAmenity.WIFI]: "Wi-Fi",
  [EAmenity.BREAKFAST]: "Bữa sáng",
  [EAmenity.BATHTUB]: "Bồn tắm",
  [EAmenity.POOL]: "Hồ bơi chung",
  [EAmenity.PARKING]: "Bãi gửi xe",
  [EAmenity.BALCONY]: "Ban công",
  [EAmenity.KITCHENETTE]: "Bếp nhỏ",
  [EAmenity.LIVING_ROOM]: "Phòng khách",
  [EAmenity.PRIVATE_POOL]: "Hồ bơi riêng",
  [EAmenity.AIR_CON]: "Điều hòa",
};

export type CityOption = {
  label: string;
  value: string;
};

export const CityOptions: CityOption[] = [
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "TP.HCM", value: "Hồ Chí Minh" },
  { label: "Nha Trang", value: "Nha Trang" },
  { label: "Vũng Tàu", value: "Vũng Tàu" },
  { label: "Ninh Bình", value: "Ninh Bình" },
  { label: "Huế", value: "Huế" },
  { label: "Hội An", value: "Hội An" },
  { label: "Sa Pa", value: "Sa Pa" },
  { label: "Phú Quốc", value: "Phú Quốc" },
  { label: "Cần Thơ", value: "Cần Thơ" },
  { label: "Hạ Long", value: "Hạ Long" },
];

export interface LocationStat {
  city: string;
  count: number;
}
export interface Destination {
  name: string;
  img: string;
  stays: string;
}

export type CityImageMap = Record<string, string>;

export const CITY_IMAGES: Record<string, string> = {
  "Hà Nội": "/hanoi.jpg",
  "Đà Nẵng": "/danang.jpg",
  "Hồ Chí Minh": "/hcm.png",
  "Nha Trang": "/nhatrang.jpg",
  "Vũng Tàu": "/vungtau.jpg",
  "Hạ Long": "/halong.jpg",
  "Cần Thơ": "/cantho.webp",
  "Phú Quốc": "/phuquoc.jpg",
  "Hội An": "/hoian.png",
  "Sa Pa": "/sapa.jpg",
};

interface AmenityOption {
  label: string;
  value: EAmenity; // Sử dụng enum làm value
}
interface RoomTypeOption {
  label: string;
  value: ERoomType;
}
interface BedTypeOption {
  label: string;
  value: EBedType;
}

export const AMENITY_OPTIONS: AmenityOption[] = [
  { label: "TV", value: EAmenity.TV },
  { label: "Wifi", value: EAmenity.WIFI },
  { label: "Bữa sáng", value: EAmenity.BREAKFAST },
  { label: "Bồn tắm", value: EAmenity.BATHTUB },
  { label: "Bể bơi", value: EAmenity.POOL },
];

export const ROOMTYPE_OPTIONS: RoomTypeOption[] = [
  { label: "Phòng sang trọng", value: ERoomType.DELUXE },
  { label: "Phòng cao cấp", value: ERoomType.SUITE },
  { label: "Phòng đơn", value: ERoomType.SINGLE },
  { label: "Phòng đôi", value: ERoomType.DOUBLE },
];
export const BEDTYPE_OPTIONS: BedTypeOption[] = [
  { label: "Giường Queen", value: EBedType.QUEEN },
  { label: "Giường King", value: EBedType.KING },
  { label: "Giường Đơn", value: EBedType.SINGLE },
  { label: "Giường đôi", value: EBedType.TWIN },
];
