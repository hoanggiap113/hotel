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
import {Building} from '../models';
import {RoomFilterParams} from '../interface/room-filter.params';
import { Filter } from '@loopback/repository';

export class BuildingController {
  constructor(
    @inject('services.BuildingService')
    private buildingService: BuildingService,
  ) {}

  @get('/buildings')
  @response(200)
  async getBuildings(@param.query.object('filter') query?: RoomFilterParams) {
    try {
      console.log(query);
      const buildings = await this.buildingService.getBuildings(query);
      return buildings;
    } catch (err) {
      console.log(err);
      throw HttpErrors.InternalServerError('Lỗi máy chủ');
    }
  }
  @get('buildings/{id}')
  @response(200, {
    description: 'Building model',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Building, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Building, {exclude: 'where'}) filter?: Filter<Building>,
  ): Promise<Building> {
    try {
      const building = await this.buildingService.getBuilding(id,filter);
      return building;
    } catch (err) {
      console.log(err);
      throw HttpErrors.InternalServerError('Có lỗi máy chủ, thử lại sau');
    }
  }
}
