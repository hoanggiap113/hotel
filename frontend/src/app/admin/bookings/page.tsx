"use client";
import {
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Table, Tag, Button } from "antd";
import { useState } from "react";

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const bookings = [
    {
      id: 1,
      room: "Phòng A",
      checkIn: "2025-10-20",
      checkOut: "2025-10-22",
      status: "Đang ở",
      price: "1.200.000đ",
      customer: "Nguyễn Văn A",
    },
    {
      id: 2,
      room: "Phòng B",
      checkIn: "2025-10-18",
      checkOut: "2025-10-19",
      status: "Đã trả",
      price: "800.000đ",
      customer: "Trần Thị B",
    },
    {
      id: 3,
      room: "Phòng C",
      checkIn: "2025-10-21",
      checkOut: "2025-10-23",
      status: "Đặt trước",
      price: "1.500.000đ",
      customer: "Hoàng Gia P",
    },
  ];

  const statusColor: Record<string, string> = {
    "Đang ở": "blue",
    "Đã trả": "green",
    "Đặt trước": "orange",
  };

// Load giả 
  const fetchProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const columns = [
    { title: "Tên phòng", dataIndex: "room", key: "room" },
    { title: "Ngày Check-In", dataIndex: "checkIn", key: "checkIn" },
    { title: "Ngày Check-Out", dataIndex: "checkOut", key: "checkOut" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColor[status]} className="px-2 py-1 rounded-md text-sm">
          {status}
        </Tag>
      ),
    },
    { title: "Tổng Giá", dataIndex: "price", key: "price" },
    { title: "Người đặt", dataIndex: "customer", key: "customer" },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      render: () => (
        <div className="flex justify-center gap-3">
          <Button type="text" icon={<EditOutlined />} className="text-blue-600" />
          <Button type="text" icon={<DeleteOutlined />} danger />
        </div>
      ),
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="p-6 flex-1 overflow-y-auto">
            <h1 className="text-[30px] font-bold mb-4 text-blue-500">
          Danh sách đơn đặt phòng
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-4">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <PlusCircleOutlined className="text-2xl" />
            <span>Thêm đơn đặt phòng</span>
          </button>

          <button
            onClick={fetchProducts}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              loading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            disabled={loading}
          >
            <UndoOutlined className={loading ? "animate-spin text-gray-400" : ""} />
            <span>{loading ? "Đang tải..." : "Refresh"}</span>
          </button>

          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 ml-auto w-64 shadow-sm">
            <SearchOutlined className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden p-3">
          <Table columns={columns} dataSource={bookings} loading={loading} pagination={{ pageSize: 5 }} rowKey="id"/>
        </div>
      </main>
    </div>
  );
}
