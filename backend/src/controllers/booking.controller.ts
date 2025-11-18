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

export class BookingController {
  constructor(
    @inject('services.BookingService') public bookingService: BookingService,
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
              discountId: {type: 'string'}
            },
          },
        },
      },
    })
    bookingData: BookingRequestInterface,
  ) {
    try {
      return this.bookingService.createBooking(bookingData);
    } catch (err) {
      throw HttpErrors.InternalServerError('Error creating booking');
    }
  }
}
