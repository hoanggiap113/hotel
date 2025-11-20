"use client";

import React from "react";
import { Tabs, Card, Typography } from "antd";
import type { TabsProps } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

import BookingList from "./components/BookingList";
import { EBookingStatus } from "@/types/booking.type";

const { Title } = Typography;

export default function BookingPage() {
  // 1. Cấu hình danh sách các Tab
  const items: TabsProps["items"] = [
    {
      key: "upcoming", 
      label: "Sắp tới", 
      // Gọi BookingList và truyền status CONFIRMED
      children: <BookingList status={EBookingStatus.CONFIRMED} />,
    },
    {
      key: "completed",
      label: "Hoàn tất",
      children: <BookingList status={EBookingStatus.COMPLETED} />,
    },
    {
      key: "cancelled",
      label: "Đã hủy",
      children: <BookingList status={EBookingStatus.CANCELLED} />,
    },
  ];

  const onChange = (key: string) => {
    console.log("Người dùng đã chuyển sang tab:", key);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* Tiêu đề trang */}
      <Title level={3} className="mb-6 text-gray-800">
        Đơn đặt chỗ của tôi
      </Title>

      {/* Khung chứa Tabs - Style background trắng, bo góc, bóng đổ nhẹ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px]">
        {/* Component Tabs của Ant Design */}
        <Tabs
          defaultActiveKey="upcoming"
          items={items}
          onChange={onChange}
          size="large" 
          tabBarStyle={{
            padding: "0 24px",
            marginBottom: 0,
            borderBottom: "1px solid #f0f0f0", 
          }}
          destroyOnHidden={true}
        />

        {/* Phần nội dung bên dưới Tab (Children sẽ được render vào đây) */}
        <div className="p-6 bg-gray-50/50 h-full">
          {/* BookingList sẽ hiện ở đây */}
        </div>
      </div>
    </div>
  );
}
