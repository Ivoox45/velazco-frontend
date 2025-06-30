import axios from "@/lib/axios";
import type { ProductionCreateResponseDto } from "../types";

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
