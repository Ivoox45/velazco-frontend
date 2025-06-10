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

  if (!order) return null;

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
          <DialogTitle>Confirmar Entrega: PED-{order.id}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Cliente: {order.clientName} | Fecha:{" "}
            {format(new Date(order.date), "dd/MM/yyyy - HH:mm", { locale: es })}
            <br />
            Atendido por: {order.attendedBy.name}
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
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Confirmando..." : "Confirmar Entrega"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
