import { useQuery } from "@tanstack/react-query";
import { getDispatchedOrders } from "../api/dispatch";
import type { PaginatedDispatchOrders } from "../types";

export default function useGetDispatchedOrders(
  status: "PAGADO" | "ENTREGADO",
  page = 0,
  size = 10,
  enabled = true
) {
  return useQuery<PaginatedDispatchOrders>({
    queryKey: ["dispatch-orders", status, page],
    queryFn: () => getDispatchedOrders(status, page, size),
    enabled,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });
}
