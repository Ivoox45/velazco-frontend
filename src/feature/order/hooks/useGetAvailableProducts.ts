import { useQuery } from "@tanstack/react-query";
import { getAvailableProducts } from "../api/order";

export default function useGetAvailableProducts() {
    return useQuery({
        queryKey: ["productsAvailable"],
        queryFn: getAvailableProducts,
    });
}
