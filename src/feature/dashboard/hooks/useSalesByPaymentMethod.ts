// src/dashboard/hooks/useSalesByPaymentMethod.ts
import { useQuery } from "@tanstack/react-query";
import { getSalesByPaymentMethod } from "../api/dashboard";
import type { PaymentMethodSummaryDto } from "../types";

export function useSalesByPaymentMethod() {
  return useQuery<PaymentMethodSummaryDto[]>({
    queryKey: ["sales-by-payment-method"],
    queryFn: getSalesByPaymentMethod,
  });
}
