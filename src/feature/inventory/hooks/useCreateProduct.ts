import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/products";

export default function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsAvailable"] });
      queryClient.invalidateQueries({ queryKey: ["low-stock-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-products"] });

    },
  });
}
