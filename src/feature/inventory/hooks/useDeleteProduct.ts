import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/products";

export default function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["productsAvailable"] });
        },
    });
}
