import { useQuery } from "@tanstack/react-query";
import { getOrdersByStatus } from "../api/orders";
import type { OrderListResponseDto } from "../types";

interface OrdersByStatusResponse {
    content: OrderListResponseDto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export default function useGetOrdersByStatus(
    status: string,
    page = 0,
    size = 10
) {
    return useQuery<OrdersByStatusResponse, Error>({
        queryKey: ["orders", status, page, size],
        queryFn: () => getOrdersByStatus(status, page, size),
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });
}
