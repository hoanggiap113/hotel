// types/amenity-icons.ts

import { EAmenity, AmenityLabel } from "./room.type";

export type IconName = string;

// Interface cho mapping tiện ích (bao gồm cả icon)
export interface AmenityIconMap {
  icon: IconName;
  label: string;
}

// Ánh xạ giữa EAmenity và Icon/Label
export const AmenityData: Record<EAmenity, AmenityIconMap> = {
  [EAmenity.WIFI]: {
    icon: 'fas fa-wifi',
    label: AmenityLabel[EAmenity.WIFI], // Wi-Fi
  },
  [EAmenity.BREAKFAST]: {
    icon: 'fas fa-mug-hot',
    label: AmenityLabel[EAmenity.BREAKFAST], // Bữa sáng
  },
  [EAmenity.TV]: {
    icon: 'fas fa-tv', // Giả sử icon TV là 'fas fa-tv'
    label: AmenityLabel[EAmenity.TV], // TV
  },
  [EAmenity.BATHTUB]: {
    icon: 'fas fa-bath', // Giả sử icon Bồn tắm là 'fas fa-bath'
    label: AmenityLabel[EAmenity.BATHTUB], // Bồn tắm
  },
  [EAmenity.POOL]: {
    icon: 'fas fa-swimming-pool',
    label: AmenityLabel[EAmenity.POOL], // Hồ bơi
  },
  [EAmenity.PARKING]: {
    icon: 'fas fa-parking',
    label: AmenityLabel[EAmenity.PARKING], // Bãi gửi xe
  },
  // Thêm các tiện ích khác nếu có trong EAmenity
};

