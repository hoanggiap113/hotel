import React from "react";
import { Modal } from "antd";

interface BookingLoadingModalProps {
  open: boolean;
  stage?: "processing" | "redirecting";
}

export const BookingLoadingModal: React.FC<BookingLoadingModalProps> = ({
  open,
  stage = "processing",
}) => {
  const messages = {
    processing: {
      title: "Đang xử lý đặt phòng",
      subtitle: "Vui lòng không đóng trang này...",
      steps: [
        "Kiểm tra tình trạng phòng",
        "Xác nhận thông tin đặt phòng",
        "Xử lý thanh toán",
      ],
    },
    redirecting: {
      title: "Chuyển hướng thanh toán",
      subtitle: "Đang chuyển đến cổng thanh toán VNPay...",
      steps: [
        "Chuẩn bị thông tin thanh toán",
        "Kết nối với VNPay",
        "Chuyển hướng...",
      ],
    },
  };

  const currentMessage = messages[stage];

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      width={480}
      maskClosable={false}
      styles={{
        body: { padding: "40px 24px" },
      }}
    >
      <div className="flex flex-col items-center">
        {/* Animated Spinner */}
        <div className="relative mb-6">
          <div className="h-20 w-20 rounded-full border-4 border-blue-100"></div>
          <div className="absolute top-0 left-0 h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
          
          {/* Pulsing Center Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-3 w-3 rounded-full bg-blue-600 animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {currentMessage.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-6 text-center">
          {currentMessage.subtitle}
        </p>

        {/* Progress Steps */}
        <div className="w-full space-y-3">
          {currentMessage.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm animate-fade-in"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Step Icon */}
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    className="h-3 w-3 text-blue-600 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Step Text */}
              <span className="text-gray-700">{step}</span>

              {/* Loading Dots */}
              <div className="flex gap-1 ml-auto">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"
                  style={{ animationDelay: "0s" }}
                ></span>
                <span
                  className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          ))}
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-start gap-2 p-3 bg-blue-50 rounded-lg w-full">
          <svg
            className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p className="text-xs text-blue-800">
            Giao dịch của bạn được mã hóa và bảo mật. Vui lòng không tắt trình duyệt.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </Modal>
  );
};