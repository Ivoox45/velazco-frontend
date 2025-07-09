import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProductionHistoryResponseDto } from "../../types";

interface DetailHistoryDialogProps {
  order: ProductionHistoryResponseDto | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

// Calcula el resumen directamente del historial
function getOrderSummary(products: ProductionHistoryResponseDto["products"]) {
  let completados = 0;
  let incompletos = 0;
  let totalSolicitado = 0;
  let totalProducido = 0;

  products.forEach((prod) => {
    const requested = prod.requestedQuantity ?? 0;
    const produced = prod.producedQuantity ?? 0;
    totalSolicitado += requested;
    totalProducido += produced;
    if (produced >= requested && !prod.comments) {
      completados++;
    } else {
      incompletos++;
    }
  });

  const eficiencia =
    totalSolicitado > 0
      ? Math.round((totalProducido / totalSolicitado) * 100)
      : 100;

  return {
    completados,
    incompletos,
    totalSolicitado,
    totalProducido,
    eficiencia,
  };
}

export default function DetailHistoryDialog({
  order,
  open,
  onClose,
}: DetailHistoryDialogProps) {
  if (!order) return null;

  const resumen = getOrderSummary(order.products);
  const incompletos = order.products.filter(
    (p) =>
      !!p.comments || (p.producedQuantity ?? 0) < (p.requestedQuantity ?? 0)
  );
  const completos = order.products.filter(
    (p) =>
      !(!!p.comments || (p.producedQuantity ?? 0) < (p.requestedQuantity ?? 0))
  );

  function getStatusBadge(status: string) {
    switch (status) {
      case "COMPLETO":
      case "COMPLETA":
        return (
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded-full text-xs">
            Completado
          </span>
        );
      case "INCOMPLETO":
        return (
          <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-1 rounded-full text-xs">
            Incompleto
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-100 px-2 py-1 rounded-full text-xs">
            {status}
          </span>
        );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Detalles de Orden de Producción
          </DialogTitle>
          <div className="text-sm font-normal text-neutral-500 dark:text-neutral-300">
            Orden {order.orderNumber}
          </div>
        </DialogHeader>

        {/* Info general */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-2">
          <div>
            <div className="font-medium text-sm mb-1 text-neutral-800 dark:text-neutral-100">
              Información General
            </div>
            <div className="text-sm text-neutral-700 dark:text-neutral-200">
              <div>Fecha: {order.date}</div>
              <div>Responsable: {order.responsible}</div>
            </div>
          </div>
          <div>
            <div className="font-medium text-sm mb-1 text-neutral-800 dark:text-neutral-100">
              Estado de la Orden
            </div>
            <div className="text-sm flex items-center gap-2">
              {getStatusBadge(order.status)}
            </div>
          </div>
        </div>

        {/* Resumen de Finalización */}
        <div className="
          bg-gray-50 dark:bg-neutral-900 my-2 p-3 rounded text-xs border border-gray-200 dark:border-neutral-800 w-full
        ">
          <div className="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">Resumen de Finalización</div>
          <div className="flex flex-col gap-1">
            <span>
              <span className="text-green-700 dark:text-green-300 font-semibold">Completados:</span>{" "}
              {resumen.completados}
              {"  "}
              <span className="text-orange-700 dark:text-orange-300 font-semibold">
                Incompletos:
              </span>{" "}
              {resumen.incompletos}
            </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              Total Producido: {resumen.totalProducido}/{resumen.totalSolicitado}
            </span>
            <span className="text-neutral-800 dark:text-neutral-200">
              Eficiencia: {resumen.eficiencia}%
            </span>
          </div>
        </div>

        {/* Tabla productos VS */}
        <div className="mt-5">
          <div className="
            text-base font-medium border border-gray-200 dark:border-neutral-800 rounded-t px-4 py-2 bg-gray-50 dark:bg-neutral-900 text-center
            text-neutral-900 dark:text-neutral-100
          ">
            Productos y Resultados
          </div>
          <div className="border border-gray-200 dark:border-neutral-800 rounded-b divide-y divide-gray-100 dark:divide-neutral-800">
            <div className="grid grid-cols-12 px-4 py-2 font-semibold text-sm bg-gray-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
              <div className="col-span-6">Producto</div>
              <div className="col-span-3 text-center">Requerida</div>
              <div className="col-span-3 text-center">Producida</div>
            </div>
            {[...completos, ...incompletos].map((prod, idx) => (
              <div
                key={prod.productName + idx}
                className="grid grid-cols-12 items-center px-4 py-3 bg-white dark:bg-neutral-950"
              >
                <div className="col-span-6">
                  <span className="text-neutral-900 dark:text-neutral-100">{prod.productName}</span>
                  {prod.comments && (
                    <div className="text-xs bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-200 mt-1 rounded px-2 py-1 border border-orange-200 dark:border-orange-900">
                      <b>Motivo:</b> {prod.comments}
                    </div>
                  )}
                </div>
                <div className="col-span-3 text-center text-neutral-900 dark:text-neutral-100">
                  {prod.requestedQuantity}
                </div>
                <div className="col-span-3">
                  <div className="flex items-center justify-center gap-1">
                    <span className="mx-2 text-neutral-900 dark:text-neutral-100">
                      {prod.producedQuantity}
                    </span>
                    {prod.producedQuantity >= prod.requestedQuantity &&
                    !prod.comments ? (
                      <span className="text-green-700 dark:text-green-400 text-base">✓</span>
                    ) : (
                      <span className="text-orange-700 dark:text-orange-300 text-base">⚠️</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen visual de incompletos */}
        {incompletos.length > 0 && (
          <div className="mt-5">
            <div className="font-semibold text-sm mb-1 text-neutral-900 dark:text-neutral-100">
              Resumen de Productos Incompletos ({incompletos.length})
            </div>
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-900 rounded p-2 text-orange-800 dark:text-orange-200 text-sm">
              {incompletos.map((prod, idx) => (
                <div key={prod.productName + "-resumen" + idx} className="mb-2">
                  <div>
                    <b>{prod.productName}</b> ({prod.producedQuantity}/{prod.requestedQuantity} unidades)
                  </div>
                  {prod.comments && (
                    <div>
                      <span className="font-medium">Motivo: </span>
                      {prod.comments}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
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
