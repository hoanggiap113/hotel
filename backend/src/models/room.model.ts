import {Entity, model, property} from '@loopback/repository';

@model({settings : {
    mongodb: { collection: "rooms" },
}})
export class Room extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb:{dataType: 'ObjectId'}
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
    type: 'object',
    required: true,
  })
  location: object;

  @property({
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'object',
    default: {
      avarage: 0,
      reviewCount: 0
    }
  })
  rating: object;

  @property({
    type: 'array',
    itemType: 'string',
  })
  images?: string[];

  @property({
    type: 'string',
    mongodb:{dataType: 'ObjectId'}
  })
  ownerId?: string;

  @property({
    type:'date'
  })
  createdAt: Date;

  @property({
    type: 'date'
  })
  updatedAt: Date;

  constructor(data?: Partial<Room>) {
    super(data);
  }
}

export interface RoomRelations {
  // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations;
