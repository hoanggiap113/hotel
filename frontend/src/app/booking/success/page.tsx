"use client";
import React from "react";
import ProgressBar from "../components/ProgressBar";
import Link from "next/link"; // Để điều hướng về Dashboard
export default function CompletePage() {
  const currentStage = 3; // Tất cả các stage đã hoàn thành

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center p-4">
      {/* ProgressBar - Hiển thị tất cả các bước đã hoàn thành */}
      <div className="mb-10">
        <ProgressBar stage={currentStage} />
      </div>

      {/* Tiêu đề chính */}
      <h1 className="text-4xl font-bold text-blue-950 mb-6 text-center">
        Yay! Payment Completed
      </h1>

      {/* Hình ảnh minh họa (placeholder) */}
      {/* Bạn có thể thay thế bằng một SVG thực tế hoặc ảnh từ thư viện */}
      <div className="my-8">
        {/* Placeholder cho ảnh minh họa như trong hình bạn gửi */}
        {/* Để tạo ra hình ảnh này, bạn sẽ sử dụng tag 
. */}
      </div>

      {/* Thông báo chi tiết */}
      <p className="text-lg text-gray-700 text-center mb-4">
        Please check your email & phone Message.
      </p>
      <p className="text-lg text-blue-600 font-medium text-center mb-8">
        We have sent all the Information
      </p>

      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 text-lg font-semibold transition-colors duration-200"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
