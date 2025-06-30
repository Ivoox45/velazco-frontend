import axios from "@/lib/axios";
import type {
  StartProductionRequestDto,
  StartProductionResponseDto,
  FinishProductionRequestDto,
  FinishProductionResponseDto,
  ProductionCreateResponseDto,
} from "../types";

// Detalle de una orden
export async function getProductionDetail(
  id: number
): Promise<ProductionCreateResponseDto> {
  const res = await axios.get(`/productions/${id}`);
  return res.data;
}

// Traer órdenes del día (si tu endpoint es así)
export async function getDailyProductions(): Promise<
  ProductionCreateResponseDto[]
> {
  const res = await axios.get("/productions/daily");
  return res.data;
}

// Iniciar producción de una orden (esto depende de tu backend)
export async function startProduction(
  id: number,
  data: StartProductionRequestDto
): Promise<StartProductionResponseDto> {
  const res = await axios.post(`/productions/${id}/start`, data);
  return res.data;
}

// Finalizar producción de una orden
export async function finishProduction(
  id: number,
  data: FinishProductionRequestDto
): Promise<FinishProductionResponseDto> {
  const res = await axios.post(`/productions/${id}/finish`, data);
  return res.data;
}
