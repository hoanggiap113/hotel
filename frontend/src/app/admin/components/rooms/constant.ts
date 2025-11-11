import { EAmenity, EBedType, ERoomType } from "@/types/room.type";

interface AmenityOption {
  label: string;
  value: EAmenity; // Sử dụng enum làm value
}
interface RoomTypeOption{
    label:string;
    value: ERoomType
}
interface BedTypeOption{
    label:string;
    value: EBedType
}

export const AMENITY_OPTIONS: AmenityOption[] = [
  { label: "TV", value: EAmenity.TV },
  { label: "Wifi", value: EAmenity.WIFI },
  { label: "Bữa sáng", value: EAmenity.BREAKFAST },
  { label: "Bồn tắm", value: EAmenity.BATHTUB },
  { label: "Điều hòa", value: EAmenity.AIR_CONDITIONING },
  { label: "Bể bơi", value: EAmenity.POOL },
];

export const ROOMTYPE_OPTIONS: RoomTypeOption[] = [
    {label: "Phòng sang trọng", value: ERoomType.DELUXE},
    {label: "Phòng cao cấp", value: ERoomType.SUITE},
    {label: "Phòng đơn", value: ERoomType.SINGLE},
    {label: "Phòng đôi", value: ERoomType.DOUBLE}
]
export const BEDTYPE_OPTIONS: BedTypeOption[] = [
    {label: "Giường Queen", value:EBedType.QUEEN},
    {label: "Giường King", value:EBedType.KING},
    {label: "Giường Đơn", value:EBedType.SINGLE},
    {label: "Giường đôi", value:EBedType.TWIN}

]