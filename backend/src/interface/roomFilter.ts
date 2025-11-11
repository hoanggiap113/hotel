import {Room} from '../models';
export default interface RoomFilter {
  name?: string;
  roomType?: string;
  bedType?: string;
  priceFrom?: number;
  priceTo?: number;
  amenities?: string[];
  location?: LocationFilter
  capacityFrom?: number;
  capacityTo?: number;
}

interface LocationFilter {
    city?:string;
    ward?:string;
    address?:string;
}
