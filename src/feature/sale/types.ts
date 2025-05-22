export type ProductOrder = {
  id: number;
  name: string;
};

export type DetailOrder = {
  quantity: number;
  unitPrice: string; 
  product: ProductOrder;
};

export type OrderListResponse = {
  id: number;
  date: string;
  clientName: string;
  status: "PENDIENTE" | "PAGADO" | "CANCELADO";
  attendedBy: {
    id: number;
    name: string;
  };
  details: DetailOrder[];
  cancelReason?: string; 
};
