"use client";
import dynamic from "next/dynamic";
import { Spin } from "antd";
import { IBuilding } from "@/types/building.type";

// Dynamic import để tránh lỗi SSR với Leaflet
const BuildingLocationMap = dynamic(
  () => import("./BuildingLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] flex items-center justify-center bg-gray-100 rounded-xl">
        <Spin size="large" tip="Đang tải bản đồ..." />
      </div>
    ),
  }
);

interface Props {
  building: IBuilding;
}

export default function BuildingLocationMapWrapper({ building }: Props) {
  return <BuildingLocationMap building={building} />;
}