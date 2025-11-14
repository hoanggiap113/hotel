import {model, property} from '@loopback/repository';

@model()
export class RatingValue {
  @property({type: 'number'})
  average: number;

  @property({type: 'number'})
  reviewCount: number;
}
