"use client";
import { RoomFilter, SidebarFilterState } from "@/types/room.type";
import RoomCard from "../component/rooms/RoomCard";
import SidebarFilter from "../component/rooms/SidebarFIlters";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useSearchParams } from "next/navigation";
import { IRoom } from "@/types/room.type";
import { Spin } from "antd";
import { BackendRoomFilter } from "@/types/room.type";
import api from "@/lib/api";
import SearchBarCompact from "./components/SearchBarCompact";
export default function RoomPage() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { checkIn, checkOut, capacity } = useAppSelector(
    (state) => state.search
  );
  const fetchRooms = async (filterData: BackendRoomFilter) => {
    setIsLoading(true);
    console.log("Đang gọi API với filter:", filterData);
    try {
      const res = await api.get<IRoom[]>("/rooms", {
        params: {
          filter: filterData,
        },
      });
      setRooms(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phòng:", error);
      setRooms([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const initialFilter: BackendRoomFilter = {
      checkIn: checkIn,
      checkOut: checkOut,
      capacityFrom: capacity,
    };
    fetchRooms(initialFilter);
  }, [checkIn, checkOut, capacity]);

  const handleFilterSearch = (sidebarFilters: SidebarFilterState) => {
    const { city, ...restOfSidebarFilters } = sidebarFilters;

    const finalFilterObject: BackendRoomFilter = {
      ...restOfSidebarFilters,
      checkIn: checkIn,
      checkOut: checkOut,
      capacityFrom: capacity,
      location: city ? { city: city } : undefined,
    };

    fetchRooms(finalFilterObject);
  };
  console.log(rooms);
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
          ) : rooms.length > 0 ? (
            rooms.map((room) => <RoomCard key={room.id} room={room} />)
          ) : (
            <div className="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>Không tìm thấy phòng nào phù hợp với tiêu chí của bạn.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
