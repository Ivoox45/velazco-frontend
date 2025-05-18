import { useMutation } from "@tanstack/react-query";
import type { CreateProduct } from "../type";

export default function useCreateProduct() {
    return useMutation({
        mutationFn: async (values: CreateProduct) => {
            const response = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                body: JSON.stringify(values)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }
    })
}