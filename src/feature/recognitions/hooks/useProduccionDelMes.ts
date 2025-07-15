import { useQuery } from "@tanstack/react-query";
import { getProduccionDelMes } from "../api/recognitions";
import type { ProduccionRankingDto } from "../types";

export function useProduccionDelMes() {
  return useQuery<ProduccionRankingDto[]>({
    queryKey: ["produccion-del-mes"],
    queryFn: getProduccionDelMes,
  });
}
