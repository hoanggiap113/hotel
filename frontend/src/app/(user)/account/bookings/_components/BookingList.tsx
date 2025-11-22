/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Empty, Skeleton, Button } from "antd";
import BookingItem from "./BookingItem";
import { IBooking, EBookingStatus } from "@/types/booking.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/util/api";
interface BookingListProps {
  status: EBookingStatus;
}

export default function BookingList({ status }: BookingListProps) {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);

      // 1. Check token
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;

      if (!token) {
        console.error("Chưa đăng nhập!");
        router.push("/login"); // Redirect ngay
        return; // Dừng hàm luôn, không chạy đoạn dưới nữa
      }

      try {
        const res = await api.get(`/users/orders`, {
          params: { status: status },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setBookings(res.data);
      } catch (err: any) {
        console.error("Lỗi fetch bookings:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          router.push("/login");
        }
        setBookings([]);
      } finally {
        setLoading(false);
      }
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
    const isUpcoming =
      status === EBookingStatus.CONFIRMED || status === EBookingStatus.PENDING;
    const emptyText = isUpcoming
      ? "Chưa có chuyến đi sắp tới"
      : "Danh sách trống";
    const subText = isUpcoming
      ? "Thế giới đang chờ đợi! Hãy tìm điểm đến tiếp theo."
      : "Bạn không có lịch sử đặt phòng ở trạng thái này.";

    return (

      <div className="h-full min-h-[500px] flex flex-col justify-center items-center bg-white p-6">
        <Empty
          image={
            <Image
              src="/images/empty.svg"
              alt="Danh sách trống"
              width={180}
              height={140}
              className="mx-auto object-contain mb-4"
              priority 
            />
          }

          description={
            <div className="text-center max-w-md mt-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {emptyText}
              </h3>
              <p className="text-gray-500 text-base">{subText}</p>
            </div>
          }
        >
          {isUpcoming && (
            <Button type="primary" size="large" className="mt-4"
            onClick={() => router.push('/')}>
              Tìm chuyến đi ngay
            </Button>
          )}
        </Empty>
      </div>
    );
  }

  // --- RENDER LIST ---
  // Cũng cần bọc padding cho list
  return (
    <div className="animate-fade-in">
      {bookings.map((booking) => (
        <BookingItem key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
