import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Room} from './room.model';
import {User} from './user.model';
import { Payment } from './payment.model';

@model({settings: {
  mongodb: {collection: "bookings"}
}})
export class Booking extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;
  @property({
    type: 'date',
    required: true,
  })
  checkIn: Date;

  @property({
    type: 'date',
  })
  checkOut?: Date;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'object',
    required: true,
  })
  pricing: object;
  @property({
    type:'object',
    required:true
  })
  guests: Object

  @property({
    type: 'date',
  })
  createdAt: Date;

  @property({
    type: 'date',
  })
  updatedAt: Date;

  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectId'},
  })
  userId?: string;
  @belongsTo(() => User)
  user: User;

  @property({
    type: 'string',
    required: true,
    mongodb: {dataType: 'ObjectId'},
  })
  roomId: string;
  @belongsTo(() => Room)
  room: Room;

  @hasOne(() => Payment, {keyTo: 'bookingId'})
  payment: Payment;
  [prop: string]: any;

  constructor(data?: Partial<Booking>) {
    super(data);
  }
}

export interface BookingRelations {
  room?: Room;
  user?: User;
  payment?: Payment;
}

export type BookingWithRelations = Booking & BookingRelations;
