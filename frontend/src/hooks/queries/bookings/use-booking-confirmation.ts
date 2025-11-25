/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { IBookingGuests, SessionBookingInfo } from "@/types/booking.type";
import { IDiscount } from "@/types/discount.type";
import { useRoomDetail } from "@/hooks/queries/rooms/use-room";
import { useRoomDiscounts } from "@/hooks/queries/discounts/use-discount";
import { useCreateBooking } from "@/hooks/queries/bookings/use-booking";

export const useBookingConfirmation = () => {
  const router = useRouter();
  const { message } = App.useApp();
  
  const [selectedVoucher, setSelectedVoucher] = useState<IDiscount | null>(null);
  const [loadingStage, setLoadingStage] = useState<"processing" | "redirecting">("processing");
  
  const [bookingInfo] = useSessionStorage<SessionBookingInfo | null>("bookingInfo", null);
  const [userInfo] = useSessionStorage<IBookingGuests | null>("userInfo", null);

  useEffect(() => {
    if (!bookingInfo || !userInfo) {
      console.warn("Thiếu thông tin");
      router.push("/booking");
    }
  }, [bookingInfo, userInfo, router]);

  // Fetch data
  const { data: room, isLoading: isLoadingRoom } = useRoomDetail(bookingInfo?.roomId || "");
  const { data: vouchers = [], isLoading: isLoadingVouchers } = useRoomDiscounts(bookingInfo?.roomId || "");
  const { mutate: createBooking, isPending: isProcessing } = useCreateBooking();

  const isLoading = isLoadingRoom || isLoadingVouchers;

  const handleCancel = () => {
    router.push("/");
  };

  const handleConfirm = () => {
    if (!bookingInfo || !userInfo) {
      message.error("Thiếu thông tin đặt phòng! Quay về trang trước để điền lại thông tin");
      return;
    }

    setLoadingStage("processing");

    const payload = {
      roomId: bookingInfo.roomId,
      checkIn: new Date(bookingInfo.checkIn).toISOString(),
      checkOut: new Date(bookingInfo.checkOut).toISOString(),
      guests: {
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        note: userInfo.note,
      },
      paymentMethod: userInfo.paymentMethod,
      discountId: selectedVoucher?._id || selectedVoucher?.id,
    };

    createBooking(payload, {
      onSuccess: handleBookingSuccess(payload.paymentMethod),
      onError: handleBookingError,
    });
  };

  // Success handler
  const handleBookingSuccess = (paymentMethod: string) => (data: any) => {
    // VNPay redirect
    if (data.redirectUrl && paymentMethod === "vnpay") {
      setLoadingStage("redirecting");
      setTimeout(() => {
        window.location.href = data.redirectUrl;
      }, 1500);
      return;
    }

    // Cash payment success
    message.success("Đặt phòng thành công!, bạn sẽ chuyển về trang thành công sau 2 giây");
    sessionStorage.setItem("booking", JSON.stringify(data.Booking));
    setTimeout(() => {
      router.push("/booking/cash-success");
    }, 2000);
  };

  // Error handler
  const handleBookingError = (err: any) => {
    console.error("Chi tiết lỗi:", err.response?.data);
    const serverMessage = err.response?.data?.error?.message || "Có lỗi xảy ra khi thanh toán";
    message.error(serverMessage);
  };

  return {
    // Data
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
  };
};