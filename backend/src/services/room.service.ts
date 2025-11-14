import {injectable, BindingScope} from '@loopback/core';
import {Room} from '../models';
import {repository} from '@loopback/repository';
import {RoomRepository} from '../repositories/room.repository';
import {Filter} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import RoomFilter from '../interface/roomFilter';
import {BookingRepository} from '../repositories/booking.repository';
@injectable({scope: BindingScope.TRANSIENT})
export class RoomService {
  constructor(
    @repository(RoomRepository)
    public roomRepository: RoomRepository,
    @repository(BookingRepository)
    public bookingRepository: BookingRepository,
  ) {}

  async getRooms(roomFilter?: RoomFilter): Promise<Room[]> {
    const where = this.handleAdvanceQuery(roomFilter);
    if (roomFilter?.checkIn && roomFilter?.checkOut) {
      const checkIn = new Date(roomFilter.checkIn);
      const checkOut = new Date(roomFilter.checkOut);

      const bookedRoom = await this.bookingRepository.find({
        where: {
          and: [{checkIn: {lt: checkOut}}, {checkOut: {gt: checkIn}}],
        },
        fields: {roomId: true},
      });
      const bookRoomIds = bookedRoom.map(b => b.roomId);
      if(bookRoomIds.length > 0){
        where.id = {nin: bookRoomIds};
      }
    }
    const queryFilter: Filter<Room> = {
      where,
      order: ['createdAt DESC'],
    };
    const rooms = await this.roomRepository.find(queryFilter);
    return rooms;
  }

  async getRoom(id: string): Promise<Room> {
    const room = await this.roomRepository.findById(id);
    return room;
  }

  async createRoom(
    roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>,
    ownerId: string,
  ): Promise<Room> {
    await this.checkValidate(roomData.name);
    const room: Room = {
      ...roomData,
      ownerId: ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await this.roomRepository.create(room);
  }

  async updateRoomById(
    id: string,
    roomData: Partial<Room>,
    userId: string,
  ): Promise<void> {
    const room = await this.roomRepository.findById(id);
    if (userId !== room.ownerId?.toString()) {
      throw HttpErrors.Forbidden('Bạn không có quyền được xóa phòng này');
    }

    if (roomData.name) {
      await this.checkValidate(roomData.name, id);
    }
    const updatedData = {
      ...roomData,
      updatedAt: new Date(),
    };

    await this.roomRepository.updateById(id, updatedData);
  }

  async deleteRoomById(id: string, userId: string): Promise<void> {
    const room = await this.roomRepository.findById(id);
    if (userId !== room.ownerId?.toString()) {
      throw HttpErrors.Forbidden('Bạn không có quyền được xóa phòng này');
    }

    await this.roomRepository.deleteById(id);
  }

  async checkValidate(name: string, currentId?: string): Promise<void> {
    const whereFilter: any = {name: name};

    if (currentId) {
      whereFilter.id = {neq: currentId};
    }
    const result = await this.roomRepository.count(whereFilter);
    if (result.count > 0) {
      throw new HttpErrors.Conflict(`Tên phòng ${name} đã tồn tại.`);
    }
  }
  async getMostPickedRoom(limit: 4) {
    const collection = await this.roomRepository.getMostPickedRoom(limit);
    return collection;
  }

  //Advance Query
  handleAdvanceQuery(queryFilter?: RoomFilter) {
    const where: any = {};
    if (queryFilter?.name) {
      where.name = {regexp: new RegExp(queryFilter.name, 'i')};
    }
    if (queryFilter?.roomType) {
      where.roomType = queryFilter.roomType;
    }
    if (queryFilter?.bedType) {
      where.bedType = queryFilter.bedType;
    }
    if (queryFilter?.priceFrom || queryFilter?.priceTo) {
      where.price = {};
      if (queryFilter.priceFrom) where.price.gte = queryFilter.priceFrom;
      if (queryFilter.priceTo) where.price.lte = queryFilter.priceTo;
    }
    if (queryFilter?.capacityFrom || queryFilter?.capacityTo) {
      where.capacity = {};
      if (queryFilter.capacityFrom)
        where.capacity.gte = queryFilter.capacityFrom;
      if (queryFilter.capacityTo) where.capacity.lte = queryFilter.capacityTo;
    }

    if (queryFilter?.amenities?.length) {
      where.amenities = {inq: queryFilter.amenities};
    }
    if (queryFilter?.location?.city) {
      where['location.city'] = queryFilter.location.city;
    }
    if (queryFilter?.location?.ward) {
      where['location.ward'] = queryFilter.location.ward;
    }
    if (queryFilter?.location?.address) {
      where['location.address'] = {
        regexp: new RegExp(queryFilter.location.address, 'i'),
      };
    }
    return where;
  }
}
