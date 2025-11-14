export type CityOption = {
  label: string;
  value: string;
};
export interface ILocation {
  city?: string;
  ward?: string;
  address?: string;
};

export const CityOptions: CityOption[] = [
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "TP.HCM", value: "TP.HCM" },
  { label: "Nha Trang", value: "Nha Trang" },
  { label: "Vũng Tàu", value: "Vũng Tàu" },
  { label: "Ninh Bình", value: "Ninh Bình" },
  { label: "Huế", value: "Huế" },
];
