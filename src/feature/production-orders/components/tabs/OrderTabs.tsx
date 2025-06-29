import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function OrderTabs() {
  const [tab, setTab] = useState("nuevas");

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="w-full  p-1 rounded-lg flex">
        <TabsTrigger value="nuevas" className="flex-1  rounded-md text-base">
          Nuevas Órdenes
        </TabsTrigger>
        <TabsTrigger value="historial" className="flex-1 rounded-md text-base">
          Historial
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
