import { roomService } from "@/services/room.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CITY_IMAGES, Destination } from "@/types/room.type";
export const useRooms = () => {};
export const useRoomDetail = (id: string) => {
  return useQuery({
    queryKey: ["detail"],
    queryFn: () => roomService.getRoom(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useDestinations = (): UseQueryResult<Destination[]> => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: roomService.getLocationStats,
    staleTime: 1000 * 60 * 10,
    select: (data) => {
      return data.map((item) => ({
        name: item.city,
        img: CITY_IMAGES[item.city],
        stays: `${item.count.toLocaleString()} chỗ ở`,
      })) as Destination[];
    },
  });
};
