import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository, Where} from '@loopback/repository';
import {
  BuildingRepository,
  RoomRepository,
  BookingRepository,
} from '../repositories';
import {
  Booking,
  BuildingFilter,
  Room,
  BuildingWithMinPrice,
  BuildingDetail,
} from '../models';
import {filter} from 'lodash';
import {HttpErrors} from '@loopback/rest';
import buildRoomWhere from '../helpers/room.helper';
import buildBuildingWhere from '../helpers/building.helper';
// Kiểu trả về tùy chỉnh

@injectable({scope: BindingScope.TRANSIENT})
export class BuildingService {
  constructor(
    @repository(BuildingRepository) private buildingRepo: BuildingRepository,
    @repository(RoomRepository) private roomRepo: RoomRepository,
    @repository(BookingRepository) private bookingRepo: BookingRepository, // <-- Inject
  ) {}

  async getBuilding(
    filtersParams: BuildingFilter,
  ): Promise<BuildingWithMinPrice[]> {

    const conflictingRoomIds = await this.getConflictingRoomIds(
      filtersParams.checkIn,
      filtersParams.checkOut,
    );
    console.log('Conflicting rooms:', conflictingRoomIds.length);

    const roomWhere = buildRoomWhere(filtersParams, conflictingRoomIds);

    const availableRooms = await this.roomRepo.find({
      where: roomWhere,
      fields: ['id', 'buildingId', 'price'],
    });
    console.log('Available rooms:', availableRooms.length);

    if (availableRooms.length === 0) {
      return []; 
    }

    const availableBuildingIds = [
      ...new Set(availableRooms.map(r => r.buildingId.toString())),
    ];
    const buildingWhere = buildBuildingWhere(
      filtersParams,
      availableBuildingIds,
    );

    const finalBuildings = await this.buildingRepo.find({
      where: buildingWhere,
    });
    console.log('Final buildings:', finalBuildings.length);

    const result = finalBuildings.map(building => {
      const roomsOfThisBuilding = availableRooms.filter(
        r => r.buildingId.toString() === building.id?.toString(),
      );

      const prices = roomsOfThisBuilding
        .map(r => r.price)
        .filter((p): p is number => typeof p === 'number');

      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      return {
        ...building.toJSON(),
        price: minPrice,
      } as BuildingWithMinPrice;
    });

    if (filtersParams.sort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filtersParams.sort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }
  async getBuildingById(
    id: string,
    checkIn: string,
    checkOut: string,
  ): Promise<BuildingDetail | null> {
    let buildingResponse: BuildingDetail;
    const building = await this.buildingRepo.findById(id);
    if (!building) {
      throw new HttpErrors.NotFound('Không tìm thấy tòa nhà');
    }
    const conflictingRoomIds = await this.getConflictingRoomIds(
      checkIn,
      checkOut,
    );
    console.log(conflictingRoomIds);
    const roomWhere: Where<Room> = {};
    if (conflictingRoomIds.length > 0) {
      roomWhere.id = {nin: conflictingRoomIds};
    }
    roomWhere.buildingId = building.id;
    const rooms = await this.roomRepo.find({
      where: roomWhere,
    });

    return {
      building: building,
      rooms: rooms,
    };
  }
  private async getConflictingRoomIds(
  checkInStr: string,
  checkOutStr: string,
): Promise<string[]> {
  if (!checkInStr || !checkOutStr) {
    return [];
  }

  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    return [];
  }

  const whereBooking: Where<Booking> = {
    and: [
      { status: { neq: 'cancelled' } },
      { checkIn: { lt: checkOut } },
      { checkOut: { gt: checkIn } },
    ],
  };

  const conflictedBookings = await this.bookingRepo.find({
    where: whereBooking,
    fields: { roomId: true },
  });

  return [...new Set(conflictedBookings.map(b => b.roomId))];
}
}
