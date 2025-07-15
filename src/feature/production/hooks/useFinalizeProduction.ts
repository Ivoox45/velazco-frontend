import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finalizeProduction } from "../api/production";
import type { FinalizeProductionRequestDto } from "../types";

export default function useFinalizeProduction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body: FinalizeProductionRequestDto;
    }) => finalizeProduction(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-productions"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["production-history"] });
      queryClient.invalidateQueries({ queryKey: ["produccion-del-mes"] }); 
      queryClient.invalidateQueries({ queryKey: ["productions"] });
    },
  });
}
