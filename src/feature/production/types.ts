// Estado general de producción y por producto
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
  producedQuantity: number; // cantidad realmente producida (0 o null si aún no termina)
  status: ProductionStatus; // estado por producto (puede ser útil para finalización)
  comments?: string; // comentario final de producción, si quedó incompleto
  responsible?: { id: number; name: string }; // responsable (opcional)
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
  details: ProductionDetail[];
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
  comments?: string; // obligatorio si incompleto
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

// --- Estados para la UI ---
export type EstadoProduccion = "PENDIENTE" | "PRODUCCION";

// --- Tablas/Dialogs ---
// Para la tabla principal
export interface ProductOrder {
  producto: string;
  subtitulo?: string; // opcional, para evitar errores de undefined
  cantidad: string;
}

// Para el dialog de inicio de producción
export type StartProduct = {
  producto: string;
  cantidad: string; // ejemplo: "10 unidades"
  responsable: string;
};

// Para el diálogo de finalizar producción
export type ProductForFinish = {
  producto: string;
  cantidad: number;
};

// Para el formulario de finish
export type ProductoForm = {
  estado: "COMPLETADO" | "INCOMPLETO";
  cantidadProducida: number;
  motivo: string;
};
