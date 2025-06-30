import { useQuery } from "@tanstack/react-query";
import { getProductions } from "../api/production-orders";
import type { ProductionCreateResponseDto } from "../types";

export default function useGetProductions() {
  return useQuery<ProductionCreateResponseDto[]>({
    queryKey: ["productions"],
    queryFn: getProductions,
  });
}
