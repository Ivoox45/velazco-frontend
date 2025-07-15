// src/dashboard/api/dashboard.ts
import axios from "@/lib/axios";
import type {
  DailySaleResponseDto,
  WeeklySaleResponseDto,
  PaymentMethodSummaryDto,
  TopProductDto,
  ProductLowStockResponseDto,
  ProductListResponseDto,
} from "../types";

// 1. Obtener ventas diarias detalladas
export async function getDailySalesDetailed(): Promise<DailySaleResponseDto[]> {
  const res = await axios.get("/orders/daily-sales/details");
  return res.data;
}

// 2. Obtener ventas semanales detalladas (para gráfico)
export async function getWeeklySalesDetailed(): Promise<WeeklySaleResponseDto[]> {
  const res = await axios.get("/orders/weekly-sales/details");
  return res.data;
}

// 3. Obtener resumen por método de pago (para gráfico)
export async function getSalesByPaymentMethod(): Promise<PaymentMethodSummaryDto[]> {
  const res = await axios.get("/orders/payment-methods/summary");
  return res.data;
}

// 4. Obtener productos bajos en stock
export async function getLowStockProducts(): Promise<ProductLowStockResponseDto> {
  const res = await axios.get("/products/low-stock");
  return res.data;
}

// 5. Obtener todos los productos (puedes filtrar los que están en stock en el frontend)
export async function getAllProducts(): Promise<ProductListResponseDto[]> {
  const res = await axios.get("/products");
  return res.data;
}

// 6. Obtener productos más vendidos del mes (por si tu dashboard lo necesita)
export async function getTopProductsOfMonth(): Promise<TopProductDto[]> {
  const res = await axios.get("/orders/top-products/month");
  return res.data;
}

// 7. Opcional: obtener productos disponibles (si lo necesitas)
export async function getAvailableProducts(): Promise<ProductListResponseDto[]> {
  const res = await axios.get("/products/available");
  return res.data;
}
