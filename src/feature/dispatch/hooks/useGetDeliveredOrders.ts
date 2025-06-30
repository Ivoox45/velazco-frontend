import { useQuery } from "@tanstack/react-query";
import { getDeliveredOrders } from "../api/dispatch";  
import type { PaginatedDeliveredOrders } from "../types";

export default function useGetDeliveredOrders(
  page = 0,
  size = 10,
  enabled = true
) {
  return useQuery<PaginatedDeliveredOrders>({
    queryKey: ["delivered-orders", page, size],
    queryFn: () => getDeliveredOrders(page, size),
    enabled,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });
}
