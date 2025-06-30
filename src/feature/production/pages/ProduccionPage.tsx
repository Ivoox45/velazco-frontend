import { useState } from "react";
import ProductionTabs from "../components/tabs/ProductionTabs";
import ProductionTable from "../components/table/ProductionTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserIcon, PlayIcon, PackageIcon } from "lucide-react";
import StartProductionDialog from "../components/dialog/StartProductionDialog";
import FinishProductionDialog from "../components/dialog/FinishProductionDialog";
import { useDailyProductions } from "../hooks";
import type {
  EstadoProduccion,
  StartProduct,
  ProductForFinish,
  ProductOrder,
  ProductoForm,
} from "../types";

export default function ProduccionPage() {
  const [status, setStatus] = useState<EstadoProduccion>("PENDIENTE");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);

  // Obtener órdenes del día
  const { data: dailyOrders, isLoading, isError } = useDailyProductions();

  // Primera orden
  const firstOrder = dailyOrders?.[0];

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

  const handleStartProduction = () => {
    setDialogOpen(false);
    setStatus("PRODUCCION");
  };

  const handleFinishOrder = (resultados: ProductoForm[]) => {
    setFinishDialogOpen(false);
    // puedes guardar resultados en backend aquí si quieres
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

  return (
    <div className="p-4 space-y-4">
      {/* Dialogs */}
      <StartProductionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onStart={handleStartProduction}
        onCancel={() => setDialogOpen(false)}
        products={productsForStart}
      />
      <FinishProductionDialog
        open={finishDialogOpen}
        onOpenChange={setFinishDialogOpen}
        onFinish={handleFinishOrder}
        onCancel={() => setFinishDialogOpen(false)}
        products={productsForFinish}
      />

      {/* Encabezado de la orden */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 text-gray-500 w-full">
          <div className="w-full min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[16px]">
              <span>
                Orden del día:{" "}
                <span className="font-semibold text-gray-600">
                  {orderNumber} - {fechaOrden}
                </span>
              </span>
              <Badge className="bg-neutral-100 text-neutral-700 font-semibold rounded-full px-3 py-1 text-xs shadow-none hover:bg-neutral-200 ml-0">
                {status === "PENDIENTE" ? "Pendiente" : "En Producción"}
              </Badge>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[15px] text-gray-500 flex-wrap">
              <UserIcon className="w-4 h-4 opacity-60 flex-shrink-0" />
              <span className="font-bold">Responsable:</span>
              <span className="break-words">{responsable}</span>
            </div>
          </div>
          {status === "PENDIENTE" ? (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm flex items-center gap-2 shadow-none w-full md:w-auto min-w-0"
              onClick={() => setDialogOpen(true)}
              disabled={!firstOrder}
            >
              <PlayIcon className="w-4 h-4 mr-1" />
              Iniciar Producción
            </Button>
          ) : (
            <Button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg text-sm flex items-center gap-2 shadow-none w-full md:w-auto min-w-0"
              onClick={() => setFinishDialogOpen(true)}
              disabled={!firstOrder}
            >
              <PackageIcon className="w-5 h-5 mr-2" />
              Finalizar Orden
            </Button>
          )}
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
              {status === "PENDIENTE"
                ? "Orden de Producción Pendiente"
                : "Orden en Producción"}
            </CardTitle>
            {status === "PENDIENTE" && (
              <div className="bg-blue-50 text-blue-900 text-[15px] rounded-md px-4 py-2 font-normal">
                <span className="font-semibold">
                  Instrucciones de la orden:
                </span>
                <span> {firstOrder?.details[0]?.comments || "—"}</span>
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
