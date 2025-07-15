import { useQuery } from "@tanstack/react-query";
import { getAreaRanking } from "../api/recognitions";
import type { AreaRankingResponseDto } from "../types";

export function useAreaRanking() {
  return useQuery<AreaRankingResponseDto>({
    queryKey: ["area-ranking"],
    queryFn: getAreaRanking,
  });
}
