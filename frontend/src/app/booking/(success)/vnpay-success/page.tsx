// app/booking-result/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function BookingResult() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const code = searchParams.get("code");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {status === "success" ? (
          <>
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Thanh toán thành công!
            </h1>
            <p className="text-gray-600 mb-6">
              Mã đơn hàng: <span className="font-mono font-bold">{code}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Cảm ơn bạn đã đặt phòng. Email xác nhận đã được gửi đi.
            </p>
          </>
        ) : (
          <>
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Thanh toán thất bại
            </h1>
            <p className="text-gray-600 mb-6">
              Có lỗi xảy ra trong quá trình xử lý thanh toán.
            </p>
          </>
        )}

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
