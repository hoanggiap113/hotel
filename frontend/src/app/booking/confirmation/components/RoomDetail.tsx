"use client";
import { IRoom,AmenityLabel,BedTypeLabel,RoomTypeLabel } from "@/types/room.type";
interface RoomDetailCardProps {
  room: IRoom;
}

export default function RoomDetailCard({room} : RoomDetailCardProps) {
  return (
    <>
      <div className="p-4 md:p-6">
        <div className="h-48 w-full overflow-hidden rounded-lg shadow-md mb-5">
          <img
            src={room.images?.[0]}
            alt={room.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/400x250/cccccc/333333?text=Room+Image";
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">{room.name}</h2>

        {/* Description List Style - Giống AntD Descriptions */}
        <div className="space-y-3 text-sm text-gray-700 border-t pt-3">
          <div className="flex items-center space-x-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className="truncate"
              title={`${room.location.address}, ${room.location.ward}, ${room.location.city}`}
            >
              {room.location.address}, {room.location.ward},{" "}
              {room.location.city}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-2">
            {/* Item 1: Loại phòng */}
            <span className="font-medium text-gray-500">Loại phòng:</span>
            <span className="font-semibold text-right">
              {RoomTypeLabel[room.roomType]}
            </span>

            {/* Item 2: Loại giường */}
            <span className="font-medium text-gray-500">Loại giường:</span>
            <span className="text-right">{BedTypeLabel[room.bedType]}</span>

            {/* Item 3: Sức chứa */}
            <span className="font-medium text-gray-500">Sức chứa:</span>
            <span className="text-right">{room.capacity} người</span>
          </div>

          <div className="pt-3 border-t border-dashed">
            <span className="font-semibold block mb-1">Tiện nghi:</span>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-800"
                >
                  {AmenityLabel[amenity]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
