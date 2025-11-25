"use client";

import { Empty, Button } from "antd";
import { UnorderedListOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useState } from "react";
import SearchBarCompact from "./_components/SearchBarCompact";
import SidebarFilter from "./_components/SidebarFilters";
import BuildingCard from "./_components/BuildingCard";
import BuildingsMapViewWrapper from "./_components/BuildingsMapViewWrapper";
import { useBuildingFilter } from "@/hooks/queries/buildings/use-building-filter";
import { useBuildings } from "@/hooks/queries/buildings/use-building";
import { useSearchParams } from "next/navigation";
import BuildingSkeleton from "@/common/components/skeletons/BuildingSkeleton";

export default function RoomPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const capacity = searchParams.get("capacity");

  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const { filters, setFilters } = useBuildingFilter();
  const { data: buildings = [], isLoading } = useBuildings(filters);

  return (
    <>
      <SearchBarCompact
        defaultCity={city}
        defaultCheckIn={checkIn}
        defaultCheckOut={checkOut}
        defaultCapacity={capacity}
      />

      <div className="max-w-7xl mx-auto flex px-8 py-10 gap-6">
        {/* Sidebar */}
        <SidebarFilter initialValues={filters} onFilterChange={setFilters} />

        {/* Main content */}
        <section className="flex-1 space-y-6">
          {/* Toggle View Buttons */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {buildings.length} kết quả tìm thấy
            </h2>
            <div className="flex gap-2">
              <Button
                type={viewMode === "list" ? "primary" : "default"}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode("list")}
              >
                Danh sách
              </Button>
              <Button
                type={viewMode === "map" ? "primary" : "default"}
                icon={<EnvironmentOutlined />}
                onClick={() => setViewMode("map")}
              >
                Bản đồ
              </Button>
            </div>
          </div>

          {/* Content Area */}
          {isLoading ? (
            <BuildingSkeleton count={5} />
          ) : buildings.length > 0 ? (
            viewMode === "list" ? (
              // List View
              <div className="space-y-6">
                {buildings.map((building) => (
                  <BuildingCard
                    key={building.id}
                    building={building}
                    checkIn={filters.checkIn}
                    checkOut={filters.checkOut}
                  />
                ))}
              </div>
            ) : (
              // Map View
              <div className="h-[calc(100vh-300px)] min-h-[600px] rounded-xl overflow-hidden shadow-xl">
                <BuildingsMapViewWrapper
                  buildings={buildings}
                  checkIn={filters.checkIn}
                  checkOut={filters.checkOut}
                />
              </div>
            )
          ) : (
            <div className="text-center text-gray-500 h-96 flex items-center justify-center">
              <Empty description="Không tìm thấy phòng nào phù hợp với tiêu chí của bạn." />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
