import { Card } from "@/components/ui/card";
import { DollarSign, ShoppingCart, AlertTriangle, Package } from "lucide-react";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
      {/* Card 1 */}
      <Card className="flex flex-row p-4 sm:p-6 space-x-4 sm:space-x-6 items-center min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">Ventas del Día</p>
          <p className="text-2xl sm:text-3xl font-bold leading-tight truncate">$4,231.89</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
            +20.1% del día anterior
          </p>
        </div>
      </Card>

      {/* Card 2 */}
      <Card className="flex flex-row p-4 sm:p-6 space-x-4 sm:space-x-6 items-center min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">Pedidos del Día</p>
          <p className="text-2xl sm:text-3xl font-bold leading-tight truncate">42</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
            +12% del día anterior
          </p>
        </div>
      </Card>

      {/* Card 3 */}
      <Card className="flex flex-row p-4 sm:p-6 space-x-4 sm:space-x-6 items-center min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">Productos Bajos</p>
          <p className="text-2xl sm:text-3xl font-bold leading-tight truncate">7</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
            Requieren reposición
          </p>
        </div>
      </Card>

      {/* Card 4 */}
      <Card className="flex flex-row p-4 sm:p-6 space-x-4 sm:space-x-6 items-center min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">Productos en Stock</p>
          <p className="text-2xl sm:text-3xl font-bold leading-tight truncate">125</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">
            Stock actualizado
          </p>
        </div>
      </Card>
    </div>
  );
}
