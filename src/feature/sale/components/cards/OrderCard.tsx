import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { OrderListResponseDto } from "../../types";

interface OrderCardProps {
  order: OrderListResponseDto;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function OrderCard({
  order,
  onConfirm,
  onCancel,
}: OrderCardProps) {
  const subtotal = order.details.reduce(
    (sum, detail) => sum + detail.quantity * detail.unitPrice,
    0
  );

  const statusColor =
    {
      PENDIENTE: "bg-yellow-100 text-yellow-800",
      PAGADO: "bg-green-100 text-green-800",
      CANCELADO: "bg-red-100 text-red-800",
    }[order.status] || "bg-gray-100 text-gray-800";

  return (
    <Card className="w-full border p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
      {/* Sección izquierda */}
      <div className="flex-1">
        <div className="font-bold text-lg">PED-{order.id}</div>
        <div className="text-sm text-muted-foreground">{order.clientName}</div>
        <Badge className={`${statusColor} mt-1`}>{order.status}</Badge>
      </div>

      {/* Sección derecha */}
      <div className="flex flex-col items-end">
        <div className="font-semibold text-lg">${subtotal.toFixed(2)}</div>
        <div className="text-xs text-muted-foreground">
          {format(new Date(order.date), "dd/MM/yyyy - HH:mm", {
            locale: es,
          })}
        </div>
        {order.status === "PENDIENTE" && (
          <div className="flex gap-2 mt-2">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button onClick={onConfirm}>Confirmar Pago</Button>
          </div>
        )}
        {order.status === "PAGADO" && (
          <Button className="mt-2" onClick={onConfirm}>
            Ver Detalles
          </Button>
        )}
        {order.status === "CANCELADO" && (
          <Button className="mt-2" onClick={onConfirm}>
            Ver Detalles
          </Button>
        )}
      </div>
    </Card>
  );
}
