/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Image, Tag, App, message } from "antd";
import Link from "next/link";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IRoom } from "@/types/room.type";

export default function RoomTable(
  onDelete: (roomId: string) => void,
  onEdit: (room: IRoom) => void
) {
  const column = [
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (images: string[]) => {
        if (!images || images.length === 0) {
          return "Không có ảnh";
        }

        const imageUrl = images[0];

        const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;

        return (
          <Image
            src={fullImageUrl}
            alt="Ảnh phòng"
            width={80}
            height={60}
            style={{ objectFit: "cover" }}
            preview={true}
          />
        );
      },
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: { id: string }) => (
        <Link
          href={`/rooms/${record.id}`}
          className="text-blue-600 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Loại phòng",
      dataIndex: "roomType",
      key: "type",
      render: (value: string) => {
        const map: Record<
          string,
          { label: string; color: string; icon?: React.ReactNode }
        > = {
          deluxe: { label: "Phòng sang trọng", color: "blue" },
          single: { label: "Phòng đơn", color: "green" },
          suite: { label: "Phòng cao cấp", color: "gold" },
          double: { label: "Phòng đôi", color: "pink" },
        };

        const item = map[value] || {
          label: "Không xác định",
          color: "default",
        };
        return (
          <Tag color={item.color}>
            {item.icon} {item.label}
          </Tag>
        );
      },
    },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value: number) => {
        if (!value) return "-";
        return `${value.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        })}/đêm`;
      },
    },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    { title: "Ngày cập nhật", dataIndex: "updatedAt", key: "updatedAt" },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      render: (text: any, record: IRoom) => (
        <div className="flex justify-center gap-3">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-600"
            onClick={() => onEdit(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record.id)}
          />
        </div>
      ),
    },
  ];
  return column;
}
