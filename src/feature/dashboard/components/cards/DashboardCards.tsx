import { Card } from "@/components/ui/card";
import { DollarSign, ShoppingCart, AlertTriangle, Package } from "lucide-react";
import { useDailySales } from "../../hooks/useDailySales";
import { useLowStockProducts } from "../../hooks/useLowStockProducts";
import { useAllProducts } from "../../hooks/useAllProducts";

// Devuelve la fecha de hoy en formato "YYYY-MM-DD"
function getTodayString() {
  const now = new Date();
  return (
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0")
  );
}

export default function DashboardCards() {
  const { data: dailySales, isLoading: loadingSales } = useDailySales();
  const { data: lowStock, isLoading: loadingLowStock } = useLowStockProducts();
  const { data: allProducts, isLoading: loadingProducts } = useAllProducts();

  // 1. Ventas del día y pedidos del día
  let ventasDia = 0;
  let pedidosDia = 0;
  if (dailySales) {
    const today = getTodayString();
    const todaySale = dailySales.find((d) => d.date === today);
    ventasDia = todaySale?.totalSales ?? 0;
    pedidosDia = todaySale?.products.reduce((a, b) => a + b.quantitySold, 0) ?? 0;
  }

  // 2. Productos bajos en stock
  const productosBajos = lowStock?.count ?? 0;

  // 3. Productos en stock
  const productosEnStock = allProducts
    ? allProducts.filter((p) => p.stock && p.stock > 0).length
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
      {/* Card 1 - Ventas del Día */}
      <Card className="flex flex-row p-4 sm:p-6 space-x-4 sm:space-x-6 items-center min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            Ventas del Día
          </p>
          <p className="text-2xl sm:text-3xl font-bold leading-tight truncate">
            {loadingSales ? "Cargando..." : `S/.${ventasDia.toFixed(2)}`}
          </p>
        </div>
      </Card>

      {/* Card 2 - Pedidos del Día */}
      <Card className="flex flex-row p-4 sm:p-6 space-x-4 sm:space-x-6 items-center min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            Productos vendidos en el día
          </p>
          <p className="text-2xl sm:text-3xl font-bold leading-tight truncate">
            {loadingSales ? "Cargando..." : pedidosDia}
          </p>
          {/* Puedes poner comparación con día anterior si tienes los datos */}
        </div>
      </Card>

      {/* Card 3 - Productos Bajos */}
      <Card className="flex flex-row p-4 sm:p-6 space-x-4 sm:space-x-6 items-center min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            Productos Bajos
          </p>
          <p className="text-2xl sm:text-3xl font-bold leading-tight truncate">
            {loadingLowStock ? "Cargando..." : productosBajos}
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
            Requieren reposición
          </p>
        </div>
      </Card>

      {/* Card 4 - Productos en Stock */}
      <Card className="flex flex-row p-4 sm:p-6 space-x-4 sm:space-x-6 items-center min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            Productos en Stock
          </p>
          <p className="text-2xl sm:text-3xl font-bold leading-tight truncate">
            {loadingProducts ? "Cargando..." : productosEnStock}
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
            Stock actualizado
          </p>
        </div>
      </Card>
    </div>
  );
}
