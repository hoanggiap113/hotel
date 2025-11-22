import { ILocation } from "@/types/location.type";
export default function formatLocation(location?: ILocation) {
  if (!location) return "";
  return [location.address, location.ward, location.city]
    .filter(Boolean)
    .join(", ");
}