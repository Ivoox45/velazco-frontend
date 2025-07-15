// src/dashboard/hooks/useLowStockProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getLowStockProducts } from "../api/dashboard";
import type { ProductLowStockResponseDto } from "../types";

export function useLowStockProducts() {
  return useQuery<ProductLowStockResponseDto>({
    queryKey: ["low-stock-products"],
    queryFn: getLowStockProducts,
  });
}
