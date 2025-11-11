// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {BookingService} from '../services';
import {patch, post, param, response, get, requestBody, del} from '@loopback/rest';
import {Booking} from '../models';
import {getModelSchemaRef} from '@loopback/rest';
import {Filter} from '@loopback/repository';

export class BookingController {
  constructor(
    @inject('services.BookingService') public bookingService: BookingService,
  ) {}

  @get('/bookings')
  @response(200, {
    description: 'Get All Booking',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Booking, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(Booking) filter?: Filter<Booking>,
  ): Promise<Booking[]> {
    return this.bookingService.getBookings(filter);
  }
  @get('/bookings/{id}')
  @response(200, {
    description: 'Get Booking',
    content: {
      'application/json': {
        schema: {items: getModelSchemaRef(Booking, {includeRelations: true})},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Booking> {
    return this.bookingService.getBooking(id);
  }

  @post('/bookings')
  @response(201, {
    description: 'Created success',
  })
  async createBooking(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {
            title: 'NewBooking',
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Booking> {
    return this.bookingService.createBooking(bookingData);
  }
  @patch('/bookings/{id}')
  @response(204, {
    description: 'update success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {
            partial: true,
            exclude: ['id', 'createdAt'],
          }),
        },
      },
    })
    bookingData: Partial<Booking>,
  ): Promise<void> {
    await this.bookingService.updateBookingById(id, bookingData);
  }
  //Xóa mềm
  @del("/bookings/{id}")
  @response(204,{
    description: "Delete Success"
  })
  async deleteBooking(@param.path.string('id') id: string){
    await this.bookingService.deleteById(id);
  }
}
