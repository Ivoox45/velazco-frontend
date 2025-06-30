import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrderProduction } from "../components";
import { HistoryProduction } from "../components";
import { NewOrderDialog } from "../components";

export default function OrderProductionPage() {
  return (
    <div className="p-4">
      {/* Botón alineado a la derecha con Dialog */}
      <div className="flex justify-end mb-3">
        <NewOrderDialog>
          <Button className="w-full sm:w-auto flex items-center px-3 py-2 sm:px-4 sm:py-2">
            <Plus className="h-4 w-4" />
            <span className=" sm:inline ml-2">Nueva Orden</span>
          </Button>
        </NewOrderDialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="nuevas" className="w-full">
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
            <CardContent className="pt-6">
              <OrderProduction />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="historial">
          <Card>
            <CardContent className="pt-6">
              <HistoryProduction />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
