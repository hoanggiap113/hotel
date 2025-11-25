/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import RoomDetailCard from "./components/RoomDetail";
import GuestInfoCard from "./components/GuestInfo";
import BookingSummaryCard from "./components/BookingSumary";
import ProgressBar from "./components/ProgressBar";
import { BookingLoadingModal } from "../components/BookingLoadingModal";
import { useBookingConfirmation } from "@/hooks/queries/bookings/use-booking-confirmation";
export default function BookingConfirmationPage() {
  const {
    room,
    vouchers,
    bookingInfo,
    userInfo,
    selectedVoucher,

    // States
    isLoading,
    isProcessing,
    loadingStage,

    // Handlers
    setSelectedVoucher,
    handleCancel,
    handleConfirm,
  } = useBookingConfirmation();
  if (isLoading) {
    return (
      <>
        <ProgressBar stage={2} />
        <div className="mt-8 flex flex-col items-center gap-2 px-2 py-3">
          <h1 className="text-3xl font-bold text-blue-950">
            Đang tải thông tin...
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <BookingLoadingModal open={isProcessing} stage={loadingStage} />
      <ProgressBar stage={2} />

      <div className="mt-8 flex flex-col items-center gap-2 px-2 py-3">
        <h1 className="text-3xl font-bold text-blue-950">Xác Nhận Đặt Phòng</h1>
        <span className="text-sm text-gray-500">
          Vui lòng kiểm tra lại thông tin trước khi xác nhận thanh toán
        </span>
      </div>

      <div className="mt-8 rounded-xl bg-white shadow-xl overflow-hidden border border-gray-200">
        <div className="md:flex md:space-x-0">
          {/* Left Panel: Room & Guest Info */}
          <div className="md:w-2/5 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto md:max-h-[calc(100vh-10rem)]">
            {room && <RoomDetailCard room={room} />}
            {userInfo && <GuestInfoCard guests={userInfo} />}
          </div>

          {/* Right Panel: Summary & Actions */}
          <div className="md:w-3/5 flex flex-col justify-between">
            <div className="grow p-4">
              {room && bookingInfo && (
                <BookingSummaryCard
                  bookingInfo={bookingInfo}
                  roomPrice={room.price}
                  vouchers={vouchers}
                  selectedVoucher={selectedVoucher}
                  onSelectVoucher={setSelectedVoucher}
                />
              )}
            </div>

            {/* Action Buttons */}
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
                Xác Nhận Đặt Phòng & Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
