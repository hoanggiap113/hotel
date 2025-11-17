import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {BookingRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Filter} from '@loopback/repository';
import {Booking} from '../models';
import {BookingRequestInterface} from '../interface/booking-request.interface';
import {PaymentRepository} from '../repositories/payment.repository';
import {HttpErrors} from '@loopback/rest';

@injectable({scope: BindingScope.TRANSIENT})
export class BookingService {
  constructor(
    @repository(BookingRepository) public bookingRepository: BookingRepository,
    @repository(PaymentRepository) public paymentRepository: PaymentRepository,
  ) {}

  //CRUD
  async getBookings(filter?: Filter<Booking>): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find(filter);
    return bookings;
  }

  async getBooking(id: string): Promise<Booking> {
    return await this.bookingRepository.findById(id);
  }

  async createBooking(bookingData: BookingRequestInterface): Promise<Booking> {
    const checkIn = bookingData.checkIn
      ? new Date(bookingData.checkIn)
      : undefined;
    const checkOut = bookingData.checkOut
      ? new Date(bookingData.checkOut)
      : undefined;

    try {
      // Tạo booking trước
      const booking = await this.bookingRepository.create({
        roomId: bookingData.roomId,
        guests: bookingData.guests,
        pricing: bookingData.pricing,
        checkIn: checkIn,
        checkOut: checkOut,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Sau đó tạo payment
      const payment = await this.paymentRepository.create({
        bookingId: booking.id,
        amount: bookingData.pricing.total,
        createdAt: new Date(),
        updatedAt: new Date(),
        method: bookingData.paymentMethod,
        status: 'pending',
        
      });

      return booking;
    } catch (err) {
      throw HttpErrors.InternalServerError(
        `Failed to create booking: ${err.message}`,
      );
    }
  }
  async updateBookingById(
    id: string,
    bookingData: Partial<Booking>,
  ): Promise<void> {
    const booking = {
      ...bookingData,
      updatedAt: new Date(),
    };
    await this.bookingRepository.updateById(id, booking);
  }
  async deleteById(id: string): Promise<void> {
    const booking = await this.bookingRepository.findById(id);
    const updateBooking = {
      ...booking,
      status: 'cancelled',
      updatedAt: new Date(),
    };
    await this.bookingRepository.updateById(id, updateBooking);
  }
}
