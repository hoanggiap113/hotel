import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";
import { CITY_IMAGES, Destination } from "@/types/room.type";
export const useDestinations = () => {
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
