import { useQuery } from "@tanstack/react-query";
import { getEntregadoresDelMes } from "../api/recognitions";
import type { EntregaRankingDto } from "../types";

export function useEntregadoresDelMes() {
  return useQuery<EntregaRankingDto[]>({
    queryKey: ["entregadores-del-mes"],
    queryFn: getEntregadoresDelMes,
  });
}
