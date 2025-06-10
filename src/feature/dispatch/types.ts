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
