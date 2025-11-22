import qs from 'qs';
import api from '@/lib/util/api';
// Import type Building/Filter của bạn
import { IBuilding, IBuildingDetail } from '@/types/building.type'; 
import { SidebarFilterState } from '@/types/room.type'; 

export const buildingService = {
  search: async (params: SidebarFilterState): Promise<IBuilding[]> => {
    const queryString = qs.stringify(
      { filter: params }, 
      { encode: false, skipNulls: true }
    );
    
    const res = await api.get(`/buildings?${queryString}`);
    return res.data;
  },

  getById: async (id: string,checkIn: string, checkOut: string): Promise<IBuildingDetail> => {
     const queryString = qs.stringify(
      {
        checkIn: checkIn,
        checkOut: checkOut
      },{
        skipNulls:true,
        addQueryPrefix:true
      }
    );
    
    const res = await api.get(`/buildings/${id}${queryString}`);
    return res.data;
  }
};