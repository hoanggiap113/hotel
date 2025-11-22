import {Where} from '@loopback/repository';

import {Room} from '../models';
import {BuildingFilter} from '../models';
/**
 * Helper: Xây dựng mệnh đề 'where' cho Room
 */
export default function buildRoomWhere(
  filters: BuildingFilter,
  conflictingRoomIds: string[],
): Where<Room> {
  const roomWhere: any = {};

  if (conflictingRoomIds.length > 0) {
    roomWhere.id = {nin: conflictingRoomIds};
  }

  if (filters.capacity) {
    roomWhere.capacity = {gte: filters.capacity};
  }

  if (filters.roomType && typeof filters.roomType === 'string') {
    roomWhere.roomType = filters.roomType;
  }

  if (filters.bedType && typeof filters.bedType === 'string') {
    roomWhere.bedType = filters.bedType;
  }

  if (filters.amenities && filters.amenities.length > 0) {
    const amenitiesArray = Array.isArray(filters.amenities)
      ? filters.amenities
      : [filters.amenities];


    if (amenitiesArray.length > 0) {
      const amenityConditions = amenitiesArray.map(amenity => ({
        amenities: amenity,
      }));

      if (roomWhere.and) {
        roomWhere.and.push(...amenityConditions);
      } else {
        roomWhere.and = amenityConditions;
      }
    }
  }

  // Filter theo price range
  const priceFilter: any = {};
  if (filters.priceFrom) priceFilter.gte = filters.priceFrom;
  if (filters.priceTo) priceFilter.lte = filters.priceTo;

  if (Object.keys(priceFilter).length > 0) {
    roomWhere.price = priceFilter;
  }

  return roomWhere;
}
