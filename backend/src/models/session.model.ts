import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {collection: 'sessions'},
    indexes: {
      ExpireIndex: {
        keys: {expireAt: 1},
        options: {expireAfterSeconds: 0}, 
      },
    },
  },
})
export class Session extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  refreshToken: string;

  @property({
    type: 'date',
    required:true
  })
  expiresAt: Date;

  @property({
    type: 'date',
    default: new Date()
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: new Date()
  })
  updatedAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Session>) {
    super(data);
  }
}

export interface SessionRelations {
  // describe navigational properties here
}

export type SessionWithRelations = Session & SessionRelations;
