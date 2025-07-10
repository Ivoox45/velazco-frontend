// src/dashboard/api/dashboard.ts
import axios from "@/lib/axios";
import type { DailySaleResponseDto } from "../types";

// Obtener ventas diarias detalladas
export async function getDailySalesDetailed(): Promise<DailySaleResponseDto[]> {
  const res = await axios.get("/orders/daily-sales/details");
  return res.data;
}
