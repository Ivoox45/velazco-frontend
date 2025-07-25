// --- Estado general de producción y por producto ---
export type ProductionStatus =
  | "PENDIENTE"
  | "EN_PROCESO"
  | "COMPLETO"
  | "INCOMPLETO";

// --- Para la lista de categorías y productos ---
export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  image?: string;
  category?: Category;
}

// --- Detalle de producto dentro de una orden ---
export interface ProductionDetail {
  product: { id: number; name: string };
  requestedQuantity: number;
  producedQuantity: number | null;
  status?: ProductionStatus;
  comments?: string;
  responsible?: { id: number; name: string };
}

// --- Orden de producción base ---
export interface ProductionCreateRequestDto {
  productionDate: string;
  assignedToId: number;
  status: ProductionStatus;
  details: {
    productId: number;
    requestedQuantity: number;
    comments?: string;
  }[];
}

export interface ProductionCreateResponseDto {
  id: number;
  productionDate: string;
  status: ProductionStatus;
  assignedBy: { id: number; name: string };
  assignedTo: { id: number; name: string };
  comments?: string;
  details: ProductionDetail[];
}

// --- Actualizar orden de producción ---
export interface ProductionUpdateRequestDto {
  status: ProductionStatus;
  comments?: string;
}

// --- Para iniciar la producción ---
export interface StartProductionRequestDto {
  products?: {
    productId: number;
    responsibleId?: number;
  }[];
}

export type StartProductionResponseDto = ProductionCreateResponseDto;

// --- Para finalizar la producción de una orden ---
export interface FinishProductionProductDto {
  productId: number;
  producedQuantity: number;
  status: "COMPLETO" | "INCOMPLETO";
  comments?: string;
}

export interface FinishProductionRequestDto {
  products: FinishProductionProductDto[];
}

export type FinishProductionResponseDto = ProductionCreateResponseDto;

// --- Historial para reportes ---
export interface HistoryProductDetail {
  productName: string;
  quantity: number;
}

export interface ProductionHistoryResponseDto {
  orderNumber: string;
  date: string;
  responsible: string;
  status: string;
  products: HistoryProductDetail[];
}

// --- Tablas/Dialogs auxiliares ---
export interface ProductOrder {
  producto: string;
  subtitulo?: string;
  cantidad: string;
}

export type StartProduct = {
  producto: string;
  cantidad: string; // ejemplo: "10 unidades"
  responsable: string;
};

export type ProductForFinish = {
  producto: string;
  cantidad: number;
};

export type ProductoForm = {
  estado: "COMPLETO" | "INCOMPLETO";
  cantidadProducida: number;
  motivo: string;
};

export interface FinalizeProductDto {
  productId: number;
  producedQuantity: number;
  motivoIncompleto?: string;
}

export interface FinalizeProductionRequestDto {
  productos: FinalizeProductDto[];
}
