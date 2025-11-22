import qs from 'qs';
import api from '@/lib/util/api';
// Import type Building/Filter của bạn
import { IBuilding } from '@/types/building.type'; 
import { SidebarFilterState } from '@/types/room.type'; 

export const buildingService = {
  search: async (params: SidebarFilterState): Promise<IBuilding[]> => {
    const queryString = qs.stringify(
      { filter: params }, 
      { encode: false, skipNulls: true }
    );
    
    // Gọi API
    const res = await api.get(`/buildings/search?${queryString}`);
    return res.data;
  },

  getById: async (id: string): Promise<IBuilding> => {
    const res = await api.get(`/buildings/${id}`);
    return res.data;
  }
};