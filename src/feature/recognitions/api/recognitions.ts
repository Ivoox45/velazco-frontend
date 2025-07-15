import axios from "@/lib/axios";
import type {
  VendedorRankingDto,
  CajeroRankingDto,
  EntregaRankingDto,
  ProduccionRankingDto,
  AreaRankingResponseDto
} from "../types";

/**
 * Obtiene el ranking de los vendedores del mes
 */
export async function getTopVendedores(): Promise<VendedorRankingDto[]> {
  const { data } = await axios.get<VendedorRankingDto[]>("/ranking/vendedores-mes");
  return data;
}

/**
 * Obtiene el ranking de los cajeros del mes
 */
export async function getCajerosDelMes(): Promise<CajeroRankingDto[]> {
  const { data } = await axios.get<CajeroRankingDto[]>("/ranking/cajeros-mes");
  return data;
}

/**
 * Obtiene el ranking de los entregadores del mes
 */
export async function getEntregadoresDelMes(): Promise<EntregaRankingDto[]> {
  const { data } = await axios.get<EntregaRankingDto[]>("/ranking/entregadores-mes");
  return data;
}

/**
 * Obtiene el ranking de producción del mes
 */
export async function getProduccionDelMes(): Promise<ProduccionRankingDto[]> {
  const { data } = await axios.get<ProduccionRankingDto[]>("/ranking/produccion-mes");
  return data;
}

/**
 * Obtiene todos los rankings agrupados por área
 */
export async function getAreaRanking(): Promise<AreaRankingResponseDto> {
  const { data } = await axios.get<AreaRankingResponseDto>("/ranking/areas");
  return data;
}
