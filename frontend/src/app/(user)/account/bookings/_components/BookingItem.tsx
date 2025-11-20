"use client";

import { Card, Tag, Button, Typography, Space, Divider, Image } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { IBooking, EBookingStatus } from "@/types/booking.type";
import formatDate from "@/lib/format-date";
import formatLocation from "@/lib/format-address";
import { BedTypeLabel, RoomTypeLabel } from "@/types/room.type";
import formatPrice from "@/lib/format-price";
const { Text, Title } = Typography;
interface BookingItemProps {
  booking: IBooking;
}
export default function BookingItem({ booking }: BookingItemProps) {
  const roomTypeName = booking.room?.roomType
    ? RoomTypeLabel[booking.room.roomType as string] || booking.room.roomType
    : "Phòng tiêu chuẩn";

  const bedTypeName = booking.room?.bedType
    ? BedTypeLabel[booking.room.bedType as string] || booking.room.bedType
    : "";

  // Fallback ảnh nếu phòng không có ảnh
  const roomImage =
    booking.room?.images && booking.room.images.length > 0
      ? booking.room.images[0]
      : "https://via.placeholder.com/300x200?text=No+Image";
  //Hàm render màu cho tag
  const getStatusTag = (status: EBookingStatus) => {
    switch (status) {
      case EBookingStatus.PENDING:
        return <Tag color="orange">Đang chờ duyệt</Tag>;
      case EBookingStatus.CANCELLED:
        return <Tag color="red">Đã hủy</Tag>;

      case EBookingStatus.COMPLETED:
        return <Tag color="green">Hoàn tất</Tag>;
      case EBookingStatus.CONFIRMED:
        return <Tag color="blue">Đã xác nhận</Tag>;
      default:
        return <Tag> Không xác định</Tag>;
    }
  };
  return (
    <Card
     className="rounded-none!"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        {/* --- CỘT TRÁI: ẢNH PHÒNG --- */}
        <div className="w-full sm:w-48 h-32 shrink-0 overflow-hidden rounded-lg border border-gray-100">
          <Image
            alt={booking.room?.name}
            src={roomImage}
            className="object-cover w-full h-full"
            height="100%"
            width="100%"
            preview={false}
          />
        </div>

        {/* --- CỘT GIỮA: THÔNG TIN --- */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <Title level={5} className="m-0 text-gray-800 line-clamp-1">
                {booking.room?.name || "Tên phòng đang cập nhật"}
              </Title>
              {/* Trên mobile Tag sẽ xuống dòng nếu cần, ở đây để chung hàng */}
              <div className="sm:hidden">{getStatusTag(booking.status)}</div>
            </div>

            {/* Loại phòng & Giường */}
            <Space className="text-gray-500 text-xs mt-1">
              <HomeOutlined />
              <Text type="secondary">
                {roomTypeName} • {bedTypeName}
              </Text>
            </Space>

            {/* Địa điểm */}
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <EnvironmentOutlined />
              <span>{formatLocation(booking.room?.location)}</span>
            </div>

            {/* Tag trạng thái (Desktop) */}
            <div className="hidden sm:block mt-2">
              {getStatusTag(booking.status)}
            </div>
          </div>

          {/* Thời gian check-in/out */}
          <div className="bg-blue-50 p-2 rounded text-xs text-gray-600 mt-3 inline-flex gap-3 border border-blue-100">
            <CalendarOutlined />

            <span>
              Check-in: <b>{formatDate(booking.checkIn)}</b>
            </span>
            <Divider type="vertical" className="bg-blue-200 h-3 my-auto" />
            <CalendarOutlined />

            <span>
              Check-out: <b>{formatDate(booking.checkOut)}</b>
            </span>
          </div>
        </div>

        {/* --- CỘT PHẢI: GIÁ & ACTION --- */}
        <div className="flex sm:flex-col justify-between items-end sm:border-l sm:pl-4 border-gray-100 min-w-[120px]">
          <div className="text-right">
            <Text type="secondary" className="text-xs block">
              Tổng thanh toán
            </Text>
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(booking.pricing.total)}
            </span>
          </div>

          <Button type="primary" ghost icon={<RightOutlined />} size="middle">
            Chi tiết
          </Button>
        </div>
      </div>
    </Card>
  );
}
