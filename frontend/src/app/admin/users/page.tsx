/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Table, Button, Tag } from "antd";

type Status = "Super Admin" | "Owner" | "Pending";

export default function UserPage() {
  const users = [
    {
      id: 1,
      name: "Admin",
      email: "david_wagner@example.com",
      role: "Super Admin",
      date: "24 Jun, 2023",
      status: "Super Admin",
    },
    {
      id: 2,
      name: "Kaiser",
      email: "windler.warren@runte.net",
      role: "Owner",
      date: "24 Aug, 2023",
      status: "Owner",
    },
    {
      id: 3,
      name: "Ina Hogan",
      email: "windler.warren@runte.net",
      role: "Guest",
      date: "24 Aug, 2023",
      status: "Guest",
    },
  ];

  const statusColor: Record<string, string> = {
    "Super Admin": "blue",
    Owner: "green",
    Guest: "default",
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="text-gray-400 text-xs">{record.email}</p>
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Vai trò",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColor[status]} className="px-2 py-1">
          {status}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      render: () => (
        <div className="flex justify-center gap-3">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-600"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-red-600"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <main className="flex flex-1 bg-gray-50 min-h-screen">
        <div className="w-full px-3">
          <div className="flex flex-col gap-2 mb-3">
            <h1 className="text-[30px] font-bold mb-4 text-blue-500">
              Danh sách người dùng
            </h1>
            {/* Utility Bar */}
            <div className="flex gap-5 items-center mt-4 mb-6">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-2 w-1/2">
                <SearchOutlined className="text-gray-400 mr-2 text-3xl" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Nút thêm mới */}
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition">
                <PlusCircleOutlined size={18} />
                <span>Thêm người dùng</span>
              </button>
            </div>

            {/* End Utility Bar */}
          </div>
          {/* User Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-3">
            <Table columns={columns} dataSource={users} pagination={false} rowKey="id" />
          </div>

          {/* End UserTable */}
        </div>
      </main>
    </>
  );
}
