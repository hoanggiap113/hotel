/* eslint-disable @typescript-eslint/no-explicit-any */

import { roomService } from "@/services/room.service";
import { CITY_IMAGES, Destination, IRoom } from "@/types/room.type";
import { createBaseQuery } from "../base.query";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// Tạo base queries
const roomBaseQueries = createBaseQuery<IRoom>("rooms", roomService);

export const useRooms = (params?: any) => {
  return roomBaseQueries.useList(params);
};

export const useRoomDetail = (id?: string) => {
  return roomBaseQueries.useDetail(id);
};

export const useCreateRoom = roomBaseQueries.useCreate;
export const useUpdateRoom = roomBaseQueries.useUpdate;
export const useDeleteRoom = roomBaseQueries.useDelete;

//Custom Hook:
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
