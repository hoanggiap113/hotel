import {Where} from '@loopback/repository';

import {Room} from '../models';
import { BuildingFilter } from '../models';
/**
 * Helper: Xây dựng mệnh đề 'where' cho Room
 */
export function buildRoomWhere(
  filters: BuildingFilter,
  conflictingRoomIds: string[],
): Where<Room> {
  const roomWhere: Where<Room> = {};
  if (conflictingRoomIds.length > 0) {
    roomWhere.id = {nin: conflictingRoomIds};
  }
  filters.capacity && (roomWhere.capacity = {gte: filters.capacity});

  if (filters.roomType && typeof filters.roomType === 'string') {
    roomWhere.roomType = filters.roomType;
  }
  if (filters.bedType && typeof filters.bedType === 'string') {
    roomWhere.bedType = filters.bedType;
  }
  if (filters.amenities) {
    const amenities = Array.isArray(filters.amenities)
      ? filters.amenities
      : [filters.amenities];

    if (amenities.length > 0) {
      (roomWhere as any).amenities = {all: amenities};
    }
  }
  const priceFilter: any = {};
  filters.priceFrom && (priceFilter.gte = filters.priceFrom);
  filters.priceTo && (priceFilter.lte = filters.priceTo);

  if (Object.keys(priceFilter).length > 0) {
    roomWhere.price = priceFilter;
  }

  return roomWhere;
}
