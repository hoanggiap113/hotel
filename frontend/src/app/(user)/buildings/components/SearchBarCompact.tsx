/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input, Button, DatePicker, InputNumber } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { updateSearchCriteria } from "@/store/slices/searchSlice";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function SearchBarCompact() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  // Lấy giá trị từ Redux store
  const { checkIn, checkOut, capacity } = useAppSelector(
    (state) => state.search
  );

  // Set giá trị ban đầu từ Redux
  useEffect(() => {
    form.setFieldsValue({
      checkIn: checkIn ? dayjs(checkIn) : null,
      checkOut: checkOut ? dayjs(checkOut) : null,
      capacity: capacity || null,
    });
  }, [checkIn, checkOut, capacity, form]);

  const onFinish = (values: any) => {
    const checkInDate = values.checkIn ? values.checkIn.toISOString() : "";
    const checkOutDate = values.checkOut ? values.checkOut.toISOString() : "";

    const params = new URLSearchParams();
    if (values.city) params.set("city", values.city);
    if (checkInDate) params.set("checkIn", checkInDate);
    if (checkOutDate) params.set("checkOut", checkOutDate);
    if (values.capacity) params.set("capacity", values.capacity.toString());

    const searchPayload = {
      checkIn: values.checkIn ? values.checkIn.toISOString() : null,
      checkOut: values.checkOut ? values.checkOut.toISOString() : null,
      capacity: values.capacity || null,
    };

    dispatch(updateSearchCriteria(searchPayload));
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <div className="bg-purple-950 border-b sticky top-0 z-50 flex items-center">
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Form
          form={form}
          onFinish={onFinish}
          className="flex items-center gap-2 h-10"
        >
          {/* Destination Input */}
          <Form.Item name="city" className="!mb-0 pl-2">
            <Input
              placeholder="Địa điểm"
              variant="outlined"
              size="large"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="text-sm"
            />
          </Form.Item>

          {/* Check In Date */}
          <Form.Item name="checkIn" className="!mb-0">
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
            className="!mb-0"
            dependencies={["checkIn"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const checkinValue = getFieldValue("checkIn");
                  if (!value || !checkinValue) {
                    return Promise.resolve();
                  }
                  if (value.isBefore(checkinValue, "day")) {
                    return Promise.reject(
                      new Error("Ngày về phải sau ngày đi!")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
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

          {/* Capacity */}
          <Form.Item name="capacity" className="!mb-0">
            <InputNumber
              placeholder="Số khách"
              min={1}
              variant="outlined"
              size="large"
              prefix={<UserOutlined className="text-gray-400" />}
              style={{width:'100%'}}
              className="text-base"
            />
          </Form.Item>

          {/* Search Button */}
          <Form.Item className="!mb-0">
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
