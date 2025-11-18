export interface RoomDetailResponse {
  id: string;
  name: string;
  pricing: BreakDown;
  amenities: string[];
  bedType: string;
  roomType: string;
  capacity: number;
  description: string;
  location: {
    city: string;
    ward: string;
    address: string;
  };
}

export interface BreakDown{
    roomPrice: number;
    tax: number;
    discount: number;
    total: number;
}