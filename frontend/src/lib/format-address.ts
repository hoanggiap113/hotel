export default function formatLocation(location?: {
  address?: string;
  ward?: string;
  city?: string;
}) {
  if (!location) return "";
  return [location.address, location.ward, location.city]
    .filter(Boolean)
    .join(", ");
}