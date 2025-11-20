/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBooking, EBookingStatus } from "@/types/booking.type";
import { ERoomType, EBedType, EAmenity } from "@/types/room.type";

export const MOCK_BOOKINGS: IBooking[] = [
  {
    _id: "bk_upcoming_01",
    userId: "user_01",
    roomId: "room_01",
    room: {
      id: "room_01",
      _id: "room_01",
      name: "Vinpearl Luxury Landmark 81",
      roomType: ERoomType.SUITE,
      bedType: EBedType.KING,
      price: 5000000,
      amenities: [EAmenity.WIFI, EAmenity.POOL, EAmenity.BATHTUB],
      capacity: 2,
      rating: { average: 4.9, reviewsCount: 120 },
      createdAt: new Date(),
      updatedAt: new Date(),
      // Fake location vì mình chưa có file location.type của bạn
      location: { city: "Hồ Chí Minh", address: "720A Điện Biên Phủ" } as any, 
      images: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/196636537.jpg?k=4093776208222245762237819022261522218900610318215478800501881111&o=&hp=1"],
    },
    checkIn: new Date("2025-12-24"),
    checkOut: new Date("2025-12-26"),
    status: EBookingStatus.CONFIRMED, // Sắp tới
    pricing: { roomPrice: 10000000, tax: 1000000, discount: 0, total: 11000000 },
    guests: { name: "Nguyễn Văn A", phone: "0909123456", email: "a@test.com", paymentMethod: "card" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "bk_completed_01",
    userId: "user_01",
    roomId: "room_02",
    room: {
      id: "room_02",
      _id: "room_02",
      name: "Melia Ba Vi Mountain Retreat",
      roomType: ERoomType.BUNGALOW,
      bedType: EBedType.DOUBLE,
      price: 3000000,
      amenities: [EAmenity.WIFI, EAmenity.BREAKFAST],
      capacity: 2,
      rating: { average: 4.5, reviewsCount: 50 },
      createdAt: new Date(),
      updatedAt: new Date(),
      location: { city: "Hà Nội", address: "Vườn Quốc Gia Ba Vì" } as any,
      images: ["https://pix10.agoda.net/hotelImages/568/5684454/5684454_18121416280070413079.jpg?ca=7&ce=1&s=1024x768"],
    },
    checkIn: new Date("2023-10-20"),
    checkOut: new Date("2023-10-22"),
    status: EBookingStatus.COMPLETED, // Hoàn tất
    pricing: { roomPrice: 6000000, tax: 600000, discount: 500000, total: 6100000 },
    guests: { name: "Nguyễn Văn A", phone: "0909123456", email: "a@test.com", paymentMethod: "momo" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "bk_cancelled_01",
    userId: "user_01",
    roomId: "room_03",
    room: {
      id: "room_03",
      _id: "room_03",
      name: "Dalat Palace Heritage Hotel",
      roomType: ERoomType.STANDARD,
      bedType: EBedType.QUEEN,
      price: 2500000,
      amenities: [EAmenity.WIFI],
      capacity: 2,
      rating: { average: 4.7, reviewsCount: 80 },
      createdAt: new Date(),
      updatedAt: new Date(),
      location: { city: "Lâm Đồng", address: "2 Trần Phú, Đà Lạt" } as any,
      images: ["https://pix10.agoda.net/hotelImages/655/65588/65588_15062411390029529279.jpg?ca=4&ce=1&s=1024x768"],
    },
    checkIn: new Date("2023-05-01"),
    checkOut: new Date("2023-05-03"),
    status: EBookingStatus.CANCELLED, // Đã hủy
    pricing: { roomPrice: 5000000, tax: 500000, discount: 0, total: 5500000 },
    guests: { name: "Nguyễn Văn A", phone: "0909123456", email: "a@test.com", paymentMethod: "card" },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];