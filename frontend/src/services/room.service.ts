import api from "@/lib/util/api";


import {IRoom, LocationStat } from "@/types/room.type";

export const roomService = {
    getLocationStats: async () : Promise<LocationStat[]> => {
        const res = await api.get("/rooms/place-stats");
        return res.data
    },
    getRoom: async(id : string): Promise<IRoom> => {
        const res = await api.get(`/rooms/${id}`)
        return res.data
    }
}