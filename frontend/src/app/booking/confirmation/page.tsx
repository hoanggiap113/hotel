/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { CreateBookingPayload, IBookingGuests, SessionBookingInfo } from "@/types/booking.type";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useRouter } from "next/navigation";
import RoomDetailCard from "./components/RoomDetail";
import GuestInfoCard from "./components/GuestInfo";
import BookingSummaryCard from "./components/BookingSumary";
import ProgressBar from "./components/ProgressBar";
import api from "@/lib/api";
import { App } from "antd";
import { IRoom } from "@/types/room.type";
import { IDiscount, IDiscountRoomResponse } from "@/types/discount.type";
export default function BookingConfirmationPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const [vouchers, setVouchers] = useState<IDiscount[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<IDiscount | null>(
    null
  );
  const [bookingInfo] = useSessionStorage<SessionBookingInfo | null>("bookingInfo", null);
  const [userInfo] = useSessionStorage<IBookingGuests | null>(
    "userInfo",
    null
  );

  //State
  const [room, setRoom] = useState<IRoom | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const currentStage = 2;

  // --- EFFECT 1: CHECK SESSION & REDIRECT ---
  useEffect(() => {
    if (!bookingInfo || !userInfo) {
      console.warn("Thiếu thông tin, quay về trang booking...");
      router.push("/booking");
    }
  }, [bookingInfo, userInfo, router]);

  // --- EFFECT 2: FETCH ROOM DATA ---
  useEffect(() => {
    if (!bookingInfo) return;
    const fetchRoomData = async () => {
      try {
        const res = await api.get(`/rooms/${bookingInfo.roomId}`);
        setRoom(res.data);
      } catch (error) {
        console.error("Lỗi fetch phòng:", error);
      }
    };
    fetchRoomData();
  }, [bookingInfo]);

  //Fetch Voucher
  useEffect(() => {
    if (!bookingInfo) return;

    const fetchVouchers = async () => {
      try {
        const res = await api.get(
          `/discount-rooms/for-room/${bookingInfo.roomId}`
        );
        const rawData = res.data as IDiscountRoomResponse[];

        const availableVouchers = rawData
          .map((item) => item.discount)
          .filter((d) => d.active);
        setVouchers(availableVouchers);
      } catch (error) {
        console.error("Lỗi fetch voucher:", error);
      }
    };

    fetchVouchers();
  }, [bookingInfo]);
  const handleCancel = () => {
    console.log("Hủy Phòng clicked. Chuyển hướng người dùng về bước trước.");
    router.push("/buildings/");
  };
 const handleConfirm = async () => {
    if (!bookingInfo || !userInfo) {
      message.error("Thiếu thông tin đặt phòng! Quay về trang trước để điền lại thông tin");
      return;
    }
    setIsProcessing(true);

    try {
      // 1. Đảm bảo ngày tháng chuẩn ISO string
      // LoopBack DateTime mặc định parse chuẩn ISO 8601
      const checkInISO = new Date(bookingInfo.checkIn).toISOString();
      const checkOutISO = new Date(bookingInfo.checkOut).toISOString();

      // 2. Mapping đúng key mà Backend yêu cầu
      // Backend: guests, Frontend state: userInfo
      const payload = {
        roomId: bookingInfo.roomId,
        checkIn: checkInISO,
        checkOut: checkOutISO,
        guests: { 
          name: userInfo.name,
          phone: userInfo.phone,
          email: userInfo.email,
          note: userInfo.note,
        },
        paymentMethod: userInfo.paymentMethod,
        discountId: selectedVoucher ? (selectedVoucher._id || selectedVoucher.id) : undefined,
      };

      console.log("Payload gửi đi:", payload); 

      const res = await api.post("/bookings", payload);
      
      if (res.data) {
        message.success("Đặt phòng thành công!");
        sessionStorage.removeItem("bookingInfo");
        sessionStorage.removeItem("userInfo");
        sessionStorage.setItem("booking",res.data);
        setTimeout(() => {
          router.push(`/booking/success`);
        }, 2000);
      }
    } catch (err: any) {
      console.error("Chi tiết lỗi:", err.response?.data); 
      
      const serverMessage = err.response?.data?.error?.message || "Có lỗi xảy ra khi thanh toán";
      message.error(serverMessage);
    } finally {
      setIsProcessing(false);
    }
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
            {room && <RoomDetailCard room={room} />}{" "}
            {userInfo && <GuestInfoCard guests={userInfo} />}{" "}
          </div>

          <div className="md:w-3/5 flex flex-col justify-between">
            <div className="grow p-4">
              {/* Chỉ render khi có room để có giá tiền */}
              {room && bookingInfo && (
                <BookingSummaryCard
                  bookingInfo={bookingInfo}
                  roomPrice={room.price}
                  // Truyền props Voucher
                  vouchers={vouchers}
                  selectedVoucher={selectedVoucher}
                  onSelectVoucher={setSelectedVoucher}
                />
              )}
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
