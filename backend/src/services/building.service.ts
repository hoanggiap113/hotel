import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository, Where} from '@loopback/repository';
import {
  BuildingRepository,
  RoomRepository,
  BookingRepository,
} from '../repositories';
import {Building} from '../models';
import {SearchFilter} from '../interface/search-filter';
import {buildRoomWhere} from '../helpers/room.helper';
import {buildBuildingWhere} from '../helpers/building.helper';
import { filter } from 'lodash';
// Kiểu trả về tùy chỉnh
type BuildingWithMinPrice = Building & {price: number};

@injectable({scope: BindingScope.TRANSIENT})
export class BuildingService {
  constructor(
    @repository(BuildingRepository) private buildingRepo: BuildingRepository,
    @repository(RoomRepository) private roomRepo: RoomRepository,
    @repository(BookingRepository) private bookingRepo: BookingRepository, // <-- Inject
  ) {}

  /**
   * Tìm kiếm tòa nhà bằng cách dùng nhiều hàm 'find' và 'where'.
   */
async getBuilding(
    filtersParams: SearchFilter,
  ): Promise<BuildingWithMinPrice[]> {
    
    const conflictingRoomIds = await this.getConflictingRoomIds(
      filtersParams.checkIn,
      filtersParams.checkOut,
    );

    //Build query cho Room và tìm phòng hợp lệ
    const roomWhere = buildRoomWhere(filtersParams, conflictingRoomIds);
    const availableRooms = await this.roomRepo.find({
      where: roomWhere,
      fields: ['id', 'buildingId', 'price'],
    });

    if (availableRooms.length === 0) {
      return []; // Không có phòng nào, dừng sớm
    }

    // BƯỚC 3: Build query cho Building và tìm tòa nhà
    const availableBuildingIds = [
      ...new Set(availableRooms.map(r => r.buildingId)),
    ];
    const buildingWhere = buildBuildingWhere(
      filtersParams,
      availableBuildingIds,
    );
    const finalBuildings = await this.buildingRepo.find({
      where: buildingWhere,
    });

    // BƯỚC 4: Gắn giá phòng thấp nhất vào từng tòa nhà và sắp xếp nếu cần
    const result = finalBuildings.map(building => {
      const roomsOfThisBuilding = availableRooms.filter(
        r => r.buildingId.toString() === building.id?.toString(),
      );
      const prices = roomsOfThisBuilding.map(r => r.price).filter(p => typeof p === 'number');
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      
      return {
        ...building.toJSON(),
        price: minPrice,
      } as BuildingWithMinPrice;
    });

    filtersParams.sort === 'price_asc' && result.sort((a, b) => a.price - b.price);
    filtersParams.sort === 'price_desc' && result.sort((a, b) => b.price - a.price);

    return result;
  }
  //Lấy danh sách roomId bị bị booked trong khoảng thời gian đã cho
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

    const conflictingBookings = await this.bookingRepo.find({
      where: {
        and: [
          {status: {neq: 'cancelled'}}, 
          {checkIn: {lt: checkOut}},
          {checkOut: {gt: checkIn}},
        ],
      },
      fields: {roomId: true}, 
    });
    //Đây là danh sách các roomId không trùng lịch
    return [...new Set(conflictingBookings.map(b => b.roomId))];
  }
}
