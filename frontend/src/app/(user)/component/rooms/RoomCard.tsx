"use client"
import Image from "next/image";
import Link from "next/link";

interface RoomCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  img: string;
  amenities?: string[];
}

export default function RoomCard({
  id,
  name,
  location,
  rating,
  reviews,
  price,
  img,
  amenities = []
}: RoomCardProps) {
  return (
   <Link 
        href={`/rooms/${id}`} // TẠO ĐƯỜNG DẪN ĐỘNG VỚI ID
        className="bg-white rounded-2xl shadow flex hover:shadow-lg transition overflow-hidden cursor-pointer"
    >
      {/* Hình ảnh khách sạn */}
      <div className="relative w-1/3 h-48">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{location}</p>
          {/* Box tiện ích */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {amenities.map((u, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  {u}
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
          <div className="text-lg font-bold text-yellow-500">{rating}</div>
          <div className="text-xs text-gray-400">{reviews} đánh giá</div>
        </div>

        <div className="text-right">
          <div className="text-gray-600 text-sm">Giá mỗi đêm</div>
          <div className="text-lg font-semibold text-green-600">{price}</div>
        </div>
      </div>
    </Link>
  );
}
