/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import {
  BuildingFilter,
  EAmenity,
} from "@/types/room.type";

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
      priceFrom: searchParams.get("priceFrom")
        ? Number(searchParams.get("priceFrom"))
        : undefined,
      priceTo: searchParams.get("priceTo")
        ? Number(searchParams.get("priceTo"))
        : undefined,
      roomType: searchParams.get("roomType") || undefined,
      bedType: searchParams.get("bedType") || undefined,
      capacity: searchParams.get("capacity")
        ? Number(searchParams.get("capacity"))
        : undefined,
      amenities: searchParams.get("amenities")
        ? (searchParams.get("amenities")?.split(",") as EAmenity[])
        : undefined,
    };
  }, [searchParams]);
  const setFilters = useCallback(
    (newFilters: BuildingFilter) => {
      const params = new URLSearchParams(searchParams.toString());
      const updateParam = (key: string, value: any) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== 0
        ) {
          params.set(key, String(value));
        } else {
          params.delete(key); 
        }
      };

      updateParam("checkIn", newFilters.checkIn);
      updateParam("checkOut", newFilters.checkOut);
      updateParam("city", newFilters.city);
      updateParam("priceFrom", newFilters.priceFrom);
      updateParam("priceTo", newFilters.priceTo);
      updateParam("roomType", newFilters.roomType);
      updateParam("bedType", newFilters.bedType);
      updateParam("capacity", newFilters.capacity);

      if (newFilters.amenities && newFilters.amenities.length > 0) {
        params.set("amenities", newFilters.amenities.join(","));
      } else {
        params.delete("amenities");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams] 
  );

  return { filters, setFilters };
}
