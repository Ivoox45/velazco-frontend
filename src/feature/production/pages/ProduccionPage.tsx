import { useState, useEffect } from "react";
import ProductionTabs from "../components/tabs/ProductionTabs";
import ProductionTable from "../components/table/ProductionTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserIcon, PlayIcon, PackageIcon } from "lucide-react";
import StartProductionDialog from "../components/dialog/StartProductionDialog";
import FinishProductionDialog from "../components/dialog/FinishProductionDialog";
import { useDailyProductions } from "../hooks";
import useUpdateProductionStatus from "../hooks/useUpdateProductionStatus";
import useFinalizeProduction from "../hooks/useFinalizeProduction";
import type {
  EstadoProduccion,
  StartProduct,
  ProductForFinish,
  ProductOrder,
  ProductoForm,
  ProductionStatus,
} from "../types";

export default function ProduccionPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);
  const [status, setStatus] = useState<EstadoProduccion>("PENDIENTE");

  // Obtener órdenes del día
  const { data: dailyOrders, isLoading, isError } = useDailyProductions();

  // Primera orden
  const firstOrder = dailyOrders?.[0];

  // Estado de la orden real desde el backend
  const productionStatus = firstOrder?.status as ProductionStatus | undefined;

  // Sincronizar status local con backend
  useEffect(() => {
    if (!productionStatus) return;
    if (productionStatus === "PENDIENTE") setStatus("PENDIENTE");
    else if (productionStatus === "EN_PROCESO") setStatus("PRODUCCION");
    // Si es COMPLETO o INCOMPLETO, ya no hay acciones, es estado final.
    // Puedes poner lo que quieras aquí si tu UI lo requiere.
  }, [productionStatus]);

  // Mutation para cambiar estado
  const { mutate: changeStatus, isPending: isChangingStatus } =
    useUpdateProductionStatus();

  // Mutation para finalizar producción
  const { mutate: finishOrder, isPending: isFinishingOrder } =
    useFinalizeProduction();

  // Para StartProductionDialog
  const productsForStart: StartProduct[] =
    firstOrder?.details.map((prod) => ({
      producto: prod.product.name,
      cantidad: `${prod.requestedQuantity} unidades`,
      responsable: prod.responsible?.name ?? "—",
    })) || [];

  // Para FinishProductionDialog y tabla
  const productsForFinish: ProductForFinish[] =
    firstOrder?.details.map((prod) => ({
      producto: prod.product.name,
      cantidad: prod.requestedQuantity,
    })) || [];

  // Para la tabla principal
  const tableOrders: ProductOrder[] = productsForFinish.map((o) => ({
    producto: o.producto,
    cantidad: `${o.cantidad} unidades`,
    subtitulo:
      firstOrder && firstOrder.id
        ? `Orden #OP-${String(firstOrder.id).padStart(6, "0")}`
        : undefined,
  }));

  // Encabezado
  const orderNumber =
    firstOrder && firstOrder.id
      ? `OP-${String(firstOrder.id).padStart(6, "0")}`
      : "Sin orden";
  const fechaOrden = firstOrder?.productionDate || "—";
  const responsable = firstOrder?.assignedTo?.name || "—";

  // Iniciar producción
  const handleStartProduction = () => {
    if (!firstOrder) return;
    changeStatus(
      { id: firstOrder.id, nuevoEstado: "EN_PROCESO" },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setStatus("PRODUCCION");
        },
      }
    );
  };

  // Finalizar orden
  const handleFinishOrder = (resultados: ProductoForm[]) => {
    if (!firstOrder) return;
    const productos = resultados.map((r, idx) => ({
      productId: firstOrder.details[idx].product.id,
      producedQuantity: r.cantidadProducida,
      motivoIncompleto: r.estado === "INCOMPLETO" ? r.motivo : undefined,
    }));

    finishOrder(
      {
        id: firstOrder.id,
        body: { productos },
      },
      {
        onSuccess: () => {
          setFinishDialogOpen(false);
        },
      }
    );
  };

  // Loader y error
  if (isLoading)
    return (
      <div className="text-center text-gray-500 py-16">
        Cargando orden del día...
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500 py-16">
        Error cargando orden del día.
      </div>
    );

  // Pantalla vacía cuando no hay orden
  if (!isLoading && (!dailyOrders || dailyOrders.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-4">
        <span className="text-2xl font-semibold">
          No hay orden de producción para hoy
        </span>
        <span className="text-base">
          Vuelve más tarde o verifica con el administrador.
        </span>
      </div>
    );
  }

  // Lógica para badge y mostrar/ocultar botones según estado final
  const badgeByStatus: Record<
    ProductionStatus,
    { color: string; label: string }
  > = {
    PENDIENTE: {
      color: "bg-neutral-100 text-neutral-700",
      label: "Pendiente",
    },
    EN_PROCESO: {
      color: "bg-blue-100 text-blue-800",
      label: "En Producción",
    },
    COMPLETO: {
      color: "bg-green-100 text-green-800",
      label: "Completada",
    },
    INCOMPLETO: {
      color: "bg-yellow-100 text-yellow-800",
      label: "Incompleta",
    },
  };

  return (
    <div className="p-4 space-y-4">
      {/* Dialogs */}
      <StartProductionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onStart={handleStartProduction}
        onCancel={() => setDialogOpen(false)}
        products={productsForStart}
        loading={isChangingStatus}
      />
      <FinishProductionDialog
        open={finishDialogOpen}
        onOpenChange={setFinishDialogOpen}
        onFinish={handleFinishOrder}
        onCancel={() => setFinishDialogOpen(false)}
        products={productsForFinish}
        instrucciones={firstOrder?.comments}
        loading={isFinishingOrder}
      />

      {/* Encabezado de la orden */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4  w-full">
          <div className="w-full min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[16px]">
              <span>
                Orden del día:{" "}
                <span className="font-semibold ">
                  {orderNumber} - {fechaOrden}
                </span>
              </span>
              <Badge
                className={`${
                  badgeByStatus[productionStatus!]?.color
                } font-semibold rounded-full px-3 py-1 text-xs shadow-none hover:bg-neutral-200 ml-0`}
              >
                {badgeByStatus[productionStatus!]?.label}
              </Badge>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[15px] flex-wrap">
              <UserIcon className="w-4 h-4 opacity-60 flex-shrink-0" />
              <span className="font-bold">Responsable:</span>
              <span className="break-words">{responsable}</span>
            </div>
          </div>
          {/* Solo se muestra el botón correcto según el estado */}
          {productionStatus === "PENDIENTE" ? (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm flex items-center gap-2 shadow-none w-full md:w-auto min-w-0"
              onClick={() => setDialogOpen(true)}
              disabled={!firstOrder}
            >
              <PlayIcon className="w-4 h-4 mr-1" />
              Iniciar Producción
            </Button>
          ) : productionStatus === "EN_PROCESO" ? (
            <Button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg text-sm flex items-center gap-2 shadow-none w-full md:w-auto min-w-0"
              onClick={() => setFinishDialogOpen(true)}
              disabled={!firstOrder}
            >
              <PackageIcon className="w-5 h-5 mr-2" />
              Finalizar Orden
            </Button>
          ) : null}
        </div>
      </div>

      {/* Tabs de producción */}
      <div className="w-full">
        <ProductionTabs status={status} onChange={setStatus} />
      </div>

      {/* Card con tabla e instrucciones */}
      <div className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-1">
              {productionStatus === "PENDIENTE"
                ? "Orden de Producción Pendiente"
                : productionStatus === "EN_PROCESO"
                ? "Orden en Producción"
                : "Orden Finalizada"}
            </CardTitle>
            {/* Instrucciones siempre visibles */}
            {firstOrder && (
              <div
                className="
      bg-blue-50 text-blue-900 rounded-md px-4 py-2 font-normal text-[15px]
      dark:bg-blue-950 dark:text-blue-100
      border border-blue-100 dark:border-blue-900
    "
              >
                <span className="font-semibold">
                  Instrucciones de la orden:
                </span>
                <span> {firstOrder.comments || "—"}</span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <ProductionTable orders={tableOrders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
