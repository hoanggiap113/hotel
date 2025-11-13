"use client";
import { IBookingGuests } from "@/types/booking.type";

interface GuestInfoCardProps {
  guests: IBookingGuests;
}
export default function GuestInfoCard({ guests }: GuestInfoCardProps) {
  return (
    <>
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold border-b pb-3 mb-4 text-gray-800">
          Thông Tin Khách Hàng
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Họ tên:</span>
            <span className="font-semibold">{guests.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Số điện thoại:</span>
            <span className="font-semibold">{guests.phone}</span>
          </div>
          {guests.note && (
            <div className="pt-2 border-t border-dashed">
              <span className="font-medium text-gray-600 block mb-1">
                Ghi chú yêu cầu:
              </span>
              <p className="italic text-gray-500">{guests.note}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
