import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {DiscountRoom} from '../models';
import {DiscountRoomRepository} from '../repositories';

export class DiscountRoomController {
  constructor(
    @repository(DiscountRoomRepository)
    public discountRoomRepository: DiscountRoomRepository,
  ) {}


  //Custom API
  @get('/discount-rooms/{roomId}')
  @response(200, {
    description: 'Discount list applied for this room',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            'x-ts-type': DiscountRoom,
          },
        },
      },
    },
  })
  async getAvailableDiscountByRoom(
    @param.path.string('roomId') roomId: string,
  ) {
    try {
      return this.discountRoomRepository.find({
        where: {roomId},
        include: [
          {
            relation: 'discount',
            scope: {
              where: {
                active: true,
              },
            },
          },
        ],
      });
    } catch (err) {
      console.log(err);
      throw HttpErrors.InternalServerError('Lỗi máy chủ');
    }
  }
}
