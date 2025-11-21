import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Discount} from './discount.model';
import {Room} from '../room.model';

@model({
  settings: {
    mongodb: {collection: 'discount-rooms'},
  },
})
export class DiscountRoom extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb:{ dataType: 'ObjectId'}
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  validAt: string;

  @property({
    type: 'date',
    required: true,
  })
  validTo: string;

  @belongsTo(() => Discount)
  discountId: string;

  @belongsTo(() => Room)
  roomId: string;

  [prop: string]: any;

  constructor(data?: Partial<DiscountRoom>) {
    super(data);
  }
}

export interface DiscountRoomRelations {
  discount: Discount;
  room: Room;
}

export type DiscountRoomWithRelations = DiscountRoom & DiscountRoomRelations;
