/* eslint-disable @typescript-eslint/no-explicit-any */
// types/amenity-icons.ts

import { EAmenity, AmenityLabel } from "./amenity.type";
import type { ComponentType } from "react";

// Import Ant Design Icons
import {
  WifiOutlined,
  DesktopOutlined,
  CoffeeOutlined,
  ShopOutlined,
  CarOutlined,
  ThunderboltOutlined,
  GiftOutlined,
  LockOutlined,
  ExportOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  VerticalAlignMiddleOutlined,
  ScissorOutlined,
  HomeOutlined,
  SkinOutlined,
  BellOutlined,
  CustomerServiceOutlined,
  FireOutlined,
  TrophyOutlined,
  RestOutlined,
  ShopOutlined as RestaurantOutlined,
  CoffeeOutlined as BarOutlined,
  HeartOutlined,
  SafetyOutlined,
  StopOutlined,
} from '@ant-design/icons';

export type AntIconComponent = ComponentType<any>;

// Interface cho mapping tiện ích (bao gồm cả icon)
export interface AmenityIconMap {
  icon: AntIconComponent;
  label: string;
}

// Ánh xạ giữa EAmenity và Icon/Label
export const AmenityData: Record<EAmenity, AmenityIconMap> = {
  // Tiện nghi cơ bản
  [EAmenity.WIFI]: {
    icon: WifiOutlined,
    label: AmenityLabel[EAmenity.WIFI],
  },
  [EAmenity.TV]: {
    icon: DesktopOutlined,
    label: AmenityLabel[EAmenity.TV],
  },
  [EAmenity.BREAKFAST]: {
    icon: CoffeeOutlined,
    label: AmenityLabel[EAmenity.BREAKFAST],
  },
  [EAmenity.BATHTUB]: {
    icon: ShopOutlined,
    label: AmenityLabel[EAmenity.BATHTUB],
  },
  [EAmenity.POOL]: {
    icon: FireOutlined,
    label: AmenityLabel[EAmenity.POOL],
  },
  [EAmenity.PARKING]: {
    icon: CarOutlined,
    label: AmenityLabel[EAmenity.PARKING],
  },

  // Tiện nghi quan trọng
  [EAmenity.AIR_CONDITIONING]: {
    icon: ThunderboltOutlined,
    label: AmenityLabel[EAmenity.AIR_CONDITIONING],
  },
  [EAmenity.MINIBAR]: {
    icon: GiftOutlined,
    label: AmenityLabel[EAmenity.MINIBAR],
  },
  [EAmenity.SAFE_BOX]: {
    icon: LockOutlined,
    label: AmenityLabel[EAmenity.SAFE_BOX],
  },
  [EAmenity.BALCONY]: {
    icon: ExportOutlined,
    label: AmenityLabel[EAmenity.BALCONY],
  },
  [EAmenity.CITY_VIEW]: {
    icon: EnvironmentOutlined,
    label: AmenityLabel[EAmenity.CITY_VIEW],
  },
  [EAmenity.SEA_VIEW]: {
    icon: EyeOutlined,
    label: AmenityLabel[EAmenity.SEA_VIEW],
  },

  // Tiện nghi phòng
  [EAmenity.ELEVATOR]: {
    icon: VerticalAlignMiddleOutlined,
    label: AmenityLabel[EAmenity.ELEVATOR],
  },
  [EAmenity.HAIRDRYER]: {
    icon: ScissorOutlined,
    label: AmenityLabel[EAmenity.HAIRDRYER],
  },
  [EAmenity.KITCHEN]: {
    icon: HomeOutlined,
    label: AmenityLabel[EAmenity.KITCHEN],
  },
  [EAmenity.WASHING_MACHINE]: {
    icon: SkinOutlined,
    label: AmenityLabel[EAmenity.WASHING_MACHINE],
  },
  [EAmenity.IRON]: {
    icon: SkinOutlined,
    label: AmenityLabel[EAmenity.IRON],
  },

  // Dịch vụ
  [EAmenity.ROOM_SERVICE]: {
    icon: BellOutlined,
    label: AmenityLabel[EAmenity.ROOM_SERVICE],
  },
  [EAmenity.LAUNDRY]: {
    icon: CustomerServiceOutlined,
    label: AmenityLabel[EAmenity.LAUNDRY],
  },
  [EAmenity.AIRPORT_SHUTTLE]: {
    icon: CarOutlined,
    label: AmenityLabel[EAmenity.AIRPORT_SHUTTLE],
  },

  // Giải trí & Thư giãn
  [EAmenity.GYM]: {
    icon: TrophyOutlined,
    label: AmenityLabel[EAmenity.GYM],
  },
  [EAmenity.SPA]: {
    icon: RestOutlined,
    label: AmenityLabel[EAmenity.SPA],
  },
  [EAmenity.RESTAURANT]: {
    icon: RestaurantOutlined,
    label: AmenityLabel[EAmenity.RESTAURANT],
  },
  [EAmenity.BAR]: {
    icon: BarOutlined,
    label: AmenityLabel[EAmenity.BAR],
  },

  // Chính sách & Đặc biệt
  [EAmenity.PET_FRIENDLY]: {
    icon: HeartOutlined,
    label: AmenityLabel[EAmenity.PET_FRIENDLY],
  },
  [EAmenity.WHEELCHAIR_ACCESSIBLE]: {
    icon: SafetyOutlined,
    label: AmenityLabel[EAmenity.WHEELCHAIR_ACCESSIBLE],
  },
  [EAmenity.NON_SMOKING]: {
    icon: StopOutlined,
    label: AmenityLabel[EAmenity.NON_SMOKING],
  },
};

// Helper function để lấy icon component theo amenity
export const getAmenityIcon = (amenity: EAmenity): AntIconComponent => {
  return AmenityData[amenity]?.icon || DesktopOutlined;
};

// Helper function để lấy label theo amenity
export const getAmenityLabel = (amenity: EAmenity): string => {
  return AmenityData[amenity]?.label || amenity;
};

// Helper function để lấy cả icon và label
export const getAmenityData = (amenity: EAmenity): AmenityIconMap => {
  return AmenityData[amenity] || {
    icon: DesktopOutlined,
    label: amenity,
  };
};

// Nhóm các tiện nghi theo category để dễ hiển thị
export const AmenityCategories = {
  basic: [
    EAmenity.WIFI,
    EAmenity.TV,
    EAmenity.AIR_CONDITIONING,
    EAmenity.BREAKFAST,
  ],
  bathroom: [
    EAmenity.BATHTUB,
    EAmenity.HAIRDRYER,
  ],
  room: [
    EAmenity.MINIBAR,
    EAmenity.SAFE_BOX,
    EAmenity.BALCONY,
    EAmenity.IRON,
  ],
  view: [
    EAmenity.CITY_VIEW,
    EAmenity.SEA_VIEW,
  ],
  facilities: [
    EAmenity.POOL,
    EAmenity.GYM,
    EAmenity.SPA,
    EAmenity.RESTAURANT,
    EAmenity.BAR,
  ],
  services: [
    EAmenity.ROOM_SERVICE,
    EAmenity.LAUNDRY,
    EAmenity.AIRPORT_SHUTTLE,
    EAmenity.PARKING,
  ],
  other: [
    EAmenity.ELEVATOR,
    EAmenity.KITCHEN,
    EAmenity.WASHING_MACHINE,
    EAmenity.PET_FRIENDLY,
    EAmenity.WHEELCHAIR_ACCESSIBLE,
    EAmenity.NON_SMOKING,
  ],
};

export const CategoryLabels = {
  basic: 'Tiện nghi cơ bản',
  bathroom: 'Phòng tắm',
  room: 'Trong phòng',
  view: 'Tầm nhìn',
  facilities: 'Tiện ích chung',
  services: 'Dịch vụ',
  other: 'Khác',
};