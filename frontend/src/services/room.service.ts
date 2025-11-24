import api from "@/lib/util/api";


import {LocationStat } from "@/types/room.type";

export const roomService = {
    getLocationStats: async () : Promise<LocationStat[]> => {
        const res = await api.get("/rooms/place-stats");
        return res.data

    }
}