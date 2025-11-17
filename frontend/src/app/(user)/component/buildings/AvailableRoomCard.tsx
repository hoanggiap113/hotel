import { AmenityData } from "@/types/amenity-icons";
import { IBuildingDetail } from "@/types/building.type";
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
            ?.map((amenityKey) => AmenityData[amenityKey])
            ?.filter((data) => data !== undefined) ?? [];

        return (
          <div
            key={room.id}
            className="flex flex-col md:flex-row gap-4 border rounded-xl shadow-lg overflow-hidden mb-8 bg-white"
          >
            {/* Ảnh phòng */}
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <Image
                src={room.images?.[0] ?? "/hero.jpg"}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thông tin phòng */}
            <div className="flex-1 p-6">
              <h3 className="text-2xl font-bold text-blue-800">{room.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{room.description}</p>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Tiện nghi phòng:</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {roomAmenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <i className={`${amenity.icon} text-blue-500 w-5`}></i>
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Đặt phòng */}
            <div className="w-full md:w-1/5 p-6 border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50 flex flex-col justify-center items-center md:items-end">
              <div className="text-2xl font-bold text-blue-600 mb-4">
                {room.price.toLocaleString()} VNĐ
                <span className="text-sm text-gray-500 block md:inline">
                  {" "}
                  / đêm
                </span>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg transition duration-150"
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
