import {Entity, model, property} from '@loopback/repository';

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
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'number',
  })
  minNights?: number;

  @property({
    type: 'number',
  })
  maxNights?: number;

  @property({
    type: 'number',
    required: true,
  })
  usageLimit: number;

  @property({
    type: 'number',
    required: true,
  })
  usedCount: number;

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

  @property({
    type: 'array',
    itemType: 'string', 
    mongodb: {dataType: 'ObjectId'},
  })
  applicableBuildingIds?: string[];
  [prop: string]: any;

  constructor(data?: Partial<Discount>) {
    super(data);
  }
}

export interface DiscountRelations {
}

export type DiscountWithRelations = Discount & DiscountRelations;
