// src/dashboard/hooks/useAllProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/dashboard";
import type { ProductListResponseDto } from "../types";

export function useAllProducts() {
  return useQuery<ProductListResponseDto[]>({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
  });
}
