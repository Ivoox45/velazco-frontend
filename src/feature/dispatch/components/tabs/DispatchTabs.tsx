import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type EstadoDespacho = "PAGADO" | "ENTREGADO" | "TODOS";

interface DispatchTabsProps {
  status?: EstadoDespacho;
  onChange: (status: EstadoDespacho) => void;
  className?: string; // <--- Soporta className
}

export default function DispatchTabs({
  status = "PAGADO",
  onChange,
  className = "", // <--- Default vacío
}: DispatchTabsProps) {
  return (
    <Tabs
      value={status}
      onValueChange={(value) => onChange(value as EstadoDespacho)}
      className={`w-full ${className}`} // <--- Pasa className extra aquí
    >
      <TabsList className="w-full justify-between">
        <TabsTrigger value="PAGADO" className="flex-1">
          Pagados
        </TabsTrigger>
        <TabsTrigger value="ENTREGADO" className="flex-1">
          Entregados
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
