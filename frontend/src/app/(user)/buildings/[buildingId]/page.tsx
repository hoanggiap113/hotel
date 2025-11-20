"use client";
import Image from "next/image";
import { AmenityData } from "@/types/amenity-icons";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import api from "@/lib/api";
import { IBuildingDetail } from "@/types/building.type";
import formatLocation from "@/lib/format-address";
import PlaceSection from "../../_components/PlaceSection";
import { useRouter } from "next/navigation";
import AvailableRoomCard from "../../_components/buildings/AvailableRoomCard";
export default function BuildingDetailPage() {
  const [building, setBuilding] = useState<IBuildingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params.buildingId;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const router = useRouter();

  const handleOrderRoom = (roomId: string) => {
    const bookingInfo = {
      checkIn: checkIn,
      checkOut: checkOut,
      roomId: roomId,
    };
    sessionStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));

    router.push(`/booking`);
  };

  useEffect(() => {
    if (!id || !checkIn || !checkOut) {
      setIsLoading(false);
      console.error("Thiếu ID tòa nhà hoặc ngày check-in/check-out");
      return;
    }
    const queryParams = new URLSearchParams();
    queryParams.set("checkIn", checkIn);
    queryParams.set("checkOut", checkOut);

    const fetchBuildingDetail = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/buildings/${id}?${queryParams.toString()}`);
        const apiResponse = res.data;
        const formattedBuilding: IBuildingDetail = {
          ...apiResponse.building,
          rooms: apiResponse.rooms,
        };
        setBuilding(formattedBuilding);
        console.log(res.data);
      } catch (err) {
        console.error("Lỗi:", err);
        setBuilding(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBuildingDetail();
  }, [id, checkIn, checkOut]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" tip="Đang tải chi tiết tòa nhà..." />
      </div>
    );
  }

  if (!building) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Không tìm thấy thông tin tòa nhà.</p>
      </div>
    );
  }

  // --- LOGIC HIỂN THỊ (ĐÃ SỬA) ---

  // Lấy ảnh TÒA NHÀ
  const largeImage = building.images?.[0] ?? "/hero.jpg";
  const smallImages = building.images?.slice(1, 3) || [];

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl gap-6 px-8 py-5">
        <div className="mx-auto flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold text-blue-600">{building.name}</h1>
          <span className="text-gray-400">
            {formatLocation(building.location)}
          </span>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden shadow-xl">
        <div className="flex h-[450px] gap-2">
          {largeImage && (
            <div className="w-2/3 relative">
              <Image
                src={largeImage}
                alt={`${building.name} large view`}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-2 w-1/3">
            {smallImages?.[0] && (
              <div className="flex-1 relative">
                <Image
                  src={smallImages[0]}
                  alt="Building view 1"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            {smallImages?.[1] && (
              <div className="flex-1 relative">
                <Image
                  src={smallImages[1]}
                  alt="Building view 2"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col flex-2 items-start gap-4 w-full">
          <h3 className="font-bold text-blue-950 text-2xl border-b pb-2 w-full">
            Mô tả tòa nhà
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            {building.description}
          </p>
        </div>
      </div>

      <div className="mt-12 w-full">
        <h3 className="font-bold text-blue-950 text-3xl border-b pb-4 mb-8 text-center md:text-left">
          Các phòng trống
        </h3>
        <div className="bg-gray-50 border py-3">
          <AvailableRoomCard
            handleOrderRoom={handleOrderRoom}
            building={building}
          />
        </div>
      </div>
      <PlaceSection />
    </div>
  );
}
