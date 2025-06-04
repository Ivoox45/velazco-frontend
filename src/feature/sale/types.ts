// src/sale/api/types.ts

export interface OrderStartRequestDto {
    clientName: string;
    details: DetailOrderStartRequestDto[];
}

export interface DetailOrderStartRequestDto {
    productId: number;
    quantity: number;
}

export interface OrderStartResponseDto {
    readonly id: number;
    readonly date: string;
    readonly clientName: string;
    readonly status: string;
    readonly attendedBy: AttendedByOrderStartResponseDto;
    readonly details: DetailOrderStartResponseDto[];
}

export interface AttendedByOrderStartResponseDto {
    readonly id: number;
    readonly name: string;
}

export interface DetailOrderStartResponseDto {
    readonly quantity: number;
    readonly unitPrice: number;
    readonly product: ProductOrderStartResponseDto;
}

export interface ProductOrderStartResponseDto {
    readonly id: number;
    readonly name: string;
}

export interface OrderStatusUpdateRequestDto {
    status: "PENDIENTE" | "PAGADO" | "CANCELADO" | "ENTREGADO";
}

export interface OrderConfirmSaleRequestDto {
    paymentMethod: string;
}

export interface OrderConfirmSaleResponseDto {
    readonly id: number;
    readonly date: string;
    readonly clientName: string;
    readonly status: string;
    readonly sale: SaleOrderConfirmSaleResponseDto;
}

export interface SaleOrderConfirmSaleResponseDto {
    readonly id: number;
    readonly saleDate: string;
    readonly paymentMethod: string;
    readonly totalAmount: number;
    readonly cashier: CashierSaleOrderConfirmSaleResponseDto;
}

export interface CashierSaleOrderConfirmSaleResponseDto {
    readonly id: number;
    readonly name: string;
}

export interface OrderListResponseDto {
    readonly id: number;
    readonly date: string;
    readonly clientName: string;
    readonly status: string;
    readonly attendedBy: AttendedByListResponseDto;
    readonly details: DetailsOrderResponseDto[];
}

export interface AttendedByListResponseDto {
    readonly id: number;
    readonly name: string;
}

export interface DetailsOrderResponseDto {
    readonly quantity: number;
    readonly unitPrice: number;
    readonly product: ProductOrderStartResponseDto;
}
