"use client";

import { IBuilding } from "@/types/building.type";
import Link from "next/link";
import Image from "next/image";
import formatLocation from "@/lib/format-address";
import formatPrice from "@/lib/format-price";

interface BuildingCardProps {
  building: IBuilding;
  checkIn?: string;
  checkOut?: string;
}
export default function BuildingCard({
  building,
  checkIn,
  checkOut,
}: BuildingCardProps) {
  const images = building?.images?.[0] ?? "/hero.jpg";
  const params = new URLSearchParams();
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  return (
    <Link
      href={`/buildings/${building.id}?${params.toString()}`}
      className="bg-white rounded-2xl shadow flex hover:shadow-lg transition overflow-hidden cursor-pointer "
    >
      <div className="relative w-1/3 h-48">
        <Image
          src={images}
          alt={building.name ? building.name : "Building Image"}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {building.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatLocation(building.location)}
          </p>
        </div>
      </div>
      <div className="p-4 flex flex-col items-end justify-between min-w-[140px] border-1 border-gray-100">
        <div className="text-right">
          <div className="text-sm text-gray-600">Giá từ</div>
          <div className="text-lg font-bold text-green-500">
            {formatPrice(building.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}
