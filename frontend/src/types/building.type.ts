import { IRoom } from "./room.type";
import { IGeoCoordinates, ILocation } from "./location.type";
export interface IBuilding {
  id?: string;
  name?: string;
  description?: string;
  images?: string[];
  geo?: IGeoCoordinates
  price: number;
  rating: {
    average: number;
    reviewsCount: number;
  };
  rooms: IRoom;
  createdAt?: Date;
  updatedAt?: Date;
  location: ILocation;
  userId?: string;
}
export interface IBuildingDetail {
  building: IBuilding;

  rooms: IRoom[];
}
export interface BuildingDetailRequest {
  id: string;
  checkIn: string;
  checkOut: string;
}
