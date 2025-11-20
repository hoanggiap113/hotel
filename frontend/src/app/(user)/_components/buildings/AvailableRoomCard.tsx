import { AmenityData } from "@/types/amenity-icons";
import { IBuildingDetail } from "@/types/building.type";
import { RoomTypeLabel } from "@/types/room.type";
import Image from "next/image";

export default function AvailableRoomCard({
  handleOrderRoom,
  building,
}: {
  handleOrderRoom: (roomId: string) => void;
  building: IBuildingDetail;
}) {
  if (!building.rooms || building.rooms.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>Rất tiếc, không còn phòng trống nào trong ngày bạn chọn.</p>
      </div>
    );
  }

  return (
    <>
      {building.rooms.map((room) => {
        const roomAmenities =
          room.amenities
            ?.map(
              (amenityKey) =>
                AmenityData[amenityKey as keyof typeof AmenityData]
            )
            ?.filter((data) => data !== undefined) ?? [];

        const roomTypeLabel =
          RoomTypeLabel[room.roomType] ?? room.roomType.toUpperCase();

        return (
          <div
            key={room.id}
            className="flex flex-col md:flex-row shadow-lg overflow-hidden bg-white mb-3 px-2 "
          >
            {/* Ảnh phòng */}
            <div className="relative w-full md:w-1/3 h-60 md:h-auto">
              <Image
                src={room.images?.[0] ?? "/hero.jpg"}
                alt={room.name}
                fill
                className="object-cover"
              />
              {/* TAG loại phòng */}
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                {roomTypeLabel}
              </span>
            </div>

            {/* Thông tin phòng */}
            <div className="flex-1 p-6 md:pr-0">
              <h3 className="text-2xl font-bold text-blue-800 leading-snug">
                {room.name}
              </h3>

              <p className="text-gray-600 mt-2 mb-4 text-sm leading-relaxed">
                {room.description}
              </p>

              {/* Tiện nghi */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-gray-700">
                  Tiện nghi phòng
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                  {roomAmenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <i className={`${amenity.icon} text-blue-500 w-5`} />
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Giá & nút đặt phòng */}
            <div className="md:w-1/4 p-6 border-t md:border-t-0 md:border-l flex flex-col justify-center items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-red-600">
                  {room.price.toLocaleString()}₫
                </div>
                <span className="text-sm text-gray-500">Giá mỗi đêm chưa gồm thuế và phí</span>
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-6 rounded-lg shadow-sm transition duration-150"
                onClick={() => handleOrderRoom(room.id)}
              >
                Chọn phòng
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
