"use client";
import { RoomFilter } from "@/types/room.type";
import RoomCard from "../component/rooms/RoomCard";
import SidebarFilter from "../component/rooms/SidebarFIlters";
import { useState } from "react";
export default function RoomPage() {
  const hotels = [
    {
      id:"1",
      name: "Savila Hà Nội",
      location: "Phố Cổ, Hà Nội",
      rating: 8.7,
      reviews: 1200,
      price: "741.000đ",
      img: "/example.webp",
      amenities: ["WiFi miễn phí", "Bữa sáng", "Điều hòa"],
    },
    {
      id:"2",
      name: "Serenity Villa Hotel",
      location: "Quận Hoàn Kiếm",
      rating: 8.3,
      reviews: 850,
      price: "768.000đ",
      img: "/example2.jpg",
      amenities: ["TV màn phẳng", "Bồn tắm"],
    },
  ];
  const [isLoading,setIsLoading] = useState(false);

  const handleFilter = async (values: RoomFilter) => {
    setIsLoading(true);
    console.log(values)
  }

  return (
    <div className="max-w-7xl mx-auto flex px-8 py-10 gap-6">
      {/* Sidebar */}
      <SidebarFilter onFilterChange={handleFilter} />

      {/* Main content */}
      <section className="flex-1 space-y-6">
        {hotels.map((hotel, index) => (
          <RoomCard key={index} {...hotel}  />
        ))}
      </section>
    </div>
  );
}
