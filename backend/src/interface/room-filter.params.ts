import {Model, model, property} from '@loopback/repository';
import {LocationFilterParams} from './location-filter.model';

@model()
export class RoomFilterParams extends Model {
  @property({
    type: 'string',
  })
  name?: string;

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
  })
  priceFrom?: number;

  @property({
    type: 'number',
  })
  priceTo?: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  amenities?: string[];

  @property({
    type: 'object',
  })
  location?: LocationFilterParams; 

  @property({
    type: 'number',
  })
  capacityFrom?: number;

  @property({
    type: 'number',
  })
  capacityTo?: number;
  

  constructor(data?: Partial<RoomFilterParams>) {
    super(data);
  }
}