import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type {
  ProductionCreateResponseDto,
  ProductionHistoryResponseDto,
} from "../../types";

interface DetailOrderDialogProps {
  order: ProductionCreateResponseDto | ProductionHistoryResponseDto | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function DetailOrderDialog({
  order,
  open,
  onClose,
}: DetailOrderDialogProps) {
  if (!order) return null;

  const isCreateResponse = (obj: any): obj is ProductionCreateResponseDto => {
    return (
      "id" in obj &&
      "assignedTo" in obj &&
      "details" in obj &&
      Array.isArray(obj.details) &&
      obj.details.length > 0 &&
      "product" in obj.details[0]
    );
  };

  const isHistoryResponse = (obj: any): obj is ProductionHistoryResponseDto => {
    return (
      "orderNumber" in obj &&
      "products" in obj &&
      Array.isArray(obj.products) &&
      obj.products.length > 0 &&
      "productName" in obj.products[0]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Detalles de Orden de Producción
          </DialogTitle>
          <div className="text-gray-400 text-sm font-normal">
            {isCreateResponse(order)
              ? `Orden OP-${order.id.toString().padStart(6, "0")}`
              : isHistoryResponse(order)
              ? `Orden ${order.orderNumber}`
              : ""}
          </div>
        </DialogHeader>

        {/* Información general */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 mt-2">
          <div>
            <div className="font-medium text-sm mb-1">Información General</div>
            <div className="text-sm text-gray-700">
              {isCreateResponse(order) && (
                <>
                  <div>Fecha de creación: {order.productionDate}</div>
                  <div>Responsable: {order.assignedTo.name}</div>
                </>
              )}
              {isHistoryResponse(order) && (
                <>
                  <div>Fecha: {order.date}</div>
                  <div>Responsable: {order.responsible}</div>
                </>
              )}
            </div>
          </div>
          <div>
            <div className="font-medium text-sm mb-1">Estado de la Orden</div>
            <div className="text-sm text-gray-700">
              <div>
                Estado actual:{" "}
                {isCreateResponse(order) ? order.status : order.status}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        {/* Productos */}
        <div className="mb-2">
          <div className="bg-gray-50 border rounded text-center py-1 text-base font-medium">
            Productos
          </div>
        </div>
        <div className="border rounded overflow-hidden">
          {isCreateResponse(order) && (
            <>
              <div className="grid grid-cols-12 bg-gray-50 border-b px-4 py-2 text-sm font-semibold">
                <div className="col-span-8">Producto</div>
                <div className="col-span-4 text-right">Cantidad</div>
              </div>
              {order.details.map((prod) => (
                <div
                  key={prod.product.id}
                  className="grid grid-cols-12 items-center border-b last:border-0 px-4 py-3 text-base bg-white"
                >
                  <div className="col-span-8">{prod.product.name}</div>
                  <div className="col-span-4 text-right">
                    {prod.requestedQuantity}
                  </div>
                </div>
              ))}
            </>
          )}
          {isHistoryResponse(order) && (
            <>
              <div className="grid grid-cols-12 bg-gray-50 border-b px-4 py-2 text-sm font-semibold">
                <div className="col-span-8">Producto</div>
                <div className="col-span-4 text-right">Cantidad</div>
              </div>
              {order.products.map((prod, i) => (
                <div
                  key={`${prod.productName}-${i}`}
                  className="grid grid-cols-12 items-center border-b last:border-0 px-4 py-3 text-base bg-white"
                >
                  <div className="col-span-8">{prod.productName}</div>
                  <div className="col-span-4 text-right">{prod.quantity}</div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Comentarios */}
        {isCreateResponse(order) && order.details[0]?.comments && (
          <div className="mt-6">
            <div className="bg-gray-50 border rounded text-center py-1 text-base font-medium mb-2">
              Comentario de la orden
            </div>
            <div className="border rounded px-4 py-2 bg-white text-sm">
              {order.details[0].comments}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(false)}
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
