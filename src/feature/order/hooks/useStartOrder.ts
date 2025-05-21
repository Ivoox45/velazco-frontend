import { useMutation } from "@tanstack/react-query";
import { startOrder } from "../api/order";
import type { OrderStartRequest, OrderStartResponse } from "../types";

export default function useStartOrder() {
  return useMutation<OrderStartResponse, Error, OrderStartRequest>({
    mutationFn: startOrder,
  });
}
