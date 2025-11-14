import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Filter, repository, FilterBuilder, Where} from '@loopback/repository';
import {BuildingRepository} from '../repositories';
import { BuildingFilterParams } from '../interface/building-filter.params';
import {Building} from '../models';
import { HttpErrors } from '@loopback/rest';
@injectable({scope: BindingScope.TRANSIENT})
export class BuildingService {
  constructor(
    @repository(BuildingRepository) private buildingRepo: BuildingRepository,
  ) {}

  async getBuildings(filtersParams?: BuildingFilterParams) {
    const filter = this.handleAdvanceQuery(filtersParams);
    return await this.buildingRepo.find(filter);
  }

  async getBuilding(id: string,filter?: Filter<Building>){
    try{
      const building = await this.buildingRepo.findById(id,filter);
      return building
    }catch(err){
      throw HttpErrors.NotFound("Không tìm thấy phòng, thử lại sau")
    }
  }
  private handleAdvanceQuery(
    filtersParams?: BuildingFilterParams,
  ): Filter<Building> {
    const filterBuilder = new FilterBuilder<Building>();

    if (!filtersParams) {
      return filterBuilder.build();
    }

    const where: any = {};
    const loc = filtersParams.location;

    if (filtersParams.name) {
      where.name = {regexp: new RegExp(filtersParams.name,'i')};
    }

    // Lọc theo chủ sở hữu (chính xác)
    if (filtersParams.userId) {
      where.userId = filtersParams.userId;
    }

    if (loc) {
      if (loc.city) {
        where['location.city'] = loc.city;
      }
      if (loc.ward) {
        where['location.ward'] = loc.ward;
      }
      if (loc.address) {
        where['location.address'] = {like: loc.address, options: 'i'};
      }
    }

    filterBuilder.where(where);

    // 5. Xử lý 'sort' (sắp xếp)
    if (filtersParams.sort) {
      switch (filtersParams.sort) {
        case 'name_asc':
          filterBuilder.order(['name ASC']);
          break;
        case 'name_desc':
          filterBuilder.order(['name DESC']);
          break;
        case 'createdAt_desc':
          filterBuilder.order(['createdAt DESC']);
          break;
      }
    }

    return filterBuilder.build();
  }

  private handleGetAvailableRoom(checkIn:string,checkOut:string){
    
  }
}
