import { useMutation } from "@tanstack/react-query";
import axios from "../../../lib/axios";
import type { CreateProduct, Product } from "../types";

export default function useCreateProduct() {
    return useMutation<Product, Error, CreateProduct>({
        mutationFn: async (values) => {
            const response = await axios.post("/products", values);
            return response.data;
        },
    });
}
