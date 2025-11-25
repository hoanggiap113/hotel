import {
  useQuery,
  keepPreviousData,
  UseQueryResult,
} from "@tanstack/react-query";
import { buildingService } from "@/services/building.service";
import { SidebarFilterState } from "@/types/room.type";
import { BuildingDetailRequest, IBuildingDetail } from "@/types/building.type";

export const useBuildings = (filters: SidebarFilterState) => {
  return useQuery({
    queryKey: ["buildings", filters],
    queryFn: () => buildingService.search(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
export const useBuildingDetail = ({
  id,
  checkIn,
  checkOut,
}: BuildingDetailRequest): UseQueryResult<IBuildingDetail> => {
  return useQuery({
    queryKey: ["buildings", "detail", id, { checkIn, checkOut }],
    queryFn: () => buildingService.getById(id, checkIn, checkOut),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    placeholderData: (previousData) => previousData,
  });
};
