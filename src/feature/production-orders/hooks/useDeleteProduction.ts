import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduction } from "../api/production-orders";

export default function useDeleteProduction() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: deleteProduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productions"] });
      queryClient.invalidateQueries({ queryKey: ["daily-productions"] });
    },
  });
}
