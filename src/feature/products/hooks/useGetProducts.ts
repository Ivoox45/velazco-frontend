import { useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";
import type { Product } from "../types";

export default function useGetProducts() {
    return useQuery<Product[], Error>({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("/products");
            return response.data;
        },
    });
}
