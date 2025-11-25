import api from "@/lib/util/api";
import { IDiscountRoomResponse } from "@/types/discount.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const discountService = {
  getRoomDiscount: async (roomId: string) => {
    const res = await api.get(`/discount-rooms/${roomId}`);
    const rawData = res.data as IDiscountRoomResponse[];

    const availableVouchers = rawData
      .map((item) => item.discount)
      .filter((d) => d.active);

    return availableVouchers;
  },
};
