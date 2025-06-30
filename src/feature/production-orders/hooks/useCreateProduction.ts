import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduction } from "../api/production-orders";
import type {
  ProductionCreateRequestDto,
  ProductionCreateResponseDto,
} from "../types";

export default function useCreateProduction() {
  const queryClient = useQueryClient();
  return useMutation<
    ProductionCreateResponseDto,
    unknown,
    ProductionCreateRequestDto
  >({
    mutationFn: createProduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productions"] });
      queryClient.invalidateQueries({ queryKey: ["daily-productions"] });
    },
  });
}
