"use client";
import React from "react";
import { SessionBookingInfo } from "@/types/booking.type";
import { calculateNights, formatDateDisplay } from "@/lib/util/calculateNight";
import formatPrice from "@/lib/util/format-price";
import { IDiscount } from "@/types/discount.type";
import { Select } from "antd";
interface BookingSummaryCardProps {
  bookingInfo: SessionBookingInfo;
  roomPrice: number;
  vouchers: IDiscount[];
  selectedVoucher: IDiscount | null;
  onSelectVoucher: (voucher: IDiscount | null) => void;
}
const getVoucherId = (v: IDiscount | null) => v?.id || v?._id || "";

export default function BookingSummaryCard({
  bookingInfo,
  roomPrice,
  vouchers,
  selectedVoucher,
  onSelectVoucher,
}: BookingSummaryCardProps) {
  // 1. Tính số đêm
  const checkIn = new Date(bookingInfo.checkIn);
  const checkOut = new Date(bookingInfo.checkOut);
  const nights = calculateNights(checkIn, checkOut);
  const basePrice = roomPrice * nights;

  // Tính giảm giá
  let discountAmount = 0;
  if (selectedVoucher) {
    if (selectedVoucher.type === "percent") {
      discountAmount = (basePrice * selectedVoucher.value) / 100;
    } else if (selectedVoucher.type === "fixed") {
      discountAmount = selectedVoucher.value;
    } else if (selectedVoucher.type === "nightly") {
      discountAmount = roomPrice * selectedVoucher.value;
    }
  }

  if (discountAmount > basePrice) discountAmount = basePrice;
  const taxAmount = basePrice * 0.08;

  // Tổng thanh toán cuối cùng
  const finalTotal = basePrice - discountAmount + taxAmount;
  const voucherOptions = vouchers.map((v) => ({
    label: `${v.code} - ${v.name} (Giảm ${
      v.type === "percent" ? v.value + "%" : formatPrice(v.value)
    })`,
    value: getVoucherId(v),
    originalData: v, // Lưu object gốc để lấy lại khi select
  }));
  return (
    <div className="p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold border-b border-gray-200 pb-3 mb-4 text-blue-800">
        Tóm Tắt Đơn Hàng
      </h3>

      <div className="space-y-4 text-gray-800">
        {/* Thời gian lưu trú */}
        <div className="flex justify-between items-start border-b border-dashed border-gray-300 pb-3">
          <span className="font-medium text-gray-600">Thời gian:</span>
          <div className="text-right">
            <div className="text-base font-bold text-green-600">
              {formatDateDisplay(checkIn)}{" "}
              <span className="font-normal text-gray-400 mx-1">→</span>{" "}
              {formatDateDisplay(checkOut)}
            </div>
            <span className="text-sm text-gray-500 italic">({nights} đêm)</span>
          </div>
        </div>

        {/* --- CHỌN VOUCHER --- */}
        <div className="py-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mã giảm giá / Ưu đãi:
          </label>
          <Select
            className="w-full"
            placeholder="Chọn mã giảm giá"
            size="large"
            allowClear
            showSearch // Cho phép gõ để tìm kiếm voucher
            optionFilterProp="label" // Tìm kiếm dựa trên label
            value={selectedVoucher ? getVoucherId(selectedVoucher) : undefined}
            onChange={(value) => {
              if (!value) {
                onSelectVoucher(null);
              } else {
                // Tìm lại object voucher từ danh sách
                const found = vouchers.find((v) => getVoucherId(v) === value);
                onSelectVoucher(found || null);
              }
            }}
            options={voucherOptions}
            // Tùy chọn: Custom hiển thị khi không có dữ liệu
            notFoundContent="Không có mã giảm giá khả dụng"
          />
        </div>

        {/* Chi tiết giá */}
        <div className="space-y-2 text-sm pt-2">
          <div className="flex justify-between text-gray-600">
            <span>Đơn giá:</span>
            <span className="font-medium">{formatPrice(roomPrice)} / đêm</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Giá gốc ({nights} đêm):</span>
            <span className="font-medium">{formatPrice(basePrice)}</span>
          </div>

          {/* Hiển thị dòng giảm giá nếu có */}
          {selectedVoucher && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Ưu đãi ({selectedVoucher.code}):</span>
              <span>- {formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>Thuế & Phí dịch vụ (8%):</span>
            <span className="font-medium">{formatPrice(taxAmount)}</span>
          </div>
        </div>

        {/* Tổng tiền phải trả */}
        <div className="pt-4 border-t-2 border-gray-200 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-900">
            Tổng thanh toán:
          </span>
          <div className="text-right">
            <span className="text-2xl md:text-3xl font-extrabold text-red-600">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
