import {EBedType, ERoomType, IRoom } from "./room.type";
import { EAmenity } from "./amenity/amenity.type";
import { ILocation } from "./location.type";
export interface IBuilding {
  id?: string;
  name?: string;
  description?: string;
  images?: string[];
  roomType: ERoomType;
  bedType: EBedType;
  price: number;
  capacity: number;
  rating: {
    average: number;
    reviewsCount: number;
  };
  rooms: IRoom
  createdAt?: Date;
  updatedAt?: Date;
  location: ILocation;
}