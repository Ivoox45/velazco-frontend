import { useQuery } from "@tanstack/react-query";
import { getProductionDetail } from "../api/production";

export default function useProductionDetail(id: number) {
  return useQuery({
    queryKey: ["production-detail", id],
    queryFn: () => getProductionDetail(id),
    enabled: !!id, // solo si hay id
  });
}
