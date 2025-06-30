import axios from "@/lib/axios";
import type {
  ProductionCreateRequestDto,
  ProductionCreateResponseDto,
  ProductionUpdateRequestDto,
  ProductionUpdateResponseDto,
  ProductionHistoryResponseDto,
  Product,
} from "../types";

// 1. Obtener TODAS las órdenes de producción (GET /api/productions)
export async function getProductions(): Promise<ProductionCreateResponseDto[]> {
  const res = await axios.get("/productions");
  return res.data;
}

// 2. Crear una nueva orden de producción (POST /api/productions)
export async function createProduction(
  data: ProductionCreateRequestDto
): Promise<ProductionCreateResponseDto> {
  const res = await axios.post("/productions", data);
  return res.data;
}

// 3. Actualizar una orden de producción (PUT /api/productions/{id})
export async function updateProduction(
  id: number,
  data: ProductionUpdateRequestDto
): Promise<ProductionUpdateResponseDto> {
  const res = await axios.put(`/productions/${id}`, data);
  return res.data;
}

// 4. Eliminar una orden de producción (DELETE /api/productions/{id})
export async function deleteProduction(id: number): Promise<void> {
  await axios.delete(`/productions/${id}`);
}

// 6. Obtener historial de órdenes (GET /api/productions/historial)
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
