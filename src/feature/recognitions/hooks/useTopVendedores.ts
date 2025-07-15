import { useQuery } from "@tanstack/react-query";
import { getTopVendedores } from "../api/recognitions";
import type { VendedorRankingDto } from "../types";

export function useTopVendedores() {
  return useQuery<VendedorRankingDto[]>({
    queryKey: ["top-vendedores"],
    queryFn: getTopVendedores,
  });
}
