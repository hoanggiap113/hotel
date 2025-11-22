/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Spin, Empty } from "antd";
import SearchBarCompact from "./_components/SearchBarCompact";
import SidebarFilter from "../_components/buildings/SidebarFilters";
import BuildingCard from "../_components/buildings/BuildingCard";
import { useBuildingFilter } from "@/hooks/queries/buildings/use-building-filter";
import { useBuildings } from "@/hooks/queries/buildings/use-building";
import { useSearchParams } from "next/navigation";
export default function RoomPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const capacity = searchParams.get("capacity");

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
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <Spin size="large" tip="Đang tìm phòng..." />
            </div>
          ) : buildings.length > 0 ? (
            buildings.map((building) => (
              <BuildingCard
                key={building.id}
                building={building}
                checkIn={filters.checkIn}
                checkOut={filters.checkOut}
              />
            ))
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
