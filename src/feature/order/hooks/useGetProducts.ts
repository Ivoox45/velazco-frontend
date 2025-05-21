import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/order";

export default function useGetProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });
}
