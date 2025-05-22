// SaleCard.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { OrderListResponse } from "@/feature/sale/types";
import OrderDetailDialog from "../dialogs/OrderDetailDialog";
import ConfirmPaymentDialog from "../dialogs/ConfirmPaymentDialog";
import ReceiptDialog from "../dialogs/ReceiptDialog";

export default function SaleCard({ order }: { order: OrderListResponse }) {
    const [openStep, setOpenStep] = useState<"details" | "confirm" | "receipt" | null>(null);

    const getBadgeStyle = () => {
        switch (order.status) {
            case "PENDIENTE":
                return "bg-yellow-100 text-yellow-800";
            case "PAGADO":
                return "bg-green-100 text-green-800";
            case "CANCELADO":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formattedDate = format(new Date(order.date), "dd/MM/yyyy - HH:mm", { locale: es });

    return (
        <>
            <div className="flex items-center justify-between border rounded-lg px-6 py-4">
                <div>
                    <h3 className="font-bold text-md">PED-{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.clientName}</p>
                    <Badge variant="outline" className={`${getBadgeStyle()} mt-2`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()}
                    </Badge>
                    {order.status === "CANCELADO" && order.cancelReason && (
                        <p className="text-sm mt-2 text-muted-foreground">Motivo: {order.cancelReason}</p>
                    )}
                </div>

                <div className="flex flex-col items-end gap-2">
                    <span className="font-semibold">$49.49</span>
                    <span className="text-sm text-muted-foreground">{formattedDate}</span>
                    <Button className="mt-1" onClick={() => setOpenStep("details")}>Ver Detalles</Button>
                </div>
            </div>

            <OrderDetailDialog
                open={openStep === "details"}
                onClose={() => setOpenStep(null)}
                onConfirmPayment={() => setOpenStep("confirm")}
                order={order}
            />

            <ConfirmPaymentDialog
                open={openStep === "confirm"}
                onClose={() => setOpenStep(null)}
                onGenerateReceipt={() => setOpenStep("receipt")}
                order={order}
            />
            <ReceiptDialog
                open={openStep === "receipt"}
                onClose={() => setOpenStep(null)}
                order={order}
                paymentMethod="Efectivo" 
            />

        </>
    );
}
