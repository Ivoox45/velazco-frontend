// src/dashboard/hooks/useDailySales.ts
import { useQuery } from "@tanstack/react-query";
import { getDailySalesDetailed } from "../api/dashboard";
import type { DailySaleResponseDto } from "../types";

export function useDailySales() {
  return useQuery<DailySaleResponseDto[]>({
    queryKey: ["daily-sales"],
    queryFn: getDailySalesDetailed,
  });
}
