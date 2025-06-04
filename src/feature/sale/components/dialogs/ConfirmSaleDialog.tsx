import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import { useState } from "react";
import type { OrderListResponseDto } from "../../types";

interface ConfirmSaleDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (paymentMethod: string) => void;
    order: OrderListResponseDto | null;
}

export function ConfirmSaleDialog({
    open,
    onClose,
    onConfirm,
    order,
}: ConfirmSaleDialogProps) {
    const [paymentMethod, setPaymentMethod] = useState("EFECTIVO");

    if (!order) return null;

    const subtotal = order.details.reduce(
        (sum, detail) => sum + detail.quantity * detail.unitPrice,
        0
    );

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Detalles del Pedido {order.id}</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Cliente: {order.clientName} | Fecha:{" "}
                        {new Intl.DateTimeFormat("es-ES", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        }).format(new Date(order.date))}
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

                <div className="mt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="mt-4">
                    <p className="font-semibold mb-2">Método de Pago</p>
                    <RadioGroup
                        defaultValue={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="flex space-x-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="EFECTIVO" id="efectivo" />
                            <label htmlFor="efectivo">Efectivo</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="TARJETA" id="tarjeta" />
                            <label htmlFor="tarjeta">Tarjeta</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="TRANSFERENCIA"
                                id="transferencia"
                            />
                            <label htmlFor="transferencia">Transferencia</label>
                        </div>
                    </RadioGroup>
                </div>

                <DialogFooter className="justify-end mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={() => onConfirm(paymentMethod)}>
                        Confirmar Pago
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
