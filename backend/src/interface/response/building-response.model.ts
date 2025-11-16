import {Model, model, property} from '@loopback/repository';
import { Building } from '../../models';
@model()
export class BuildingResponseResult extends Building {
  @property({
    type: 'number',
    required: true,
  })
  minPrice: number;
}
