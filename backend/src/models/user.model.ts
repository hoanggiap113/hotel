import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {collection: 'users'},
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  roles: string[];

  @property({
    type: 'date',
  })
  createdAt: Date;

  @property({
    type: 'date',
  })
  updatedAt: Date;
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
