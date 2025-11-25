"use client";
import dynamic from "next/dynamic";
import { Spin } from "antd";
import { IBuilding } from "@/types/building.type";

const BuildingsMapView = dynamic(() => import("./BuildingsMapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
      <Spin size="large" tip="Đang tải bản đồ..." />
    </div>
  ),
});

interface Props {
  buildings: IBuilding[];
  checkIn?: string;
  checkOut?: string;
}

export default function BuildingsMapViewWrapper({
  buildings,
  checkIn,
  checkOut,
}: Props) {
  return (
    <BuildingsMapView
      buildings={buildings}
      checkIn={checkIn}
      checkOut={checkOut}
    />
  );
}