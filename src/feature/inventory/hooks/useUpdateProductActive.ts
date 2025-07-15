import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductActive } from "../api/products";
import type { UpdateProductActive } from "../types";

export default function useUpdateProductActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, active }: { id: number; active: UpdateProductActive }) =>
      updateProductActive(id, active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsAvailable"] });
      queryClient.invalidateQueries({ queryKey: ["low-stock-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
}
