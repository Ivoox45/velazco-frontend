import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmSale } from "../api/orders";
import type {
    OrderConfirmSaleRequestDto,
    OrderConfirmSaleResponseDto,
} from "../types";

export default function useConfirmSale() {
    const queryClient = useQueryClient();

    return useMutation<
        OrderConfirmSaleResponseDto,
        Error,
        { id: number; payload: OrderConfirmSaleRequestDto }
    >({
        mutationFn: ({ id, payload }) => confirmSale(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "orders",
            });
             queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "dispatch-orders",
            });
            queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "products", 
            });
             queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "productsAvailable", 
            });
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "cajeros-del-mes",
            });
        },
    });
}
