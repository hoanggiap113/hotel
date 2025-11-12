"use client";
import { IBooking } from "@/types/booking.type";
import { calculateNights, formatDateDisplay } from "@/lib/calculateNight";
import formatPrice from "@/lib/format-price";
import {
  IPayment,
  EPaymentMethod,
  PaymentMethodLabel,
} from "@/types/payment.type";

interface BookingSummaryCardProps {
  booking: IBooking;
  payment: IPayment;
  roomPricePerNight: number;
}

export default function BookingSummaryCard({
  booking,
  payment,
  roomPricePerNight,
}: BookingSummaryCardProps) {
  const nights = calculateNights(booking.checkIn, booking.checkOut);
  const totalPriceDisplay = formatPrice(booking.pricing.total);
  const taxDisplay = formatPrice(booking.pricing.tax);
  const totalRoomPriceDisplay = formatPrice(booking.pricing.roomPrice);

  return (
    <div className="p-4 md:p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold border-b pb-3 mb-4 text-blue-700">
        Tóm Tắt Đơn Hàng
      </h3>

      <div className="space-y-4 text-gray-800">
        {/* Thời gian lưu trú */}
        <div className="flex justify-between items-start border-b pb-3">
          <span className="font-medium text-gray-600">Thời gian lưu trú:</span>
          <div className="text-right">
            <div className="text-base font-bold text-green-600">
              {formatDateDisplay(booking.checkIn)}{" "}
              <span className="font-normal text-gray-400 mx-1">→</span>{" "}
              {formatDateDisplay(booking.checkOut)}
            </div>
            <span className="text-sm text-gray-500">({nights} đêm)</span>
          </div>
        </div>

        {/* Chi tiết giá */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Giá phòng cơ bản ({nights} đêm):</span>
            <span className="font-medium">{totalRoomPriceDisplay}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Thuế và phí dịch vụ:</span>
            <span className="font-medium">{taxDisplay}</span>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="pt-3 border-t border-dashed">
          <div className="flex justify-between text-gray-600">
            <span>Phương thức thanh toán:</span>
            <span
              className={`font-semibold ${
                payment.method === EPaymentMethod.CASH
                  ? "text-orange-500"
                  : "text-blue-500"
              }`}
            >
              {PaymentMethodLabel[payment.method]}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {payment.method === EPaymentMethod.CASH
              ? "*Bạn sẽ thanh toán tổng tiền khi nhận phòng."
              : "*Số tiền sẽ được trừ khi xác nhận đặt chỗ."}
          </div>
        </div>

        {/* Tổng tiền phải trả */}
        <div className="pt-4 border-t border-double border-gray-300 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-900">
            Tổng tiền phải trả:
          </span>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-red-600">
              {totalPriceDisplay}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
