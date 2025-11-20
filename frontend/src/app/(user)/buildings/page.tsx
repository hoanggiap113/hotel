/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SidebarFilterState } from "@/types/room.type";
import SidebarFilter from "../_components/buildings/SidebarFIlters";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import api from "@/lib/api";
import SearchBarCompact from "./components/SearchBarCompact";
import { IBuilding } from "@/types/building.type";
import BuildingCard from "../_components/buildings/BuildingCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
export default function RoomPage() {
  const [buildings, setBuildings] = useState<IBuilding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const fetchRooms = async (filterData: SidebarFilterState) => {
    setIsLoading(true);
    try {
      const res = await api.get("/buildings/search", {
        params: {
          filter: filterData,
        },
      });
      setBuildings(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phòng:", error);
      setBuildings([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Lấy tất cả giá trị filter từ URL
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const capacity = searchParams.get("capacity");
    const city = searchParams.get("city");
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");
    const roomType = searchParams.get("roomType");
    const bedType = searchParams.get("bedType");
    const amenitiesParam = searchParams.get("amenities");

    setCheckIn(checkIn);
    setCheckOut(checkOut);
    const filterFromUrl: any = {};

    if (checkIn) filterFromUrl.checkIn = checkIn;
    if (checkOut) filterFromUrl.checkOut = checkOut;
    if (capacity) filterFromUrl.capacity = Number(capacity);
    if (priceFrom) filterFromUrl.priceFrom = Number(priceFrom);
    if (priceTo) filterFromUrl.priceTo = Number(priceTo);
    if (roomType) filterFromUrl.roomType = roomType;
    if (bedType) filterFromUrl.bedType = bedType;
    if (city) filterFromUrl.location = { city: city };
    if (amenitiesParam) {
      filterFromUrl.amenities = amenitiesParam.split(",");
    }

    fetchRooms(filterFromUrl);
  }, [searchParams]);

  const handleFilterSearch = (sidebarFilters: SidebarFilterState) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const { city, priceFrom, priceTo, roomType, bedType, amenities } =
      sidebarFilters;

    if (city) {
      currentParams.set("city", city);
    } else {
      currentParams.delete("city");
    }
    if (priceFrom) {
      currentParams.set("priceFrom", priceFrom.toString());
    } else {
      currentParams.delete("priceFrom");
    }
    if (priceTo) {
      currentParams.set("priceTo", priceTo.toString());
    } else {
      currentParams.delete("priceTo");
    }

    if (roomType) {
      currentParams.set("roomType", roomType);
    } else {
      currentParams.delete("roomType");
    }
    if (bedType) {
      currentParams.set("bedType", bedType);
    } else {
      currentParams.delete("bedType");
    }
    if (amenities && amenities.length > 0) {
      currentParams.set("amenities", amenities.join(","));
    } else {
      currentParams.delete("amenities");
    }
    router.push(`${pathname}?${currentParams.toString()}`);
  };
  return (
    <>
      <SearchBarCompact />
      <div className="max-w-7xl mx-auto flex px-8 py-10 gap-6">
        {/* Sidebar */}
        <SidebarFilter onFilterChange={handleFilterSearch} />

        {/* Main content */}
        <section className="flex-1 space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <Spin size="large" tip="Đang tìm phòng..." />
            </div>
          ) : buildings.length > 0 ? (
            // --- SỬA LỖI TẠI ĐÂY ---
            // Kiểm tra xem 'checkIn' và 'checkOut' có phải là string hợp lệ không
            checkIn && checkOut ? (
              // Trường hợp 1: CÓ ngày. Truyền props vào.
              buildings.map((building) => (
                <BuildingCard
                  key={building.id}
                  building={building}
                  checkIn={checkIn}
                  checkOut={checkOut}
                />
              ))
            ) : (
              buildings.map((building) => (
                <BuildingCard key={building.id} building={building} />
              ))
            )
          ) : (
            // --- KẾT THÚC SỬA LỖI ---

            <div className="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>Không tìm thấy phòng nào phù hợp với tiêu chí của bạn.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
