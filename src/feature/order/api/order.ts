import axios from "@/lib/axios";
import type {
  Product,
  Category,
  OrderStartRequest,
  OrderStartResponse,
} from "../types";

export async function getAvailableProducts(): Promise<Product[]> {
  const response = await axios.get("/products/available");
  return response.data;
}

export async function getCategories(): Promise<Category[]> {
  const response = await axios.get("/categories");
  return response.data;
}

export async function startOrder(
  data: OrderStartRequest
): Promise<OrderStartResponse> {
  const response = await axios.post("/orders/start", data);
  return response.data;
}
