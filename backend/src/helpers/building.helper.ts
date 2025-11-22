import {BuildingFilter} from '../models';

export default function buildBuildingWhere(
  filters: BuildingFilter,
  availableBuildingIds: string[],
): any {
  console.log("Aahahah:",filters);

  const buildingWhere: any = {
    id: {inq: availableBuildingIds},
  };
  if (filters.buildingName) {
    buildingWhere.name = {
      like: filters.buildingName,
      options: 'i',
    };
  }

  if (filters.location) {
    console.log(filters.location);
    const {city, ward, address} = filters.location;
  }
  return buildingWhere;
}
