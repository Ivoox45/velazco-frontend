import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduction } from "../api/production-orders";
import type {
  ProductionUpdateRequestDto,
  ProductionUpdateResponseDto,
} from "../types";

export default function useUpdateProduction() {
  const queryClient = useQueryClient();

  return useMutation<
    ProductionUpdateResponseDto,
    unknown,
    { id: number; data: ProductionUpdateRequestDto }
  >({
    mutationFn: ({ id, data }) => updateProduction(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["production-detail", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["daily-productions"] });
    },
  });
}
