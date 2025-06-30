export interface DispatchOrder {
  id: number;
  date: string;
  clientName: string;
  status: "PAGADO" | "ENTREGADO";
  attendedBy: {
    id: number;
    name: string;
  };
  details: {
    quantity: number;
    unitPrice: number;
    product: {
      id: number;
      name: string;
    };
  }[];
  dispatch?: {
    id: number;
    deliveryDate: string;
    dispatchedBy: {
      id: number;
      name: string;
    };
  };
}

export interface PaginatedDispatchOrders {
  content: DispatchOrder[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
export type DeliveredOrder = {
  id: number;
  date: string; // LocalDateTime se recibe como string ISO
  clientName: string;
  status: string;

  attendedBy: {
    id: number;
    name: string;
  };

  deliveredBy: {
    id: number;
    name: string;
  };

  deliveryDate: string | null;

  details: {
    quantity: number;
    unitPrice: string; // BigDecimal usualmente viene como string para evitar precisión float
    product: {
      id: number;
      name: string;
    };
  }[];
};
export type PaginatedDeliveredOrders = {
  content: DeliveredOrder[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // página actual
};