/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Image, Tag } from "antd";
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
        return (
          <Image
            src={images[0] || "example.png"}
            alt="Ảnh phòng"
            width="70%"
            style={{
              height: 140,
              objectFit: "cover",
              borderRadius: 8,
            }}
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
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      width: 180,
      render: (location: IRoom["location"]) => {
        if (!location) return "—";
        return (
          <div className="text-sm">
            <div className="font-medium">{location.city}</div>
            <div className="text-gray-500 text-xs">{location.address}</div>
          </div>
        );
      },
    },
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
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date: Date) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString("vi-VN");
      },
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 120,
      render: (date: Date) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString("vi-VN");
      },
    },
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
