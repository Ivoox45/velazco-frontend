// src/sale/api/orders.ts
import axios from "@/lib/axios";
import type {
  OrderListResponseDto,
  OrderConfirmSaleRequestDto,
  OrderConfirmSaleResponseDto,
} from "../types";

export async function getOrdersByStatus(
  status: string,
  page = 0,
  size = 10
): Promise<{
  content: OrderListResponseDto[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}> {
  const res = await axios.get(`/orders/status/${status}`, {
    params: { page, size },
  });
  return res.data;
}

export async function confirmSale(
  id: number,
  payload: OrderConfirmSaleRequestDto
): Promise<OrderConfirmSaleResponseDto> {
  const res = await axios.post(`/orders/${id}/confirm-sale`, payload);
  return res.data;
}

export async function cancelOrder(orderId: number): Promise<void> {
  await axios.put(`/orders/${orderId}/cancel`);
}
