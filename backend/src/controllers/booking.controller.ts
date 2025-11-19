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
  RestBindings,
  Request,
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
    @inject(RestBindings.Http.REQUEST) private req: Request,
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
      //Xử lý url:
      const ipHeader = this.req.headers['x-forwarded-for'];
      let ipAddr = '';
      if (ipHeader) {
        // Header có thể trả về dạng: "client_ip, proxy1_ip, proxy2_ip"
        ipAddr = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader.split(',')[0];
      } else {
        // Fallback nếu không có proxy
        ipAddr = this.req.socket.remoteAddress || '127.0.0.1';
      }
      //Làm sạch ip nếu bẩn
      if (ipAddr.substr(0, 7) == '::ffff:') {
        ipAddr = ipAddr.substr(7);
      }
      const result = await this.bookingService.createBooking(bookingData,ipAddr);
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
