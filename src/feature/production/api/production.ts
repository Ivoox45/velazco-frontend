import axios from "@/lib/axios";
import type { ProductionCreateResponseDto } from "../types";
import type { FinalizeProductionRequestDto } from "../types";

export async function getProductionDetail(
  id: number
): Promise<ProductionCreateResponseDto> {
  const res = await axios.get(`/productions/${id}`);
  return res.data;
}

export async function getDailyProductions(): Promise<
  ProductionCreateResponseDto[]
> {
  const res = await axios.get("/productions/daily");
  return res.data;
}

export async function updateProductionStatus(id: number, nuevoEstado: string) {
  const res = await axios.patch(`/productions/${id}/status`, { nuevoEstado });
  return res.data;
}

export async function finalizeProduction(
  id: number,
  body: FinalizeProductionRequestDto
) {
  const res = await axios.patch(`/productions/${id}/finalizar`, body);
  return res.data;
}
