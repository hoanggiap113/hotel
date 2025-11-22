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
import { BuildingFilter } from '../models';
import { BuildingResponse } from '../models';
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
          items: getModelSchemaRef(BuildingResponse, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async getBuildings(@param.query.object('filter') filterQuery: BuildingFilter) {
    try {
      console.log(filterQuery);
      const buildings = await this.buildingService.getBuilding(filterQuery);
      return buildings;
    } catch (err) {
      console.log(err);
      throw HttpErrors.InternalServerError('Lỗi máy chủ');
    }
  }
  @get("/buildings/{id}")
  @response(200, {
    description: 'Building model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BuildingResponse, {includeRelations: true}),
      },
    },
  })
  async getBuildingById(
    @param.path.string('id') id: string,
    @param.query.string('checkIn') checkIn: string,
    @param.query.string('checkOut') checkOut: string
  ) {
    try {
      console.log(id);
      console.log(checkIn);
      console.log(checkOut);
      const building = await this.buildingService.getBuildingById(id,checkIn,checkOut);
      return building;
    } catch (err) {
      console.log(err);
      throw HttpErrors.InternalServerError('Lỗi máy chủ');
    }
  } 
}
