"use client";
import ProgressBar from "./confirmation/components/ProgressBar";
import React from "react";
import { useRouter } from "next/navigation";
import UserBookingForm from "./components/UserBookingForm";
import { IBookingGuests } from "@/types/booking.type";
import { EPaymentMethod } from "@/types/payment.type";

type FormValues = IBookingGuests & {
  paymentMethod: EPaymentMethod;
};

export default function BookingConfirmationPage() {
  const currentStage = 1;
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const onFinish = (values: FormValues) => {
    console.log("Dữ liệu đầy đủ từ form:", values);
    const { paymentMethod, ...guestInfo } = values;

    const payload = {
      ...guestInfo,
      paymentMethod: paymentMethod 
    };
    sessionStorage.setItem("userInfo", JSON.stringify(payload));
    router.push("/booking/confirmation");
  };

  return (
    <div className="flex flex-col flex-1">
      <ProgressBar stage={currentStage} />
      {/* Title */}
      <div className="mt-4 mb-6 flex flex-col items-center gap-2 px-2 py-3">
        <h1 className="text-3xl font-bold text-blue-950">
          Nhập thông tin đặt phòng
        </h1>
        <p className="text-sm text-gray-500">
          Vui lòng điền thông tin chính xác để hoàn tất đặt phòng
        </p>
      </div>

      {/* Form Card */}
      <div className="mt-4 mx-auto rounded-xl bg-white shadow-xl overflow-hidden border border-gray-200 p-6 md:p-8 flex flex-row">
        <UserBookingForm onFinish={onFinish} handleBack={handleBack} />
      </div>
    </div>
  );
}
