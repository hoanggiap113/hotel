/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, Select, Checkbox, Slider, Button, Space, Divider } from "antd";
import {
  ERoomType,
  EBedType,
  EAmenity,
  RoomTypeLabel,
  BedTypeLabel,
  AmenityLabel,
  SidebarFilterState,
  CityOptions,
} from "@/types/room.type";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import formatPrice from "@/lib/util/format-price";

interface SidebarProps {
  initialValues?: SidebarFilterState;
  onFilterChange?: (filter: SidebarFilterState) => void;
}

export default function SidebarFilter({
  initialValues,
  onFilterChange,
}: SidebarProps) {
  const defaultState: SidebarFilterState = {
    priceFrom: 0,
    priceTo: 5000000,
    location: undefined,
    roomType: undefined,
    bedType: undefined,
    amenities: [],
  };

  const [filters, setFilters] = useState<SidebarFilterState>(defaultState);

  useEffect(() => {
    if (initialValues) {
      setFilters((prev) => ({
        ...prev,
        ...initialValues,
        priceFrom: initialValues.priceFrom ?? 0,
        priceTo: initialValues.priceTo ?? 5000000,
      }));
    }
  }, [initialValues]);

  const handleChange = (key: keyof SidebarFilterState, value: any) => {
    const newValue = value === null ? undefined : value;

    const updated = { ...filters, [key]: newValue };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleApply = () => {
    onFilterChange?.(filters);
  };

  const handleReset = () => {
    setFilters(defaultState);
    onFilterChange?.(defaultState);
  };
  const handleSliderChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceFrom: value[0],
      priceTo: value[1],
    }));
  };
  return (
    <Card
      title={
        <Space>
          <FilterOutlined />
          <span>Bộ lọc phổ biến</span>
        </Space>
      }
      className="w-full md:w-80 h-fit"
    >
      {/* Khu vực */}
      <div className="mb-4">
        <p className="font-medium mb-2">Khu vực</p>
        <Select
          placeholder="Chọn khu vực"
          className="w-full"
          options={CityOptions}
          value={filters.location?.city}
          onChange={(v) => handleChange("location", v)}
          allowClear
        />
      </div>

      {/* Loại phòng */}
      <div className="mb-4">
        <p className="font-medium mb-2">Loại phòng</p>
        <Select
          placeholder="Chọn loại phòng"
          className="w-full"
          value={filters.roomType} 
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
          value={filters.bedType} 
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
          value={filters.amenities} 
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
          value={[filters.priceFrom ?? 0, filters.priceTo ?? 5000000]}
          onChange={handleSliderChange}
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
        <Button type="primary" onClick={handleApply}>
          Áp dụng
        </Button>
      </div>
    </Card>
  );
}
