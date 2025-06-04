import { useState } from "react";
import { toast } from "sonner";
import { OrderCard } from "../components/cards/OrderCard";
import { SaleSearchInput } from "../components/input/SaleSearchInput";
import { OrderTabs } from "../components/tabs/OrderTabs";
import useGetOrdersByStatus from "../hooks/useGetOrdersByStatus";
import useCancelOrder from "../hooks/useCancelOrder";
import useConfirmSale from "../hooks/useConfirmSale";
import { ConfirmSaleDialog } from "../components/dialogs/ConfirmSaleDialog";
import { OrderDetailsDialog } from "../components/dialogs/OrderDetailsDialog";
import { CancelOrderDialog } from "../components/dialogs/CancelOrderDialog";
import type { OrderListResponseDto } from "../types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function CajaPage() {
    const [status, setStatus] = useState("PENDIENTE");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [selectedOrder, setSelectedOrder] =
        useState<OrderListResponseDto | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const { data, isLoading } = useGetOrdersByStatus(status, page);
    const cancelOrder = useCancelOrder();
    const confirmSale = useConfirmSale();

    const filteredOrders = data?.content.filter((order) =>
        order.clientName.toLowerCase().includes(search.toLowerCase())
    );
    function OrderCardSkeleton() {
        return (
            <div className="border rounded-md p-4 space-y-2 w-full">
                <Skeleton className="h-5 w-1/3" /> {/* Pedido ID */}
                <Skeleton className="h-4 w-1/2" /> {/* Cliente */}
                <Skeleton className="h-4 w-24" /> {/* Estado */}
                <Skeleton className="h-10 w-28 mt-2" /> {/* Botones */}
            </div>
        );
    }

    const handleOpenAction = (order: OrderListResponseDto) => {
        setSelectedOrder(order);
        if (order.status === "PENDIENTE") {
            setShowConfirmDialog(true);
        } else if (order.status === "PAGADO" || order.status === "CANCELADO") {
            setShowDetailsDialog(true);
        }
    };

    const handleOpenCancel = (order: OrderListResponseDto) => {
        setSelectedOrder(order);
        setShowCancelDialog(true);
    };

    const handleConfirmPayment = (paymentMethod: string) => {
        if (!selectedOrder) return;
        confirmSale.mutate(
            { id: selectedOrder.id, payload: { paymentMethod } },
            {
                onSuccess: () => {
                    toast.success(
                        `Pedido ${selectedOrder.id} confirmado exitosamente.`
                    );
                    setShowConfirmDialog(false);
                },
            }
        );
    };

    const handleCancelOrder = () => {
        if (!selectedOrder) return;
        cancelOrder.mutate(selectedOrder.id, {
            onSuccess: () => {
                toast.success(
                    `Pedido ${selectedOrder.id} cancelado exitosamente.`
                );
                setShowCancelDialog(false);
            },
        });
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && data && newPage < data.totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col gap-2">
                <div className="w-full sm:max-w-[250px]">
                    <SaleSearchInput value={search} onChange={setSearch} />
                </div>
                <div className="w-full">
                    <OrderTabs
                        status={status}
                        onChange={(newStatus) => {
                            setStatus(newStatus);
                            setPage(0); // Reset page when changing status
                        }}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <OrderCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders?.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onConfirm={() => handleOpenAction(order)}
                            onCancel={() => handleOpenCancel(order)}
                        />
                    ))}

                    {data && data.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 0}
                            >
                                Anterior
                            </Button>
                            <span className="text-sm">
                                Página {page + 1} de {data.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page + 1 >= data.totalPages}
                            >
                                Siguiente
                            </Button>
                        </div>
                    )}
                </div>
            )}

            <ConfirmSaleDialog
                open={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleConfirmPayment}
                order={selectedOrder}
            />

            <OrderDetailsDialog
                open={showDetailsDialog}
                onClose={() => setShowDetailsDialog(false)}
                order={selectedOrder}
            />

            <CancelOrderDialog
                open={showCancelDialog}
                onClose={() => setShowCancelDialog(false)}
                onConfirm={handleCancelOrder}
            />
        </div>
    );
}
