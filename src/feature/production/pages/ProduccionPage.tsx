// src/production/pages/ProduccionPage.tsx
import { useState } from "react";
import ProductionTabs from "../components/tabs/ProductionTabs";
import ProductionTable from "../components/table/ProductionTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserIcon, PlayIcon, PackageIcon } from "lucide-react";
import StartProductionDialog from "../components/dialog/StartProductionDialog";
import FinishProductionDialog from "../components/dialog/FinishProductionDialog";
import type {
  EstadoProduccion,
  ProductOrder,
  ProductoForm,
  FinishResult,
} from "../types";

// Ordenes listas para la tabla (con subtítulo y cantidad como string)
const ORDERS: ProductOrder[] = [
  {
    producto: "Torta de Chocolate",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "10 unidades",
  },
  {
    producto: "Galletas de Avena",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "120 unidades",
  },
  {
    producto: "Brownies",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "30 unidades",
  },
  {
    producto: "Alfajores",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "50 unidades",
  },
  {
    producto: "Cheesecake",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "8 unidades",
  },
  {
    producto: "Cupcakes de Vainilla",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "48 unidades",
  },
];

export default function ProduccionPage() {
  const [status, setStatus] = useState<EstadoProduccion>("PENDIENTE");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);

  const handleStartProduction = () => {
    setDialogOpen(false);
    setStatus("PRODUCCION");
  };

  const handleFinishOrder = (resultados: ProductoForm[]) => {
    setFinishDialogOpen(false);
    // Aquí solo para debug. Puedes guardar en backend o mostrar el resultado
    const finalResults: FinishResult[] = resultados.map((r, idx) => ({
      producto: ORDERS[idx].producto,
      completado: r.estado === "COMPLETADO",
      cantidadProducida: r.cantidadProducida,
      motivo: r.motivo,
    }));
    console.log("Resultados enviados:", finalResults);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Dialogs */}
      <StartProductionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onStart={handleStartProduction}
        onCancel={() => setDialogOpen(false)}
      />
      <FinishProductionDialog
        open={finishDialogOpen}
        onOpenChange={setFinishDialogOpen}
        onFinish={handleFinishOrder}
        onCancel={() => setFinishDialogOpen(false)}
        // OJO: probablemente FinishProductionDialog espera otro tipo, puedes mapear si hace falta
        products={ORDERS.map((o) => ({
          producto: o.producto,
          cantidad: Number(o.cantidad.split(" ")[0]),
        }))}
      />

      {/* Encabezado de la orden */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 text-gray-500 w-full">
          <div className="w-full min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[16px]">
              <span>
                Orden del día:{" "}
                <span className="font-semibold text-gray-600">
                  OP-2023-042 - 24/04/2023
                </span>
              </span>
              <Badge className="bg-neutral-100 text-neutral-700 font-semibold rounded-full px-3 py-1 text-xs shadow-none hover:bg-neutral-200 ml-0">
                {status === "PENDIENTE" ? "Pendiente" : "En Producción"}
              </Badge>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[15px] text-gray-500 flex-wrap">
              <UserIcon className="w-4 h-4 opacity-60 flex-shrink-0" />
              <span className="font-bold">Responsable:</span>
              <span className="break-words">
                Carlos Gómez - Jefe de Producción
              </span>
            </div>
          </div>
          {status === "PENDIENTE" ? (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm flex items-center gap-2 shadow-none w-full md:w-auto min-w-0"
              onClick={() => setDialogOpen(true)}
            >
              <PlayIcon className="w-4 h-4 mr-1" />
              Iniciar Producción
            </Button>
          ) : (
            <Button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg text-sm flex items-center gap-2 shadow-none w-full md:w-auto min-w-0"
              onClick={() => setFinishDialogOpen(true)}
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
                <span>
                  {" "}
                  Pedido urgente para evento corporativo. Las tortas deben tener
                  decoración especial y las galletas empacadas en cajas de 10
                  unidades.
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <ProductionTable orders={ORDERS} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
