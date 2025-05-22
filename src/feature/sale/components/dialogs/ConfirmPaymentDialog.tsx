import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReceiptText } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { OrderListResponse } from "@/feature/sale/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onGenerateReceipt: () => void;
  order: OrderListResponse;
};

export default function ConfirmPaymentDialog({
  open,
  onClose,
  onGenerateReceipt,
  order,
}: Props) {
  const formattedDate = format(new Date(order.date), "dd/MM/yyyy - HH:mm", { locale: es });

  // Simulando detalles (reemplaza con order.details si está disponible)
  const mockDetails = [
    { product: { name: "Torta de Chocolate" }, quantity: 1, unitPrice: 25.99 },
    { product: { name: "Galletas de Avena" }, quantity: 6, unitPrice: 1.5 },
    { product: { name: "Cupcakes de Vainilla" }, quantity: 4, unitPrice: 3.25 },
  ];

  const total = mockDetails.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Boleta de Venta</DialogTitle>
          <DialogDescription>Velazco Dulcería y Pastelería</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <ReceiptText className="w-8 h-8 text-pink-600" />
          <h3 className="text-lg font-bold mt-2">Velazco Dulcería y Pastelería</h3>
          <p className="text-sm text-muted-foreground">Av. Principal 123, Ciudad</p>
          <p className="text-sm text-muted-foreground">Tel: (123) 456-7890</p>
        </div>

        <div className="text-sm space-y-1 mb-4">
          <div className="flex justify-between">
            <span className="font-medium">N° Pedido:</span>
            <span>PED-{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Cliente:</span>
            <span>{order.clientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Fecha:</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        <Table>
          <TableBody>
            {mockDetails.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-1">
                  {item.quantity} x {item.product.name}
                </TableCell>
                <TableCell className="text-right py-1">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between mt-4 font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="text-sm mt-4">
          <span className="font-medium">Método de Pago:</span>{" "}
          <span>Efectivo</span>
        </div>

        <div className="text-center mt-6 text-sm">
          <p className="font-medium">¡Gracias por su compra!</p>
          <p className="text-muted-foreground text-xs">www.velazcopasteleria.com</p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button onClick={onGenerateReceipt}>
            <ReceiptText className="w-4 h-4 mr-2" />
            Imprimir Boleta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
