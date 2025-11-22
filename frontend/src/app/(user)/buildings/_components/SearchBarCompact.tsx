/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input, Button, DatePicker, InputNumber } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dayjs from "dayjs"; // ⚠️ QUAN TRỌNG: Cần import dayjs

// 1. Định nghĩa kiểu dữ liệu cho Props
interface SearchBarCompactProps {
  defaultCity?: string | null;
  defaultCheckIn?: string | null;
  defaultCheckOut?: string | null;
  defaultCapacity?: string | null;
}

// 2. Nhận props vào component
export default function SearchBarCompact({
  defaultCity,
  defaultCheckIn,
  defaultCheckOut,
  defaultCapacity,
}: SearchBarCompactProps) {
  const router = useRouter();
  const [form] = Form.useForm();

  // 3. Cập nhật useEffect để fill dữ liệu từ props vào form
  useEffect(() => {
    form.setFieldsValue({
      city: defaultCity || null,
      // Antd DatePicker cần object dayjs, không nhận string trực tiếp
      checkIn: defaultCheckIn ? dayjs(defaultCheckIn) : null,
      checkOut: defaultCheckOut ? dayjs(defaultCheckOut) : null,
      // InputNumber cần kiểu số
      capacity: defaultCapacity ? Number(defaultCapacity) : null,
    });
  }, [form, defaultCity, defaultCheckIn, defaultCheckOut, defaultCapacity]);

  const onFinish = (values: any) => {
    const checkInDate = values.checkIn ? values.checkIn.toISOString() : "";
    const checkOutDate = values.checkOut ? values.checkOut.toISOString() : "";

    const params = new URLSearchParams();
    if (values.city) params.set("city", values.city);
    if (checkInDate) params.set("checkIn", checkInDate);
    if (checkOutDate) params.set("checkOut", checkOutDate);
    if (values.capacity) params.set("capacity", values.capacity.toString());

    router.push(`/buildings?${params.toString()}`);
  };

  return (
    <div className="bg-[#20274D] border-b sticky top-0 z-50 flex items-center">
      {/* ... Phần JSX giữ nguyên như cũ ... */}
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Form
          form={form}
          onFinish={onFinish}
          className="flex items-center gap-2 h-10"
        >
          {/* ... Các Form.Item giữ nguyên ... */}
          {/* Code của bạn dài nên mình ẩn bớt cho gọn, logic JSX không đổi */}
          <Form.Item name="city" className="mb-0! pl-2">
            <Input
              placeholder="Địa điểm"
              variant="outlined"
              size="large"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="text-sm"
            />
          </Form.Item>

          <Form.Item name="checkIn" className="mb-0!">
            <DatePicker
              placeholder="Ngày đi"
              variant="outlined"
              size="large"
              prefix={<CalendarOutlined className="text-gray-400" />}
              suffixIcon={null}
              className="text-sm w-36"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            name="checkOut"
            className="mb-0!"
            dependencies={["checkIn"]}
          >
            <DatePicker
              placeholder="Ngày về"
              variant="outlined"
              size="large"
              prefix={<CalendarOutlined className="text-gray-400" />}
              suffixIcon={null}
              className="text-sm w-36"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item name="capacity" className="mb-0!">
            <InputNumber
              placeholder="Số khách"
              min={1}
              variant="outlined"
              size="large"
              prefix={<UserOutlined className="text-gray-400" />}
              style={{ width: "100%" }}
              className="text-base"
            />
          </Form.Item>

          <Form.Item className="mb-0!">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 hover:bg-blue-700"
              size="middle"
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
