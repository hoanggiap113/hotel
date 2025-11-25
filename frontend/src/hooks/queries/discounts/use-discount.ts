import { discountService } from "@/services/discount.service";
import { useQuery } from "@tanstack/react-query";

export const useRoomDiscounts = (roomId: string) => {
  return useQuery({
    queryKey: ["vouchers", roomId],
    queryFn: () => discountService.getRoomDiscount(roomId),
    enabled: !!roomId, 
    staleTime: 1000 * 60 * 5, 
  });
};
