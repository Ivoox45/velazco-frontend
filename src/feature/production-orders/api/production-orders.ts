import axios from "@/lib/axios";
import type {
  ProductionCreateRequestDto,
  ProductionCreateResponseDto,
  ProductionUpdateRequestDto,
  ProductionUpdateResponseDto,
  ProductionHistoryResponseDto,
  Product,
} from "../types";

export async function getProductions(): Promise<ProductionCreateResponseDto[]> {
  const res = await axios.get("/productions/pending");
  return res.data;
}

export async function createProduction(
  data: ProductionCreateRequestDto
): Promise<ProductionCreateResponseDto> {
  const res = await axios.post("/productions", data);
  return res.data;
}

export async function updateProduction(
  id: number,
  data: ProductionUpdateRequestDto
): Promise<ProductionUpdateResponseDto> {
  const res = await axios.put(`/productions/${id}`, data);
  return res.data;
}

export async function deleteProduction(id: number): Promise<void> {
  await axios.delete(`/productions/${id}`);
}

export async function getProductionHistory(): Promise<
  ProductionHistoryResponseDto[]
> {
  const res = await axios.get("/productions/historial");
  return res.data;
}

export async function getAvailableProducts(): Promise<Product[]> {
  const response = await axios.get("/products/available");
  return response.data;
}

export async function getProductionById(
  id: number
): Promise<ProductionCreateResponseDto> {
  const res = await axios.get(`/productions/${id}`);
  return res.data;
}
