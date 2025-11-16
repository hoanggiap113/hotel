import { Building } from "../models/building.model";
import { Room } from "../models/room.model";

export interface AvailableBuildingResponse extends Building {
  availableRooms: Room[];
  availableRoomCount: number;
}
