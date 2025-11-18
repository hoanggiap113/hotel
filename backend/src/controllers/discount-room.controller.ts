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

  @post('/discount-rooms')
  @response(200, {
    description: 'DiscountRoom model instance',
    content: {'application/json': {schema: getModelSchemaRef(DiscountRoom)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRoom, {
            title: 'NewDiscountRoom',
            exclude: ['id'],
          }),
        },
      },
    })
    discountRoom: Omit<DiscountRoom, 'id'>,
  ): Promise<DiscountRoom> {
    return this.discountRoomRepository.create(discountRoom);
  }

  @get('/discount-rooms/count')
  @response(200, {
    description: 'DiscountRoom model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DiscountRoom) where?: Where<DiscountRoom>,
  ): Promise<Count> {
    return this.discountRoomRepository.count(where);
  }

  @get('/discount-rooms')
  @response(200, {
    description: 'Array of DiscountRoom model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DiscountRoom, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DiscountRoom) filter?: Filter<DiscountRoom>,
  ): Promise<DiscountRoom[]> {
    return this.discountRoomRepository.find(filter);
  }

  @patch('/discount-rooms')
  @response(200, {
    description: 'DiscountRoom PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRoom, {partial: true}),
        },
      },
    })
    discountRoom: DiscountRoom,
    @param.where(DiscountRoom) where?: Where<DiscountRoom>,
  ): Promise<Count> {
    return this.discountRoomRepository.updateAll(discountRoom, where);
  }

  @get('/discount-rooms/{id}')
  @response(200, {
    description: 'DiscountRoom model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DiscountRoom, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DiscountRoom, {exclude: 'where'})
    filter?: FilterExcludingWhere<DiscountRoom>,
  ): Promise<DiscountRoom> {
    return this.discountRoomRepository.findById(id, filter);
  }

  @patch('/discount-rooms/{id}')
  @response(204, {
    description: 'DiscountRoom PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRoom, {partial: true}),
        },
      },
    })
    discountRoom: DiscountRoom,
  ): Promise<void> {
    await this.discountRoomRepository.updateById(id, discountRoom);
  }

  @put('/discount-rooms/{id}')
  @response(204, {
    description: 'DiscountRoom PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() discountRoom: DiscountRoom,
  ): Promise<void> {
    await this.discountRoomRepository.replaceById(id, discountRoom);
  }

  @del('/discount-rooms/{id}')
  @response(204, {
    description: 'DiscountRoom DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.discountRoomRepository.deleteById(id);
  }

  //Custom API
  @get('/discount-rooms/for-room/{roomId}')
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
        include: [{relation: 'discount'}],
      });
    } catch (err) {
      console.log(err);
      throw HttpErrors.InternalServerError('Lỗi máy chủ');
    }
  }
}
