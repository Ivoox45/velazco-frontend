import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import DispatchConfirmDialog from "../dialogs/DispatchConfirmDialog";
import type { DeliveredOrder } from "../../types";

interface DispatchCardProps {
  order: DeliveredOrder;
  confirmBtnClass?: string;
}

export default function DispatchCard({ order, confirmBtnClass }: DispatchCardProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const subtotal = order.details.reduce(
    (total, item) => total + item.quantity * parseFloat(item.unitPrice),
    0
  );

  const badgeColor =
    order.status === "ENTREGADO"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";

  return (
    <>
      <Card className="w-full border p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
        {/* Información principal del pedido */}
        <div className="flex-1">
          <div className="font-bold text-lg">PED-{order.id}</div>
          <div className="text-sm text-muted-foreground">
            {order.clientName}
          </div>
          <Badge className={`mt-1 ${badgeColor}`}>{order.status}</Badge>
        </div>

        {/* Información adicional y botón para detalles */}
        <div className="flex flex-col items-end">
          <div className="font-semibold text-lg">S/.{subtotal.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">
            {order.deliveryDate
              ? format(new Date(order.deliveryDate), "dd/MM/yyyy - HH:mm", {
                  locale: es,
                })
              : format(new Date(order.date), "dd/MM/yyyy - HH:mm", {
                  locale: es,
                })}
          </div>
          <Button
            className={`mt-2 ${confirmBtnClass ?? ""}`}
            onClick={() => setOpenDialog(true)}
          >
            Ver Detalles
          </Button>
        </div>
      </Card>

      <DispatchConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        order={order}
      />
    </>
  );
}
