import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startOrder } from "../api/order";
import type { OrderStartRequest, OrderStartResponse } from "../types";

export default function useStartOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderStartResponse, Error, OrderStartRequest>({
    mutationFn: startOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsAvailable"] });
      queryClient.invalidateQueries({ queryKey: ["top-vendedores"] });
    },
  });
}
