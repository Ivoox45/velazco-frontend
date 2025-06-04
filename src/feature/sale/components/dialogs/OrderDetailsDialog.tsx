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
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { OrderListResponseDto } from "../../types";
import { Button } from "@/components/ui/button";

interface OrderDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    order: OrderListResponseDto | null;
}

export function OrderDetailsDialog({
    open,
    onClose,
    order,
}: OrderDetailsDialogProps) {
    if (!order) return null;

    const subtotal = order.details.reduce(
        (sum, detail) => sum + detail.quantity * detail.unitPrice,
        0
    );

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Detalles del Pedido PED-{order.id}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Cliente: {order.clientName} | Fecha:{" "}
                        {format(new Date(order.date), "dd/MM/yyyy - HH:mm", {
                            locale: es,
                        })}
                    </p>
                </DialogHeader>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-right">
                                Cantidad
                            </TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.details.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell className="text-right">
                                    {item.quantity}
                                </TableCell>
                                <TableCell className="text-right">
                                    ${item.unitPrice.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right">
                                    $
                                    {(item.quantity * item.unitPrice).toFixed(
                                        2
                                    )}
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
                    <Button onClick={onClose}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
