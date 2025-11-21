import {injectable, /* inject, */ BindingScope, inject} from '@loopback/core';
import {
  BookingRepository,
  BuildingRepository,
  DiscountRepository,
  DiscountRoomRepository,
  RoomRepository,
} from '../repositories';
import {repository} from '@loopback/repository';
import {Filter} from '@loopback/repository';
import {Booking, DiscountRoom} from '../models';
import { BookingRequestInterface } from '../models';
import {PaymentRepository} from '../repositories/payment.repository';
import {HttpErrors} from '@loopback/rest';
import {calculateDate} from '../util/calculateDate.util';
import {VnPayService} from './vnpay.service';

@injectable({scope: BindingScope.TRANSIENT})
export class BookingService {
  constructor(
    @repository(BookingRepository) public bookingRepo: BookingRepository,
    @repository(PaymentRepository) public paymentRepo: PaymentRepository,
    @repository(DiscountRepository) public discountRepo: DiscountRepository,
    @repository(DiscountRoomRepository)
    public discountRoomRepo: DiscountRoomRepository,
    @repository(RoomRepository) public roomRepo: RoomRepository,
    @repository(BuildingRepository) public buildingRepo: BuildingRepository,
    @inject('services.VnPayService') public vnPayService: VnPayService,
  ) {}

  //CRUD
  async getBookings(filter?: Filter<Booking>): Promise<Booking[]> {
    const bookings = await this.bookingRepo.find(filter);
    return bookings;
  }

  async getBooking(id: string): Promise<Booking> {
    return await this.bookingRepo.findById(id);
  }

  async createBooking(
    bookingData: BookingRequestInterface,
    clientIp: string,
  ): Promise<{booking: Booking; redirectUrl?: string}> {
    const breakDown = await this.createBreakDownPrice(
      bookingData.roomId,
      bookingData.checkIn,
      bookingData.checkOut,
      bookingData.discountId,
    );
    const booking: Booking = await this.bookingRepo.create({
      roomId: bookingData.roomId,
      checkIn: new Date(bookingData.checkIn),
      checkOut: new Date(bookingData.checkOut),
      guests: bookingData.guests,
      status: 'pending',
      pricing: breakDown,
      userId: bookingData.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    try {
      const payment = await this.paymentRepo.create({
        amount: breakDown.total,
        method: bookingData.paymentMethod || 'unknown',
        status: 'pending',
        bookingId: booking.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      let redirectUrl = undefined;

      if (bookingData.paymentMethod === 'vnpay') {
        redirectUrl = this.vnPayService.buildPaymentUrl(
          payment.amount,
          clientIp.toString(),
          payment.id!.toString(),
          `Thanh toan booking ${booking.id?.toString()}`,
        );
      }
      return {booking, redirectUrl};
    } catch (err) {
      console.log(err);
      await this.bookingRepo.deleteById(booking.id);
      throw HttpErrors.InternalServerError('Có lỗi máy chủ thử lại sau');
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
    await this.bookingRepo.updateById(id, booking);
  }
  async deleteById(id: string): Promise<void> {
    const booking = await this.bookingRepo.findById(id);
    const updateBooking = {
      ...booking,
      status: 'cancelled',
      updatedAt: new Date(),
    };
    await this.bookingRepo.updateById(id, updateBooking);
  }

  private async createBreakDownPrice(
    roomId: string,
    checkIn: string,
    checkOut: string,
    discountId?: string,
  ) {
    const room = await this.roomRepo.findById(roomId);
    if (!room) throw new HttpErrors.NotFound('Không tìm thấy phòng');

    const building = await this.buildingRepo.findById(room.buildingId);

    const days = calculateDate(new Date(checkIn), new Date(checkOut));
    if (days <= 0)
      throw new HttpErrors.BadRequest('Ngày check-out phải sau check-in');

    const totalRoomPrice = room.price * days;

    let discountAmount = 0;

    if (discountId) {
      const now = new Date();
      const discountRoomLink = await this.discountRoomRepo.findOne({
        where: {
          roomId: roomId,
          discountId: discountId,
          validAt: {lte: now.toISOString()},
          validTo: {gte: now.toISOString()},
        },
      });

      if (!discountRoomLink) {
        throw new HttpErrors.BadRequest(
          'Mã giảm giá không hợp lệ hoặc hết hạn',
        );
      }

      const discount = await this.discountRepo.findById(discountId);
      if (!discount || !discount.active) {
        throw new HttpErrors.BadRequest('Mã giảm giá đã bị vô hiệu hóa');
      }

      if (discount.type === 'percentage') {
        discountAmount = (totalRoomPrice * discount.value) / 100;
      } else if (discount.type === 'fixed') {
        discountAmount = discount.value;
      }
    }

    const taxAmount = building.tax ? building.tax : 0;

    let finalTotal = totalRoomPrice - discountAmount + taxAmount;

    if (finalTotal < 0) finalTotal = 0;

    return {
      roomPrice: totalRoomPrice,
      tax: taxAmount,
      discount: discountAmount,
      total: Math.round(finalTotal),
    };
  }
}
