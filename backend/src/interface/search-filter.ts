export interface SearchFilter {
  location?: LocationFilter;
  checkIn: string;
  checkOut: string;
  capacity?: number;
  priceFrom?: number;
  priceTo?: number;
  userId?: string;
  roomType?: string[];
  bedType?: string[];
  amenities?: string[];
  skip?: number;
  limit?: number;
  buildingName?: string;

  sort?: string;
}

export interface LocationFilter {
  city?: string;
  ward?: string;
  address?: string;
}
