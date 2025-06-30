import { useQuery } from "@tanstack/react-query";
import { getProductionHistory } from "../api/production-orders";
import type { ProductionHistoryResponseDto } from "../types";

export default function useGetProductionHistory() {
  return useQuery<ProductionHistoryResponseDto[]>({
    queryKey: ["production-history"],
    queryFn: getProductionHistory,
  });
}
