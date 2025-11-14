import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {BookingRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Filter} from '@loopback/repository';
import {Booking} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class BookingService {
  constructor(
    @repository(BookingRepository) public bookingRepository: BookingRepository,
    
  ) {}

  //CRUD
  async getBookings(filter?: Filter<Booking>): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find(filter);
    return bookings;
  }

  async getBooking(id: string): Promise<Booking> {
    return await this.bookingRepository.findById(id);
  }

  async createBooking(
    bookingData: Omit<Booking, 'id' | 'updatedAt' | 'createdAt'>,
  ): Promise<Booking> {
    const booking: Booking = new Booking({
      ...bookingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.bookingRepository.create(booking);
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
