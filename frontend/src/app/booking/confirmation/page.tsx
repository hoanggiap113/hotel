"use client";
import React, { useState } from "react";
import { calculateNights } from "@/lib/calculateNight";
import { ERoomType, EBedType, EAmenity, IRoom } from "@/types/room.type";
import { EBookingStatus, IBooking } from "@/types/booking.type";
import { EPaymentMethod, EPaymentStatus, IPayment } from "@/types/payment.type";
import { useRouter } from "next/navigation";
import RoomDetailCard from "./components/RoomDetail";
import GuestInfoCard from "./components/GuestInfo";
import BookingSummaryCard from "./components/BookingSumary";
import ProgressBar from "./components/ProgressBar";

export default function BookingConfirmationPage() {
  const MOCK_ROOM: IRoom = {
    id: "68da7a25d1c130ab5d8b70e4",
    name: "Phòng Tình Yêu View Biển",
    description:
      "Phòng Deluxe Double rộng rãi, có ban công nhìn ra biển tuyệt đẹp.",
    images: ["https://placehold.co/400x250/cccccc/333333?text=Room+Image"],
    roomType: ERoomType.DELUXE,
    bedType: EBedType.KING,
    price: 4000000, // Giá 1 đêm
    amenities: [
      EAmenity.WIFI,
      EAmenity.BREAKFAST,
      EAmenity.TV,
      EAmenity.BATHTUB,
    ],
    capacity: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    location: {
      city: "Đà Nẵng",
      ward: "Phường Mỹ An",
      address: "99 Võ Nguyên Giáp",
    },
  };

  const NIGHTS = calculateNights(
    new Date("2025-12-15"),
    new Date("2025-12-17")
  ); // 2 đêm
  const TOTAL_ROOM_PRICE = MOCK_ROOM.price * NIGHTS;
  const MOCK_TAX = 500000;
  const MOCK_TOTAL_PAYMENT = TOTAL_ROOM_PRICE + MOCK_TAX;
  const currentStage = 2;
  const MOCK_BOOKING: IBooking = {
    _id: "68e69915772e5a56980eaceb",
    userId: "68da7a25d1c130ab5d8b70dd",
    roomId: MOCK_ROOM.id,
    checkIn: new Date("2025-12-15T00:00:00.000Z"),
    checkOut: new Date("2025-12-17T00:00:00.000Z"),
    status: EBookingStatus.PENDING,
    pricing: {
      roomPrice: TOTAL_ROOM_PRICE,
      tax: MOCK_TAX,
      discount: 0,
      total: MOCK_TOTAL_PAYMENT,
    },
    guests: {
      name: "Trần Thị B",
      phone: "0987654321",
      note: "Yêu cầu phòng gần cửa sổ",
    },
    createdAt: new Date("2024-08-25T00:00:00.000Z"),
    updatedAt: new Date("2024-08-25T00:00:00.000Z"),
  };

  const MOCK_PAYMENT: IPayment = {
    _id: "68da7a25d1c130ab5d8b70f1",
    bookingId: MOCK_BOOKING._id,
    amount: MOCK_TOTAL_PAYMENT,
    method: EPaymentMethod.CASH,
    status: EPaymentStatus.PENDING,
    transactionId: null,
    paidAt: null,
    createdAt: new Date("2024-09-28T00:00:00.000Z"),
    updatedAt: new Date("2024-09-28T00:00:00.000Z"),
  };
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const handleCancel = () => {
    console.log("Hủy Phòng clicked. Chuyển hướng người dùng về bước trước.");
    router.back();
  };
  const handleConfirm = () => {
    setIsProcessing(true);
    console.log(
      `Xác Nhận Đặt Phòng clicked. Tổng tiền: ${MOCK_BOOKING.pricing.total}`
    );
    setTimeout(() => {
      setIsProcessing(false);
      console.log(
        "Chuyển sang bước thanh toán hoặc trang xác nhận thành công."
      );
      router.push("/booking/success");
    }, 1500);
  };

  return (
    <>
      <ProgressBar stage={currentStage} />
      <div className="mt-8 flex flex-col items-center gap-2 px-2 py-3">
        <h1 className="text-3xl font-bold text-blue-950">Xác Nhận Đặt Phòng</h1>
        <span className="text-sm text-gray-500">
          Vui lòng kiểm tra lại thông tin trước khi xác nhận thanh toán
        </span>
      </div>

      <div className="mt-8 rounded-xl bg-white shadow-xl overflow-hidden border border-gray-200">
        <div className="md:flex md:space-x-0">
          <div
            className="md:w-2/5 border-b md:border-b-0 md:border-r border-gray-200 
                      overflow-y-auto md:max-h-[calc(100vh-10rem)]"
          >
            <RoomDetailCard room={MOCK_ROOM} />

            <GuestInfoCard guests={MOCK_BOOKING.guests} />
          </div>

          <div className="md:w-3/5 flex flex-col justify-between">
            <div className="grow">
              <BookingSummaryCard
                booking={MOCK_BOOKING}
                payment={MOCK_PAYMENT}
              />
            </div>

            <div className="p-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isProcessing}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-base font-semibold text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-100 disabled:opacity-50"
              >
                Hủy và Quay Lại
              </button>

              <button
                type="submit"
                onClick={handleConfirm}
                disabled={isProcessing}
                className="rounded-lg bg-blue-600 px-6 py-2 text-base font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  "Xác Nhận Đặt Phòng & Thanh Toán"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
