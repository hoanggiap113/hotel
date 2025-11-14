import { IRoomLocation } from "@/types/room.type";
export default function formatLocation(location?: IRoomLocation) {
  if (!location) return "";
  return [location.address, location.ward, location.city]
    .filter(Boolean)
    .join(", ");
}