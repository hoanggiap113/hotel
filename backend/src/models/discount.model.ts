import {Entity, hasMany, model, property} from '@loopback/repository';
import { DiscountRoom } from './discount-room.model';
import { Room } from './room.model';

@model({
  settings: {
    mongodb: {collection: 'discounts'},
  },
})
export class Discount extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {
      dataType: 'ObjectId',
    },
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

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
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'number',
  })
  usageLimit?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  active: boolean;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @hasMany(() => Room,{through: {model: () => DiscountRoom}})
  rooms: Room[];
  constructor(data?: Partial<Discount>) {
    super(data);
  }
}

export interface DiscountRelations {
}

export type DiscountWithRelations = Discount & DiscountRelations;
