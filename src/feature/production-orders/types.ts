// 1. ENUM o tipo para status
export type ProductionStatus =
  | "PENDIENTE"
  | "EN_PROCESO"
  | "COMPLETO"
  | "INCOMPLETO";

// 2. Product y Category
export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  image?: string;
  category?: Category;
};

// 3. Detail para creación y consulta
export interface ProductionDetailCreateRequestDto {
  productId: number;
  requestedQuantity: number;
  comments?: string;
}

export interface ProductionDetailUpdateRequestDto {
  productId: number;
  requestedQuantity: number;
  comments?: string;
}

export interface ProductionDetail {
  product: { id: number; name: string };
  requestedQuantity: number;
  producedQuantity: number;
  comments?: string;
}

// 4. Production DTOs
export interface ProductionCreateRequestDto {
  productionDate: string;
  assignedToId: number;
  status: ProductionStatus;
  comments?: string;
  details: ProductionDetailCreateRequestDto[];
}

export interface ProductionUpdateRequestDto {
  productionDate: string;
  assignedToId: number;
  status: ProductionStatus;
  details: ProductionDetailUpdateRequestDto[];
}

export interface ProductionCreateResponseDto {
  id: number;
  productionDate: string;
  status: ProductionStatus;
  assignedBy: { id: number; name: string };
  assignedTo: { id: number; name: string };
  details: ProductionDetail[];
}

export interface ProductionUpdateResponseDto {
  id: number;
  productionDate: string;
  status: ProductionStatus;
  assignedBy: { id: number; name: string };
  assignedTo: { id: number; name: string };
  details: ProductionDetail[];
}

// 5. Otros (para historial, listado, etc.)
export interface ProductDetail {
  productName: string;
  quantity: number;
}

export interface ProductionHistoryResponseDto {
  orderNumber: string;
  date: string;
  responsible: string;
  status: string;
  products: ProductDetail[];
}
export interface ProductDetail {
  productName: string;
  quantity: number;           // solicitada o producida (según la API)
  requestedQuantity?: number; // (opcional, si lo tienes)
  producedQuantity?: number;  // (opcional, si lo tienes)
  comments?: string;          // Motivo si está incompleto
}
export type UserListResponseDto = {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
};