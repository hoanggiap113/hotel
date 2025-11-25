import api from "@/lib/util/api";

import { IRoom, LocationStat } from "@/types/room.type";

import { createBaseService } from "./base.service";

export const roomService = {
  ...createBaseService<IRoom>("rooms"),

  //Custom api
  getLocationStats: async (): Promise<LocationStat[]> => {
    const res = await api.get("/rooms/place-stats");
    return res.data;
  },
};
