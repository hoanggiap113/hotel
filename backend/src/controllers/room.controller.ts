import {authenticate} from '@loopback/authentication';
import {authorize, AuthorizationMetadata} from '@loopback/authorization';
import {HttpErrors} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  post,
  requestBody,
  response,
  RestBindings,
} from '@loopback/rest';
import {Room} from '../models';
import {RoomService} from '../services';
import {inject} from '@loopback/core';
import RoomFilter from '../interface/roomFilter';

export class RoomController {
  constructor(
    @inject('services.RoomService')
    public roomService: RoomService,
  ) {}

  @get('/rooms')
  @response(200, {
    description: 'Room model instance',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Room, {includeRelations: true}),
        },
      },
    },
  })
  async find(
     @param.query.object('filter', {
      type: 'object',
      properties: {
        name: {type: 'string'},
        roomType: {type: 'string'},
        bedType: {type: 'string'},
        priceFrom: {type: 'number'},
        priceTo: {type: 'number'},
        amenities: {type: 'array', items: {type: 'string'}},
        capacityFrom: {type: 'number'},
        capacityTo: {type: 'number'},
        location: {
          type: 'object',
          properties: {
            city: {type: 'string'},
            ward: {type: 'string'},
            address: {type: 'string'},
          },
        },
      },
    })
    roomFilter?: RoomFilter,
): Promise<Room[]> {
  console.log(roomFilter);
    const rooms = await this.roomService.getRooms(roomFilter);
    if (rooms.length < 0) {
      throw HttpErrors.NotFound('Không tìm thấy phòng nào');
    }
    return rooms;
  }

  @post('/rooms')
  @authenticate('jwt')
  @authorize({roles: ['admin', 'manager']} as AuthorizationMetadata)
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewroomDTO',
            exclude: ['id', 'createdAt', 'updatedAt', 'ownerId'],
          }),
        },
      },
    })
    roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Room> {
    const ownerId = currentUserProfile.id;
    return await this.roomService.createRoom(roomData, ownerId);
  }

  @get('/rooms/{id}')
  @response(200, {
    description: 'Room model',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Room, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Room> {
    const room = await this.roomService.getRoom(id);
    if (!room) {
      throw HttpErrors.NotFound('Phòng không tồn tại hoặc đã bị xóa');
    }
    return room;
  }

  @patch('/rooms/{id}')
  @authenticate('jwt')
  @authorize({roles: ['admin', 'manager']} as AuthorizationMetadata)
  @response(204, {
    description: 'Updated Room success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            partial: true,
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    roomData: Partial<Room>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    const userId = currentUserProfile.id;
    await this.roomService.updateRoomById(id, roomData, userId);
  }

  @del('/rooms/{id}')
  @authenticate('jwt')
  @authorize({roles: ['admin', 'manager']} as AuthorizationMetadata)
  @response(204, {
    description: 'Đã xóa',
  })
  async delete(
    @param.path.string('id') id: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    const userId = currentUserProfile.id;
    await this.roomService.deleteRoomById(id, userId);
  }
  @get('/rooms/most-picked')
  @response(200)
  async getMostPickedRoom(){
      const collection = await this.roomService.getMostPickedRoom(4);
      return collection;
  }
}
