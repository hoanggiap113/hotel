import { BuildingFilter } from "../models";

  export function buildBuildingWhere(
    filters: BuildingFilter,
    availableBuildingIds: string[],
  ): any { 
    
    const buildingWhere: any = {
      id: {inq: availableBuildingIds}, 
    };

    filters.buildingName &&
      (buildingWhere.name = {like: `%${filters.buildingName}%`});

    if (filters.location) {
      const {city, ward, address} = filters.location;
      console.log('Filters location:', filters.location);
      city && (buildingWhere['location.city'] = {like: city});
      ward && (buildingWhere['location.ward'] = {like: ward});
      address && (buildingWhere['location.address'] = {like: address});
    }

    return buildingWhere;
  }