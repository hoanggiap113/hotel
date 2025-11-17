import { IRoom } from "./room.type";
import { ILocation } from "./location.type";
export interface IBuilding {
  id?: string;
  name?: string;
  description?: string;
  images?: string[];

  price: number;
  rating: {
    average: number;
    reviewsCount: number;
  };
  rooms: IRoom
  createdAt?: Date;
  updatedAt?: Date;
  location: ILocation;
  userId?: string;
}
export interface IBuildingDetail{
  id?:string;
  name?:string;
  description?:string;
  images?:string[];

  rooms: IRoom[]
  location: ILocation
}