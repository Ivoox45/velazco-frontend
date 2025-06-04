import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../api/orders";

export default function useCancelOrder() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: cancelOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "orders",
            });
        },
    });
}
