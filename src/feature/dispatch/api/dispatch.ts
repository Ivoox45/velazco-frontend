import axios from "@/lib/axios";
import type { PaginatedDispatchOrders } from "../types";
import type { PaginatedDeliveredOrders } from "../types";

export async function getDispatchedOrders(
  status: "PAGADO" | "ENTREGADO",
  page = 0,
  size = 10
): Promise<PaginatedDispatchOrders> {
  const res = await axios.get(`/orders/status/${status}`, {
    params: { page, size },
  });
  return res.data;
}

export async function confirmDispatch(id: number): Promise<void> {
  await axios.post(`/orders/${id}/confirm-dispatch`);
}

export async function getDeliveredOrders(
  page = 0,
  size = 10
): Promise<PaginatedDeliveredOrders> {
  const res = await axios.get(`/orders/delivered`, {
    params: { page, size },
  });
  return res.data;
}
