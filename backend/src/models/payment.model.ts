import {belongsTo, Entity, model, property} from '@loopback/repository';
import { Booking } from './booking.model';

@model({settings: {
  mongodb: {collection: "payments"}
}})
export class Payment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  method: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'date',
  })
  paidAt?: string;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',

  })
  updatedAt?: Date;

  @belongsTo(() => Booking)
  bookingId: string

  [prop: string]: any;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  booking: Booking
}

export type PaymentWithRelations = Payment & PaymentRelations;
