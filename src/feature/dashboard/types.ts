// src/dashboard/types.ts

// ============ VENTAS ===========

// Producto vendido (para ventas diarias y semanales)
export interface ProductSold {
  productName: string;
  quantitySold: number;
  unitPrice: number; // BigDecimal en Java, number en TS
  subtotal: number;
}

// Respuesta de ventas diarias
export interface DailySaleResponseDto {
  date: string; // LocalDate en Java ("YYYY-MM-DD")
  totalSales: number; // BigDecimal en Java
  products: ProductSold[];
}

// Respuesta de ventas semanales
export interface WeeklySaleResponseDto {
  startDate: string; // LocalDate en Java
  endDate: string;
  totalSales: number;
  salesCount: number;
  orders: DeliveredOrder[];
}

export interface DeliveredOrder {
  orderId: number;
  deliveryDate: string; // LocalDate en Java
  dayOfWeek: string;
  orderTotal: number;
  products: ProductSold[];
}

// ============ TOP PRODUCTOS ===========

export interface TopProductDto {
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

// ============ MÉTODOS DE PAGO ===========

export interface PaymentMethodSummaryDto {
  paymentMethod: string;
  totalSales: number;
  percentage: number;
}

// ============ STOCK BAJO ===========

export interface ProductLowStockResponseDto {
  count: number;
  products: ProductLowStockData[];
}

export interface ProductLowStockData {
  id: number;
  name: string;
  stock: number;
}

// ============ TODOS LOS PRODUCTOS ===========
// Si tienes una respuesta para todos los productos, puedes agregar:
export interface ProductListResponseDto {
  id: number;
  name: string;
  stock: number;
  // Agrega más campos si tu backend los retorna
}
