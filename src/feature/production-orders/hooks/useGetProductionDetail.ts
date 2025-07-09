import { useQuery } from "@tanstack/react-query";
import { getProductionById } from "../api/production-orders";
import type { ProductionCreateResponseDto } from "../types";

export default function useGetProductionDetail(id: number | null) {
  return useQuery<ProductionCreateResponseDto>({
    queryKey: ["production-detail", id],
    queryFn: () => getProductionById(id as number),
    enabled: !!id,
  });
}
