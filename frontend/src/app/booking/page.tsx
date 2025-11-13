"use client";
import ProgressBar from "./confirmation/components/ProgressBar";
import { EPaymentMethod, PaymentMethodLabel } from "@/types/payment.type";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function BookingConfirmationPage() {
  const currentStage = 1; // <--- Dữ liệu nằm ở đây
  const [selectedMethod, setSelectedMethod] = useState<EPaymentMethod>(
    EPaymentMethod.CASH
  );
  const router = useRouter();
  const handleContinue = () => {
    console.log(`Đã chọn phương thức: ${PaymentMethodLabel[selectedMethod]}.`);
    console.log("Chuyển hướng đến /booking/confirmation...");
    router.push('/booking/confirmation');
  };
  const paymentMethods = [
    EPaymentMethod.CASH,
    EPaymentMethod.CREDIT_CARD, // Sử dụng CREDIT_CARD theo file type của bạn
    EPaymentMethod.BANK_TRANSFER,
  ];
  const handleBack = () => {
    console.log("Quay lại bước trước.");
    router.back();
    
  };
  return (
    <div className="flex flex-col flex-1">
      <ProgressBar stage={currentStage} />

      {/* Title */}
      <div className="mt-8 mb-6 flex flex-col items-center gap-2 px-2 py-3">
        <h1 className="text-3xl font-bold text-blue-950">
          Chọn Phương Thức Thanh Toán
        </h1>
      </div>

      {/* Main Content: Payment Method Cards */}
      <div className="mt-4 rounded-xl bg-white shadow-xl overflow-hidden border border-gray-200 p-6 md:p-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
          Phương Thức Thanh Toán Khả Dụng
        </h3>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                                ${
                                  selectedMethod === method
                                    ? "border-blue-600 bg-blue-50 shadow-md"
                                    : "border-gray-200 hover:border-blue-400"
                                }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-gray-800">
                  {PaymentMethodLabel[method]}
                </span>
                {selectedMethod === method && (
                  <svg
                    className="h-6 w-6 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {method === EPaymentMethod.CASH
                  ? "Bạn sẽ thanh toán trực tiếp bằng tiền mặt cho nhân viên khi nhận phòng."
                  : method === EPaymentMethod.CREDIT_CARD
                  ? "Thanh toán an toàn ngay lập tức qua cổng thanh toán."
                  : "Thanh toán bằng cách chuyển khoản ngân hàng, thông tin chi tiết sẽ được hiển thị sau khi xác nhận đặt phòng."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleBack}
          className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-base font-semibold text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-100"
        >
          Quay Lại
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedMethod}
          className="rounded-lg bg-blue-600 px-6 py-2 text-base font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 disabled:bg-blue-400"
        >
          Tiếp Tục Đến Xác Nhận
        </button>
      </div>
    </div>
  );
}
