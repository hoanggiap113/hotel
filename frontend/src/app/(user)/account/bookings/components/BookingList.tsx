"use client";

import { useState, useEffect } from "react";
import { Empty, Skeleton, Button } from "antd";
import BookingItem from "./BookingItem";
import { IBooking, EBookingStatus } from "@/types/booking.type";
import { MOCK_BOOKINGS } from "@/data/mock-bookings";

interface BookingListProps {
  status: EBookingStatus; 
}

export default function BookingList({ status }: BookingListProps) {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);

      //Giả lập delay mạng
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredData: IBooking[] = [];

      if (status === EBookingStatus.CONFIRMED) {
        filteredData = MOCK_BOOKINGS.filter(
          (b) =>
            b.status === EBookingStatus.CONFIRMED ||
            b.status === EBookingStatus.PENDING
        );
      } else {
        filteredData = MOCK_BOOKINGS.filter((b) => b.status === status);
      }

      setBookings(filteredData);
      setLoading(false);
    };

    fetchBookings();
  }, [status]);

  // --- RENDER LOADING ---
  if (loading) {
    return (
      <div className="space-y-4 py-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg border border-gray-100 flex gap-4"
          >
            <Skeleton.Image active className="!w-48 !h-32" />
            <div className="flex-1">
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // --- RENDER EMPTY ---
  if (bookings.length === 0) {
    // Setup text cho Empty state
    const isUpcoming =
      status === EBookingStatus.CONFIRMED || status === EBookingStatus.PENDING;
    const emptyText = isUpcoming
      ? "Chưa có chuyến đi sắp tới"
      : "Danh sách trống";
    const subText = isUpcoming
      ? "Thế giới đang chờ đợi! Hãy tìm điểm đến tiếp theo."
      : "Bạn không có lịch sử đặt phòng ở trạng thái này.";

    return (
      <div className="py-16 flex justify-center items-center bg-white rounded-xl border border-dashed border-gray-200">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 120 }}
          description={
            <div className="text-center max-w-md">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {emptyText}
              </h3>
              <p className="text-gray-500 text-sm">{subText}</p>
            </div>
          }
        >
          {isUpcoming && (
            <Button type="primary" size="large">
              Tìm chuyến đi ngay
            </Button>
          )}
        </Empty>
      </div>
    );
  }

  // --- RENDER LIST ---
  return (
    <div className="py-4 animate-fade-in">
      {bookings.map((booking) => (
        <BookingItem key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
