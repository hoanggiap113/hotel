"use client";
import Image from "next/image";
import Link from "next/link";
import { AmenityLabel, IRoom } from "@/types/room.type";
import formatLocation from "@/lib/util/format-address";
import formatPrice from "@/lib/util/format-price";
interface RoomCardProps {
  room: IRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
  const images = room?.images?.[0] ?? "/hero.jpg"

  return (
    <Link
      href={`/rooms/${room.id}`}
      className="bg-white rounded-2xl shadow flex hover:shadow-lg transition overflow-hidden cursor-pointer"
    >
      {/* Hình ảnh khách sạn */}
      <div className="relative w-1/3 h-48">
        <Image
          src={images}
          alt={room.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatLocation(room.location)}
          </p>
          {/* Box tiện ích */}
          {room.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity} // Dùng chính tên tiện ích làm key sẽ tốt hơn là index
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  {AmenityLabel[amenity]} {/* Tra cứu tên hiển thị */}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cột bên phải: đánh giá + giá */}
      <div className="p-4 flex flex-col items-end justify-between min-w-[140px] border-l border-gray-100">
        <div className="text-right">
          <div className="text-sm text-gray-600">Đánh giá</div>
          <div className="text-lg font-bold text-yellow-500">
            {room.rating.average}
          </div>
          <div className="text-xs text-gray-400">
            {room.rating.reviewsCount} lượt đánh giá
          </div>
        </div>

        <div className="text-right">
          <div className="text-gray-600 text-sm">Giá mỗi đêm</div>
          <div className="text-lg font-semibold text-green-600">
            {formatPrice(room.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}
