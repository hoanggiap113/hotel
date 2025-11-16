// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {BuildingService} from '../services';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  response,
} from '@loopback/rest';
import {SearchFilter} from '../interface/search-filter';
import {BuildingResponseResult} from '../interface/response/building-response.model';
export class BuildingController {
  constructor(
    @inject('services.BuildingService')
    private buildingService: BuildingService,
  ) {}

  @get('/buildings/search')
  @response(200, {
    description: 'Array of Building model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BuildingResponseResult, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async getBuildings(@param.query.object('filter') filterQuery: SearchFilter) {
    try {
      const buildings = await this.buildingService.getBuilding(filterQuery);
      return buildings;
    } catch (err) {
      console.log(err);
      throw HttpErrors.InternalServerError('Lỗi máy chủ');
    }
  }
}
