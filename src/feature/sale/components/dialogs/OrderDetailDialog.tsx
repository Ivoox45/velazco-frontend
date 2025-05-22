import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import type { OrderListResponse } from "@/feature/sale/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirmPayment: () => void;
  order: OrderListResponse;
};

export default function OrderDetailDialog({
  open,
  onClose,
  onConfirmPayment,
  order,
}: Props) {
  const formattedDate = format(new Date(order.date), "dd/MM/yyyy - HH:mm", {
    locale: es,
  });
  const [paymentMethod, setPaymentMethod] = useState("EFECTIVO");
  const [isConfirmed, setIsConfirmed] = useState(order.status === "PAGADO");

  // temporalmente, usar datos simulados
  const details = order.details.length > 0 ? order.details : [
    { product: { name: "Torta de Chocolate" }, quantity: 1, unitPrice: "25.99" },
    { product: { name: "Galletas de Avena" }, quantity: 6, unitPrice: "1.50" },
    { product: { name: "Cupcakes de Vainilla" }, quantity: 4, unitPrice: "3.25" },
  ];

  const total = details.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.unitPrice),
    0
  );

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Detalles del Pedido PED-{order.id}</DialogTitle>
          <DialogDescription>
            Cliente: {order.clientName} | Fecha: {formattedDate}
          </DialogDescription>
        </DialogHeader>

        {order.status === "CANCELADO" && order.cancelReason && (
          <p className="text-sm text-red-600 font-medium mt-2">
            Motivo: {order.cancelReason}
          </p>
        )}

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${parseFloat(item.unitPrice).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${(item.quantity * parseFloat(item.unitPrice)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-4 text-sm font-semibold">
            Total: <span className="ml-2">${total.toFixed(2)}</span>
          </div>

          {/* Si el estado es PENDIENTE y aún no se ha confirmado */}
          {order.status === "PENDIENTE" && !isConfirmed && (
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-medium">Método de Pago</h4>
              <RadioGroup
                defaultValue={paymentMethod}
                onValueChange={(val) => setPaymentMethod(val)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="EFECTIVO" id="efectivo" />
                  <Label htmlFor="efectivo">Efectivo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TARJETA" id="tarjeta" />
                  <Label htmlFor="tarjeta">Tarjeta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRANSFERENCIA" id="transferencia" />
                  <Label htmlFor="transferencia">Transferencia</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {order.status === "PENDIENTE" && !isConfirmed ? (
            <Button
              onClick={() => {
                setIsConfirmed(true);
                onConfirmPayment(); 
              }}
            >
              Confirmar Pago
            </Button>
          ) : order.status === "PAGADO" || isConfirmed ? (
            <Button onClick={onConfirmPayment}>Generar Boleta</Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
