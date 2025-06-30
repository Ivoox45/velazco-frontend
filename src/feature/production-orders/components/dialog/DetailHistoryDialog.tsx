import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetProductionDetail } from "../../hooks";
import type {
  ProductionHistoryResponseDto,
  ProductionCreateResponseDto,
} from "../../types";

interface DetailHistoryDialogProps {
  order: ProductionHistoryResponseDto | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

// --- UTILS ---

function extractId(orderNumber: string): number | null {
  if (!orderNumber) return null;
  const partes = orderNumber.split("-");
  if (partes.length === 2) {
    const idStr = partes[1].replace(/^0+/, "");
    return Number(idStr) || null;
  }
  const parsed = parseInt(orderNumber, 10);
  return isNaN(parsed) ? null : parsed;
}

function joinProductsWithDetails(
  historyProducts: {
    productName: string;
    requestedQuantity?: number;
    producedQuantity?: number;
    quantity?: number;
    comments?: string;
  }[],
  orderDetails?: ProductionCreateResponseDto
) {
  if (!orderDetails) {
    return historyProducts.map((hp) => ({
      productName: hp.productName,
      requested: hp.requestedQuantity ?? hp.quantity ?? 0,
      produced: hp.producedQuantity ?? hp.quantity ?? 0,
      comments: hp.comments,
    }));
  }
  return historyProducts.map((hp) => {
    const detail = orderDetails.details?.find(
      (od) => od.product.name === hp.productName
    );
    return {
      productName: hp.productName,
      requested:
        detail?.requestedQuantity ?? hp.requestedQuantity ?? hp.quantity ?? 0,
      produced:
        detail?.producedQuantity ?? hp.producedQuantity ?? hp.quantity ?? 0,
      comments: hp.comments ?? detail?.comments ?? "",
    };
  });
}

function getOrderSummary(products: ReturnType<typeof joinProductsWithDetails>) {
  let completados = 0;
  let incompletos = 0;
  let totalSolicitado = 0;
  let totalProducido = 0;

  products.forEach((prod) => {
    totalSolicitado += prod.requested;
    totalProducido += prod.produced;
    if (prod.produced >= prod.requested && !prod.comments) {
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
  // Always call hooks unconditionally
  const productionId = extractId(order?.orderNumber ?? "");
  const { data: productionDetail, isLoading } =
    useGetProductionDetail(productionId);

  if (!order) return null;

  if (isLoading) return <div>Cargando detalle...</div>;

  const productosFusionados = joinProductsWithDetails(
    order.products,
    productionDetail
  );
  const resumen = getOrderSummary(productosFusionados);

  const incompletos = productosFusionados.filter(
    (p) => !!p.comments || p.produced < p.requested
  );
  const completos = productosFusionados.filter((p) => !incompletos.includes(p));

  function getStatusBadge(status: string) {
    switch (status) {
      case "COMPLETO":
      case "COMPLETA":
        return (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
            Completado
          </span>
        );
      case "INCOMPLETO":
        return (
          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
            Incompleto
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
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
          <div className="text-gray-400 text-sm font-normal">
            Orden {order.orderNumber}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-2">
          <div>
            <div className="font-medium text-sm mb-1">Información General</div>
            <div className="text-sm text-gray-700">
              <div>Fecha: {order.date}</div>
              <div>Responsable: {order.responsible}</div>
            </div>
          </div>
          <div>
            <div className="font-medium text-sm mb-1">Estado de la Orden</div>
            <div className="text-sm flex items-center gap-2">
              {getStatusBadge(order.status)}
            </div>
          </div>
        </div>

        {/* Resumen de Finalización ocupa todo el ancho */}
        <div className="bg-gray-50 my-2 p-3 rounded text-xs border w-full">
          <div className="font-semibold mb-1">Resumen de Finalización</div>
          <div className="flex flex-col gap-1">
            <span>
              <span className="text-green-700 font-semibold">Completados:</span>{" "}
              {resumen.completados}
              {"  "}
              <span className="text-orange-700 font-semibold">
                Incompletos:
              </span>{" "}
              {resumen.incompletos}
            </span>
            <span>
              Total Producido: {resumen.totalProducido}/
              {resumen.totalSolicitado}
            </span>
            <span>Eficiencia: {resumen.eficiencia}%</span>
          </div>
        </div>

        {/* Instrucciones/comentario principal */}
        {/* Si tienes comentarios en el historial los puedes mostrar aquí */}

        <div className="mt-5">
          <div className="text-base font-medium border rounded-t px-4 py-2 bg-gray-50 text-center">
            Productos y Resultados
          </div>
          <div className="border rounded-b divide-y">
            <div className="grid grid-cols-12 px-4 py-2 font-semibold text-sm bg-gray-50">
              <div className="col-span-8">Producto</div>
              <div className="col-span-4 text-right">Cantidad</div>
            </div>
            {[...completos, ...incompletos].map((prod, idx) => (
              <div
                key={prod.productName + idx}
                className={`grid grid-cols-12 items-center px-4 py-3 bg-white`}
              >
                <div className="col-span-8">
                  <span>{prod.productName}</span>
                  {prod.comments && (
                    <div className="text-xs bg-orange-50 text-orange-700 mt-1 rounded px-2 py-1 border border-orange-200">
                      <b>Motivo:</b> {prod.comments}
                    </div>
                  )}
                </div>
                <div className="col-span-4 text-right">
                  {prod.produced}/{prod.requested} unidades
                  <div>
                    {prod.produced >= prod.requested && !prod.comments ? (
                      <span className="flex justify-end text-xs text-green-700 mt-1">
                        ✓ Completado
                      </span>
                    ) : (
                      <span className="flex justify-end text-xs text-orange-700 mt-1">
                        ⚠️ Incompleto
                      </span>
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
            <div className="font-semibold text-sm mb-1">
              Resumen de Productos Incompletos ({incompletos.length})
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded p-2 text-orange-800 text-sm">
              {incompletos.map((prod, idx) => (
                <div key={prod.productName + "-resumen" + idx} className="mb-2">
                  <div>
                    <b>{prod.productName}</b> ({prod.produced}/{prod.requested}{" "}
                    unidades)
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
