import {BuildingFilter} from '../models';

export default function buildBuildingWhere(
  filters: BuildingFilter,
  availableBuildingIds: string[],
): any {
  const buildingWhere: any = {
    id: {inq: availableBuildingIds},
  };

  // Filter theo tên building
  if (filters.buildingName) {
    buildingWhere.name = {
      like: filters.buildingName,
      options: 'i', // case-insensitive
    };
  }

  // Filter theo location (city, ward, address)
  if (filters.location) {
    const {city, ward, address} = filters.location;

    if (city) {
      buildingWhere['location.city'] = {
        like: city,
        options: 'i',
      };
    }

    if (ward) {
      buildingWhere['location.ward'] = {
        like: ward,
        options: 'i',
      };
    }

    if (address) {
      buildingWhere['location.address'] = {
        like: address,
        options: 'i',
      };
    }
  }

  return buildingWhere;
}
