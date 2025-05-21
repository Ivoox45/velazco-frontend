import axios from "@/lib/axios";
import type { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
    const response = await axios.get("/products");
    return response.data;
}