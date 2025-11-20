/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal, Form, Input, InputNumber, Select, Space, Row, Col } from "antd";
import { RoomFilter } from "@/types/room.type";
import { useEffect } from "react";
import { BEDTYPE_OPTIONS, AMENITY_OPTIONS, ROOMTYPE_OPTIONS } from "./constant";
interface RoomFilterModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: RoomFilter) => void;
}
const amenities = [
  { label: "TV", value: "TV" },
  { label: "Bữa sáng", value: "breakfast" },
];

export default function RoomFilterModal({
  open,
  onCancel,
  onSubmit,
}: RoomFilterModalProps) {
  const [form] = Form.useForm<RoomFilter>();
  useEffect(() => {
    if (!open) form.resetFields();
  }, [open, form]);
  const handleOk = () => {
    form.validateFields().then(onSubmit);
  };
  return (
    <Modal
      title="Bộ lọc phòng"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Lọc"
      cancelText="Hủy"
      className="!p-6"
    >
      <div className="max-h-[70vh] overflow-y-auto pr-2"></div>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Loại phòng" name="roomType">
              <Select
                placeholder="Chọn loại phòng"
                options={ROOMTYPE_OPTIONS}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Loại giường" name="bedType">
              <Select
                placeholder="Chọn loại giường"
                options={BEDTYPE_OPTIONS}
              ></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="priceFrom" label="Giá từ">
              <InputNumber
                min={0}
                placeholder="VND"
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="priceTo" label="Giá đến">
              <InputNumber
                min={0}
                placeholder="VND"
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="capacityFrom" label="Số người từ">
              <InputNumber min={1} placeholder="" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="capacityTo" label="Số người đến">
              <InputNumber min={1} placeholder="" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="amenities" label="Dịch vụ">
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn dịch vụ"
            options={AMENITY_OPTIONS}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Thành phố"
              name={["location", "city"]}
            >
              <Input placeholder="VD: Hà Nội" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phường/xã"
              name={["location", "ward"]}
            >
              <Input placeholder="VD: Ba Đình" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Địa chỉ chi tiết"
          name={["location", "address"]}
        >
          <Input placeholder="VD: 123 Nguyễn Trãi" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
