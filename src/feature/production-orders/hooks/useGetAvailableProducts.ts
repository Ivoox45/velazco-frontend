import { useQuery } from "@tanstack/react-query";
import { getAvailableProducts } from "../api/production-orders";

export default function useGetAvailableProducts() {
  return useQuery({
    queryKey: ["productsAvailable"],
    queryFn: getAvailableProducts,
  });
}
