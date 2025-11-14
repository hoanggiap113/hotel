import {Model, model, property} from '@loopback/repository';
import {LocationFilterParams} from './location-filter.model'; 
@model()
export class BuildingFilterParams extends Model {
  @property({
    type: 'string',
  })
  name?: string; 

  @property({
    type: 'string',
  })
  userId?: string; 

  @property({
    type: 'object',
  })
  location?: LocationFilterParams; 

  @property({
    type: 'string',
  })
  sort?: string; 

  constructor(data?: Partial<BuildingFilterParams>) {
    super(data);
  }
}