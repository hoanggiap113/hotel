/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import { BuildingFilter, EAmenity } from "@/types/room.type";

export function useBuildingFilter() {
  //State
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: BuildingFilter = useMemo(() => {
    return {
      checkIn: searchParams.get("checkIn") || undefined,
      checkOut: searchParams.get("checkOut") || undefined,
      city: searchParams.get("city") || undefined,
      priceFrom: Number(searchParams.get("priceFrom")) || undefined,
      priceTo: Number(searchParams.get("priceTo")) || undefined,
      roomType: searchParams.get("roomType") || undefined,
      bedType: searchParams.get("bedType") || undefined,
      capacity: Number(searchParams.get("capacity")) || undefined,
      amenities: searchParams.get("amenities")
        ? (searchParams.get("amenities")?.split(",") as EAmenity[])
        : undefined,
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: BuildingFilter) => {
      const params = new URLSearchParams(); 

      const set = (key: string, value: any) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== 0
        ) {
          params.set(key, String(value));
        }
      };

      set("checkIn", newFilters.checkIn);
      set("checkOut", newFilters.checkOut);
      set("city", newFilters.location?.city); 
      set("priceFrom", newFilters.priceFrom);
      set("priceTo", newFilters.priceTo);
      set("roomType", newFilters.roomType);
      set("bedType", newFilters.bedType);
      set("capacity", newFilters.capacity);

      if (newFilters.amenities && newFilters.amenities.length > 0) {
        params.set("amenities", newFilters.amenities.join(","));
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router]
  );

  return { filters, setFilters };
}
