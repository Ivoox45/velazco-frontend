import { useQuery } from "@tanstack/react-query";
import { getCajerosDelMes } from "../api/recognitions";
import type { CajeroRankingDto } from "../types";

export function useCajerosDelMes() {
  return useQuery<CajeroRankingDto[]>({
    queryKey: ["cajeros-del-mes"],
    queryFn: getCajerosDelMes,
  });
}
