import api from "@/lib/util/api";
import { BookingResponse, IBookingPayload } from "@/types/booking.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (payload: IBookingPayload): Promise<BookingResponse> => {
      const res = await api.post("/bookings", payload);
      return res.data;
    },
  });
};