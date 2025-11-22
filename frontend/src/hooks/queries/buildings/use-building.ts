import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { buildingService } from '@/services/building.service';
import { SidebarFilterState } from '@/types/room.type';

export const useBuildings = (filters: SidebarFilterState) => {
    return useQuery({
        queryKey: ['buildings',filters],
        queryFn: () => buildingService.search(filters),

        placeholderData:keepPreviousData
    })
}