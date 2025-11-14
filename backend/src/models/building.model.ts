import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {ObjectId} from 'mongodb';
import {Room} from './room.model';
import {User} from './user.model';

@model({
  settings: {
    mongodb: {collection: 'buildings'},
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
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectId'},
  })
  userId: string;
  @belongsTo(() => User)
  user: User;

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
