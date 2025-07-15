// src/dashboard/hooks/useWeeklySales.ts
import { useQuery } from "@tanstack/react-query";
import { getWeeklySalesDetailed } from "../api/dashboard";
import type { WeeklySaleResponseDto } from "../types";

export function useWeeklySales() {
  return useQuery<WeeklySaleResponseDto[]>({
    queryKey: ["weekly-sales"],
    queryFn: getWeeklySalesDetailed,
  });
}
