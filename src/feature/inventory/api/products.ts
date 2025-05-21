// src/features/products/api/products.ts
import axios from "@/lib/axios";
import type { CreateProduct, Product } from "../types";

export async function getProducts(): Promise<Product[]> {
    const response = await axios.get("/products");
    return response.data;
}

export async function createProduct(values: CreateProduct): Promise<Product> {
    const response = await axios.post("/products", values);
    return response.data;
}
