export enum EAmenity {
  TV = "tv",
  WIFI = "wifi",
  BREAKFAST = "breakfast",
  BATHTUB = "bathtub",
  POOL = "pool",
  PARKING = "parking",

  AIR_CONDITIONING = "air_conditioning",
  MINIBAR = "minibar",
  SAFE_BOX = "safe_box",
  BALCONY = "balcony",
  CITY_VIEW = "city_view",
  SEA_VIEW = "sea_view",

  ELEVATOR = "elevator",
  HAIRDRYER = "hairdryer",
  KITCHEN = "kitchen",
  WASHING_MACHINE = "washing_machine",
  IRON = "iron",

  // Dịch vụ
  ROOM_SERVICE = "room_service",
  LAUNDRY = "laundry",
  AIRPORT_SHUTTLE = "airport_shuttle", // Đưa đón sân bay

  // Giải trí
  GYM = "gym", // Phòng gym
  SPA = "spa", // Spa
  RESTAURANT = "restaurant", // Nhà hàng
  BAR = "bar", // Quầy bar

  // Khác
  PET_FRIENDLY = "pet_friendly", // Cho phép thú cưng
  WHEELCHAIR_ACCESSIBLE = "wheelchair_accessible", // Phù hợp xe lăn
  NON_SMOKING = "non_smoking", // Không hút thuốc
}

export const AmenityLabel: Record<EAmenity, string> = {
  [EAmenity.TV]: "TV",
  [EAmenity.WIFI]: "Wi-Fi",
  [EAmenity.BREAKFAST]: "Bữa sáng",
  [EAmenity.BATHTUB]: "Bồn tắm",
  [EAmenity.POOL]: "Hồ bơi",
  [EAmenity.PARKING]: "Bãi đỗ xe",

  [EAmenity.AIR_CONDITIONING]: "Điều hòa",
  [EAmenity.MINIBAR]: "Tủ lạnh mini",
  [EAmenity.SAFE_BOX]: "Két sắt",
  [EAmenity.BALCONY]: "Ban công",
  [EAmenity.CITY_VIEW]: "View thành phố",
  [EAmenity.SEA_VIEW]: "View biển",

  [EAmenity.ELEVATOR]: "Thang máy",
  [EAmenity.HAIRDRYER]: "Máy sấy tóc",
  [EAmenity.KITCHEN]: "Bếp",
  [EAmenity.WASHING_MACHINE]: "Máy giặt",
  [EAmenity.IRON]: "Bàn ủi",

  [EAmenity.ROOM_SERVICE]: "Dịch vụ phòng",
  [EAmenity.LAUNDRY]: "Giặt ủi",
  [EAmenity.AIRPORT_SHUTTLE]: "Đưa đón sân bay",

  [EAmenity.GYM]: "Phòng gym",
  [EAmenity.SPA]: "Spa",
  [EAmenity.RESTAURANT]: "Nhà hàng",
  [EAmenity.BAR]: "Quầy bar",

  [EAmenity.PET_FRIENDLY]: "Cho phép thú cưng",
  [EAmenity.WHEELCHAIR_ACCESSIBLE]: "Phù hợp xe lăn",
  [EAmenity.NON_SMOKING]: "Không hút thuốc",
};
