/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

"use client";

import { useState } from "react";
import { Card, Select, Checkbox, Slider, Button, Space, Divider } from "antd";
import {
  ERoomType,
  EBedType,
  EAmenity,
  RoomTypeLabel,
  BedTypeLabel,
  AmenityLabel,
  RoomFilter,
} from "@/types/room.type";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import formatPrice from "@/lib/format-price";
export default function SidebarFilter({
  onFilterChange,
}: {
  onFilterChange?: (filter: RoomFilter) => void;
}) {
  const [filters, setFilters] = useState<RoomFilter>({
    priceFrom: 0,
    priceTo: 500000,
  });

  const handleChange = (key: keyof RoomFilter, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleReset = () => {
    const reset = { priceFrom: 0, priceTo: 5000000 };
    setFilters(reset);
    onFilterChange?.(reset);
  };

  return (
    <Card
      title={
        <Space>
          <FilterOutlined />
          <span>Bộ lọc phổ biến</span>
        </Space>
      }
      className="w-full md:w-80"
    >
      {/* Khu vực */}
      <div className="mb-4">
        <p className="font-medium mb-2">Khu vực</p>
        <Select
          placeholder="Chọn khu vực"
          className="w-full"
          options={[
            { label: "Hà Nội", value: "Hà Nội" },
            { label: "Đà Nẵng", value: "Đà Nẵng" },
            { label: "TP. Hồ Chí Minh", value: "TPHCM" },
          ]}
          onChange={(v) => handleChange("name", v)}
          allowClear
        />
      </div>

      {/* Loại phòng */}
      <div className="mb-4">
        <p className="font-medium mb-2">Loại phòng</p>
        <Select
          placeholder="Chọn loại phòng"
          className="w-full"
          options={Object.values(ERoomType).map((v) => ({
            label: RoomTypeLabel[v],
            value: v,
          }))}
          onChange={(v) => handleChange("roomType", v)}
          allowClear
        />
      </div>

      {/* Loại giường */}
      <div className="mb-4">
        <p className="font-medium mb-2">Loại giường</p>
        <Select
          placeholder="Chọn loại giường"
          className="w-full"
          options={Object.values(EBedType).map((v) => ({
            label: BedTypeLabel[v],
            value: v,
          }))}
          onChange={(v) => handleChange("bedType", v)}
          allowClear
        />
      </div>

      {/* Tiện nghi */}
      <div className="mb-4">
        <p className="font-medium mb-2">Tiện nghi</p>
        <Checkbox.Group
          options={Object.values(EAmenity).map((v) => ({
            label: AmenityLabel[v],
            value: v,
          }))}
          className="flex flex-col space-y-1"
          onChange={(v) => handleChange("amenities", v as EAmenity[])}
        />
      </div>

      {/* Khoảng giá */}
      <div className="mb-4">
        <p className="font-medium mb-2 flex justify-between items-center">
          <span>Khoảng giá (VND)</span>
          <span className="text-blue-600 font-semibold text-sm">
            {formatPrice(filters.priceFrom)} - {formatPrice(filters.priceTo)}
          </span>
        </p>

        <Slider
          range
          min={0}
          max={10000000}
          step={500000}
          //Dùng value thay vì defaultValue để Slider
          // được kiểm soát bởi state `filters`, giúp nó đồng bộ với giá trị hiển thị bên trên.
          value={[filters.priceFrom!, filters.priceTo!]}
          onChange={(v) => {
            // ... (giữ nguyên logic handleChange)
            handleChange("priceFrom", v[0]);
            handleChange("priceTo", v[1]);
          }}
          tooltip={{
            formatter: (v) => v?.toLocaleString("vi-VN") + " ₫",
          }}
        />
      </div>

      <Divider />

      <div className="flex justify-between">
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          Đặt lại
        </Button>
        <Button type="primary" onClick={() => onFilterChange?.(filters)}>
          Áp dụng
        </Button>
      </div>
    </Card>
  );
}
