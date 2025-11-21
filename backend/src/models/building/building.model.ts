import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Room} from '../room.model';
import {User} from '../user.model';
import { Location } from '../room.model';
@model({
  settings: {
    mongodb: {collection: 'buildings'},
    indexes: {
      buildingLocationIndex: {
        keys: {
          geo: '2dsphere',
        },
      },
    },
  },
})
export class Building extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
  })
  description: string;
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'object',
    required: true,
  })
  location: {
    city: string;
    ward: string;
    address: string;
  };

  @property({
    type: 'array',
    itemType: 'string',
  })
  images?: string[];

  @property({
    type: 'number',
  })
  roomCount?: number;
  @property({
    type: 'number',
  })
  tax?: number;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @belongsTo(
    () => User,
    {name: 'user'},
    {
      type: 'string',
      required: true,
      mongodb: {dataType: 'ObjectId'},
    },
  )
  userId: string;
  //Thêm trường để làm map
  @property({
    type: 'object',
  })
  geo?: {
    type: string;
    coordinates: number[];
  };

  @hasMany(() => Room, {keyTo: 'buildingId'})
  rooms: Room[];

  constructor(data?: Partial<Building>) {
    super(data);
  }
}

export interface BuildingRelations {
  user?: User;
  rooms?: Room[];
}

export type BuildingWithRelations = Building & BuildingRelations;

//Custom interface/type
export interface AvailableBuildingResponse extends Building {
  availableRooms: Room[];
  availableRoomCount: number;
}

export type BuildingWithMinPrice = Building & {price: number};
export type BuildingDetail = {
  building: Building;
  rooms: Room[];
};

export interface BuildingFilter {
  location?: Location;
  name?:string
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

@model()
export class BuildingResponse extends Building {
  @property({
    type: 'number',
    required: true, 
  })
  minPrice: number;
}