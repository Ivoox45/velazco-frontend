import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RankingCard } from "../cards";

const vendedoresData = [
  {
    initials: "LG",
    name: "Luis García",
    role: "Vendedor",
    data: { ventas: 48, monto: 15250.75, promedio: 318, clientes: 52 },
  },
  {
    initials: "AM",
    name: "Ana Martínez",
    role: "Vendedor",
    data: { ventas: 42, monto: 13800.5, promedio: 329, clientes: 45 },
  },
  {
    initials: "AM",
    name: "Ana Martínez",
    role: "Vendedor",
    data: { ventas: 42, monto: 13800.5, promedio: 329, clientes: 45 },
  },
  {
    initials: "AM",
    name: "Ana Martínez",
    role: "Vendedor",
    data: { ventas: 42, monto: 13800.5, promedio: 329, clientes: 45 },
  },
  {
    initials: "AM",
    name: "Ana Martínez",
    role: "Vendedor",
    data: { ventas: 42, monto: 13800.5, promedio: 329, clientes: 45 },
  },
  // Agrega hasta 5...
];

const cajerosData = [
  {
    initials: "RP",
    name: "Rosa Pérez",
    role: "Cajero",
    data: { ventas: 50, monto: 12000, presicion: 98.7 },
  },
  {
    initials: "JC",
    name: "Juan Carlos",
    role: "Cajero",
    data: { ventas: 45, monto: 11000, presicion: 97.3 },
  },
  // Hasta 5...
];

const entregasData = [
  {
    initials: "RM",
    name: "Roberto Martínez",
    role: "Entregas",
    data: { entregas: 65, puntualidad: "98.5%", distancia: "1250 km", satisfechos: 62 },
  },
  {
    initials: "CV",
    name: "Carlos Vega",
    role: "Entregas",
    data: { entregas: 58, puntualidad: "96.6%", distancia: "1180 km", satisfechos: 55 },
  },
  // Hasta 5...
];

const produccionData = [
  {
    initials: "CG",
    name: "Carlos Gómez",
    role: "Producción",
    data: { ordenes: 32, unidades: 850, eficiencia: "98.2%", calidad: "9.8/10" },
  },
  {
    initials: "EJ",
    name: "Elena Jiménez",
    role: "Producción",
    data: { ordenes: 28, unidades: 720, eficiencia: "96.4%", calidad: "9.6/10" },
  },
  // Hasta 5...
];

export default function RecognitionsTabs() {
  return (
    <Tabs defaultValue="vendedores" className="w-full">
      <TabsList className="rounded-md flex w-full">
        <TabsTrigger value="vendedores" className="text-sm font-medium flex-1 text-center">
          Vendedores
        </TabsTrigger>
        <TabsTrigger value="cajeros" className="text-sm font-medium flex-1 text-center">
          Cajeros
        </TabsTrigger>
        <TabsTrigger value="entregas" className="text-sm font-medium flex-1 text-center">
          Entregas
        </TabsTrigger>
        <TabsTrigger value="produccion" className="text-sm font-medium flex-1 text-center">
          Producción
        </TabsTrigger>
      </TabsList>

      <TabsContent value="vendedores">
        {vendedoresData.slice(0, 5).map((item, i) => (
          <RankingCard
            key={i}
            position={i + 1}
            initials={item.initials}
            name={item.name}
            role={item.role}
            area="vendedores"
            data={item.data}
          />
        ))}
      </TabsContent>

      <TabsContent value="cajeros">
        {cajerosData.slice(0, 5).map((item, i) => (
          <RankingCard
            key={i}
            position={i + 1}
            initials={item.initials}
            name={item.name}
            role={item.role}
            area="cajeros"
            data={item.data}
          />
        ))}
      </TabsContent>

      <TabsContent value="entregas">
        {entregasData.slice(0, 5).map((item, i) => (
          <RankingCard
            key={i}
            position={i + 1}
            initials={item.initials}
            name={item.name}
            role={item.role}
            area="entregas"
            data={item.data}
          />
        ))}
      </TabsContent>

      <TabsContent value="produccion">
        {produccionData.slice(0, 5).map((item, i) => (
          <RankingCard
            key={i}
            position={i + 1}
            initials={item.initials}
            name={item.name}
            role={item.role}
            area="produccion"
            data={item.data}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
}
