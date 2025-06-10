import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { useConfirmDispatch } from "../../hooks";
import type { DispatchOrder } from "../../types";

interface DispatchConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  order: DispatchOrder | null;
}

export default function DispatchConfirmDialog({
  open,
  onClose,
  order,
}: DispatchConfirmDialogProps) {
  const { mutate, isLoading } = useConfirmDispatch();

  if (!order || order.status !== "ENTREGADO") return null;
  console.log("🧾 Pedido entregado:", order);

  const subtotal = order.details.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const handleConfirm = () => {
    mutate(order.id, {
      onSuccess: () => {
        toast.success(`Pedido ${order.id} marcado como ENTREGADO`);
        onClose();
      },
      onError: () => {
        toast.error("No se pudo confirmar la entrega del pedido.");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {order.status === "ENTREGADO"
              ? `Entrega realizada: PED-${order.id}`
              : `Confirmar Entrega: PED-${order.id}`}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Cliente: {order.clientName} <br />
            Fecha del pedido:{" "}
            {format(new Date(order.date), "dd/MM/yyyy - HH:mm", {
              locale: es,
            })}{" "}
            <br />
            <strong>Fecha de entrega:</strong>{" "}
            {order.dispatch
              ? format(
                  new Date(order.dispatch.deliveryDate),
                  "dd/MM/yyyy - HH:mm",
                  { locale: es }
                )
              : "No disponible"}{" "}
            <br />
            Entregado por:{" "}
            {order.dispatch?.dispatchedBy.name ?? "No disponible"}
          </p>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.details.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${item.unitPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-between font-semibold">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <DialogFooter className="justify-end mt-4">
          <Button onClick={onClose} variant="outline">
            {order.status === "ENTREGADO" ? "Cerrar" : "Cancelar"}
          </Button>
          {order.status === "PAGADO" && (
            <Button onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? "Confirmando..." : "Confirmar Entrega"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
