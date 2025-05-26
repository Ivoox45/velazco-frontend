import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/products";
import type { UpdateProduct } from "../types";

export default function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }: UpdateProduct & { id: number }) =>
            updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["productsAvailable"] });
        },
    });
}
