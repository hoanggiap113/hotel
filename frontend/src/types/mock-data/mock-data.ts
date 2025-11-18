// Mock Room Data (Giả lập response từ API)
export const MOCK_ROOM_DATA = {
  _id: "room_vip_01",
  name: "Deluxe Ocean Suite",
  type: "Suite",
  price: 2500000, // 2.500.000 VND
  address: "123 Võ Nguyên Giáp, Đà Nẵng",
  images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop"],
  rating: 4.8,
  amenities: ["Wifi", "Bồn tắm", "Bữa sáng miễn phí"]
};

// Mock Payment Data
import { EPaymentMethod } from "@/types/payment.type";

export const MOCK_PAYMENT = {
  method: EPaymentMethod.CREDIT_CARD, // Hoặc EPaymentMethod.CASH
  status: "PENDING"
};