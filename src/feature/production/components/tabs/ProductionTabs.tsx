import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type EstadoProduccion = "PENDIENTE" | "PRODUCCION" | "COMPLETO" | "INCOMPLETO";

export interface OrderTabsProps {
  status?: EstadoProduccion;
  onChange: (status: EstadoProduccion) => void;
}

export default function ProductionTabs({
  status = "PENDIENTE",
  onChange,
}: OrderTabsProps) {
  if (status === "COMPLETO" || status === "INCOMPLETO") {
    return (
      <Tabs value={status} className="w-full">
        <TabsList className="w-full justify-between">
          <TabsTrigger value={status} className="flex-1" disabled>
            {status === "COMPLETO" ? "Orden Completada" : "Orden Incompleta"}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }
  return (
    <Tabs
      value={status}
      onValueChange={(value) => onChange(value as EstadoProduccion)}
      className="w-full"
    >
      <TabsList className="w-full justify-between">
        <TabsTrigger
          value="PENDIENTE"
          className="flex-1"
          disabled={status === "PRODUCCION"}
        >
          Orden Pendiente
        </TabsTrigger>
        <TabsTrigger
          value="PRODUCCION"
          className="flex-1"
          disabled={status === "PENDIENTE"}
        >
          En Producción
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
