"use client";
import React, { useEffect, useState } from "react";
import { calculateNights } from "@/lib/calculateNight";
import {
  EBookingStatus,
  IBooking,
  IBookingGuests,
  SessionBookingInfo,
} from "@/types/booking.type";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { EPaymentMethod, EPaymentStatus, IPayment } from "@/types/payment.type";
import { useRouter } from "next/navigation";
import RoomDetailCard from "./components/RoomDetail";
import GuestInfoCard from "./components/GuestInfo";
import BookingSummaryCard from "./components/BookingSumary";
import ProgressBar from "./components/ProgressBar";
import api from "@/lib/api";
import { IRoom } from "@/types/room.type";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const [bookingInfo, setBookingInfo] =
    useSessionStorage<SessionBookingInfo | null>("bookingInfo", null);
  const [userInfo, setUserInfo] = useSessionStorage<IBookingGuests | null>(
    "userInfo",
    null
  );

  //State
  const [room, setRoom] = useState<IRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const currentStage = 2;

  useEffect(() => {
    if (!bookingInfo || !userInfo) {
      console.warn("Thiếu thông tin đặt phòng, điều hướng về trang booking...");
      router.push("/booking");
      return; // Dừng lại nếu thiếu
    }


    const fetchRoomData = async () => {
      try {
        const res = await api.get(`/rooms/${bookingInfo.roomId}`);
        setRoom(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Lỗi fetch phòng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomData();
    setIsLoading(false);
  }, [bookingInfo, userInfo, router]);
  const handleCancel = () => {
    console.log("Hủy Phòng clicked. Chuyển hướng người dùng về bước trước.");
    router.push("/booking");
  };
  const handleConfirm = () => {
    setIsProcessing(true);
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
        {/* <div className="md:flex md:space-x-0">
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
        </div> */}
        Test
      </div>
    </>
  );
}
