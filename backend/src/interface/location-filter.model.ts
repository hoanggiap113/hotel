import {Model, model, property} from '@loopback/repository';

@model()
export class LocationFilterParams extends Model {
  @property({
    type: 'string',
  })
  city?: string;
  @property({
    type: 'string',
  })
  ward?: string;
  @property({
    type: 'string',
  })
  address?: string;

  constructor(data?: Partial<LocationFilterParams>) {
    super(data);
  }
}
