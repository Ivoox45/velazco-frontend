import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderTabsProps {
  status: string;
  onChange: (status: string) => void;
  className?: string; // <-- Añadido aquí
}

export default function OrderTabs({ status, onChange, className = "" }: OrderTabsProps) {
  return (
    <Tabs value={status} onValueChange={onChange} className={className}>
      <TabsList className="w-full justify-between">
        <TabsTrigger value="PENDIENTE" className="flex-1">
          Pendientes
        </TabsTrigger>
        <TabsTrigger value="PAGADO" className="flex-1">
          Pagados
        </TabsTrigger>
        <TabsTrigger value="CANCELADO" className="flex-1">
          Cancelados
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
