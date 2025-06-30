import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductionStatus } from "../api/production";

export default function useUpdateProductionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, nuevoEstado }: { id: number; nuevoEstado: string }) =>
      updateProductionStatus(id, nuevoEstado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-productions"] });
    },
  });
}
