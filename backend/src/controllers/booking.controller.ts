// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {BookingService} from '../services';
import {
  patch,
  post,
  param,
  response,
  get,
  requestBody,
  del,
  HttpErrors,
} from '@loopback/rest';
import {Booking} from '../models';
import {getModelSchemaRef} from '@loopback/rest';
import {BookingRequestInterface} from '../interface/booking-request.interface';
import {repository} from '@loopback/repository';
import {BookingRepository} from '../repositories';

export class BookingController {
  constructor(
    @inject('services.BookingService') public bookingService: BookingService,
    @repository(BookingRepository) public bookingRepo: BookingRepository,
  ) {}
  @post('/bookings')
  @response(200, {
    description: 'Booking model instance',
    content: {'application/json': {schema: getModelSchemaRef(Booking)}},
  })
  async createBooking(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              checkIn: {type: 'string', format: 'date-time'},
              checkOut: {type: 'string', format: 'date-time'},
              roomId: {type: 'string'},
              guests: {type: 'object'},
              paymentMethod: {type: 'string'},
              discountId: {type: 'string'},
            },
          },
        },
      },
    })
    bookingData: BookingRequestInterface,
  ): Promise<{booking: Booking; redirectUrl?: string}> {
    try {
      const result = await this.bookingService.createBooking(bookingData);
      return result;
    } catch (err) {
      throw HttpErrors.InternalServerError('Error creating booking');
    }
  }

  //Get
  @get('/booking/{id}')
  @response(200, {
    description: 'Get detail booking',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Booking, {includeRelations: true}),
      },
    },
  })
  async getBooking(
    @param.path.string('id') id: string,
  ): Promise<Booking | undefined> {
    try {
      const booking = await this.bookingRepo.findById(id);
      if (!booking) {
        throw HttpErrors.NotFound('Đơn hàng này không tồn tại');
      }
      return booking;
    } catch (err) {
      console.log(err);
    }
  }
}
