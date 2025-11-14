"use client";
import Image from "next/image";
import { IRoom } from "@/types/room.type";
import { AmenityData } from "@/types/amenity-icons";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import api from "@/lib/api";

export default function RoomDetailPage() {
  const [room, setRoom] = useState<IRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const id = params.roomId;

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Lỗi:", err);
        setRoom(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const API_PREFIX = process.env.NEXT_PUBLIC_API_URL;
  const largeImage = room?.images?.[0] ?? "/hero.jpg";
  const smallImages = room?.images?.slice(1, 3) || [];

  const availableAmenities =
    room?.amenities
      ?.map((amenityKey) => AmenityData[amenityKey])
      ?.filter((data) => data !== undefined) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" tip="Đang tải chi tiết phòng..." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
      {/* Tiêu đề & Địa chỉ */}
      <div className="mx-auto flex max-w-7xl gap-6 px-8 py-5">
        <div className="mx-auto flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold text-blue-600">{room!.name}</h1>
          <span className="text-gray-400">{`${room!.location.city}, ${
            room!.location.ward
          }`}</span>
        </div>
      </div>
      {/* Ảnh */}
      <div className="rounded-xl overflow-hidden shadow-xl">
        <div className="flex h-[450px] gap-2">
          {largeImage && (
            <div className="w-2/3 relative">
              <Image
                src={largeImage}
                alt={`${room!.name} large view`}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-2 w-1/3">
            {smallImages?.[0] && (
              <div className="flex-1 relative">
                {" "}
                {/* Thêm relative */}
                <Image
                  src={smallImages[0]}
                  alt="Bedroom view"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            {smallImages?.[1] && (
              <div className="flex-1 relative">
                {" "}
                {/* Thêm relative */}
                <Image
                  src={smallImages[1]}
                  alt="Bathroom view"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chi tiết & Đặt phòng*/}
      <div className="mt-8 flex gap-8">
        {/* Mô tả */}
        <div className="flex flex-col flex-2 items-start gap-4 w-2/3">
          <h3 className="font-bold text-blue-950 text-2xl border-b pb-2 w-full">
            Mô tả
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            {room!.description}
          </p>
        </div>

        {/* Booking Box */}
        <div className="flex-1 flex flex-col shadow-xl rounded-xl p-6 bg-white border border-gray-100 h-fit w-1/3">
          <h4 className="text-xl font-semibold mb-2">Đặt phòng ngay</h4>
          <div className="text-3xl font-bold text-blue-600 mb-4">
            ${room!.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-500">/per day</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-150">
            Book Now!
          </button>
        </div>
      </div>

      {/* Tiện ích (Amenities - Giữ nguyên) */}
      <div className="mt-12">
        <h3 className="font-bold text-blue-950 text-2xl border-b pb-2 mb-4">
          Nơi này có gì?
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-gray-700">
          {availableAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <i
                className={`${amenity.icon} text-blue-500`}
                title={amenity.label}
              ></i>
              <span>{amenity.label}</span>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <i className="fas fa-snowflake text-blue-500"></i>
            <span>Air Conditioning</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-utensils text-blue-500"></i>
            <span>Private Kitchenette</span>
          </div>
        </div>
      </div>
    </div>
  );
}
