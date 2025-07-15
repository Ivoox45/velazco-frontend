import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrderProduction } from "../components";
import { HistoryProduction } from "../components";
import { NewOrderDialog } from "../components";
// Importa el tour separado
import startTourOrdenesProduccion from "../../../tours/startTourOrdenesProduccion";

export default function OrderProductionPage() {
  const [tab, setTab] = useState("nuevas");

  // Registrar función del tour global y pasar el tab activo
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.startTour_ordenes_produccion = () => startTourOrdenesProduccion(tab);
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.startTour_ordenes_produccion;
      }
    };
  }, [tab]);

  return (
    <div className="p-4">
      {/* Botón alineado a la derecha con Dialog */}
      <div className="flex justify-end mb-3">
        <NewOrderDialog>
          <Button className="w-full sm:w-auto flex items-center px-3 py-2 sm:px-4 sm:py-2 new-order-driver">
            <Plus className="h-4 w-4" />
            <span className=" sm:inline ml-2">Nueva Orden</span>
          </Button>
        </NewOrderDialog>
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full tabs-order-production-driver"
      >
        <TabsList className="w-full p-1 rounded-lg flex">
          <TabsTrigger
            value="nuevas"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-black data-[state=active]:font-semibold rounded-md text-base"
          >
            Nuevas Órdenes
          </TabsTrigger>
          <TabsTrigger
            value="historial"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-black data-[state=active]:font-semibold rounded-md text-base"
          >
            Historial
          </TabsTrigger>
        </TabsList>

        {/* Card conteniendo cada tabla */}
        <TabsContent value="nuevas">
          <Card>
            <CardContent className="pt-6 table-new-orders-driver">
              <OrderProduction />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="historial">
          <Card>
            <CardContent className="pt-6 table-history-orders-driver">
              <HistoryProduction />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
