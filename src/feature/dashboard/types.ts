export interface ProductSold {
  productName: string;
  quantitySold: number;
  unitPrice: number; // En Java es BigDecimal, pero llega como number
  subtotal: number; // Igual que arriba
}

export interface DailySaleResponseDto {
  date: string; // En Java es LocalDate, pero en JSON es string (formato YYYY-MM-DD)
  totalSales: number; // BigDecimal, pero llega como number
  products: ProductSold[];
}
