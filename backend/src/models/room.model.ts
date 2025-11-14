import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Building} from './building.model';

@model({
  settings: {
    mongodb: {collection: 'rooms'},
  },
})
export class Room extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  roomType?: string;

  @property({
    type: 'string',
  })
  bedType?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  amenities: string[];

  @property({
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'object',
    default: {
      avarage: 0,
      reviewCount: 0,
    },
  })
  rating: object;

  @property({
    type: 'array',
    itemType: 'string',
  })
  images?: string[];

  @property({
    type: 'date',
  })
  createdAt: Date;

  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectId'},
  })
  ownerId: string;
  @property({
    type: 'date',
  })
  updatedAt: Date;
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectId'},
    required: true,
  })
  buildingId: string;

  @belongsTo(() => Building)
  building: Building;
  constructor(data?: Partial<Room>) {
    super(data);
  }
}

export interface RoomRelations {
  buildings: Building[]
}

export type RoomWithRelations = Room & RoomRelations;
