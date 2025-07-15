import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RankingCard from "../cards/RankingCard";

import { useTopVendedores } from "../../hooks/useTopVendedores";
import { useCajerosDelMes } from "../../hooks/useCajerosDelMes";
import { useEntregadoresDelMes } from "../../hooks/useEntregadoresDelMes";
import { useProduccionDelMes } from "../../hooks/useProduccionDelMes";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .substring(0, 2);
}

export default function RecognitionsTabs() {
  const {
    data: vendedores,
    isLoading: loadingV,
    isError: errorV,
  } = useTopVendedores();

  const {
    data: cajeros,
    isLoading: loadingC,
    isError: errorC,
  } = useCajerosDelMes();

  const {
    data: entregadores,
    isLoading: loadingE,
    isError: errorE,
  } = useEntregadoresDelMes();

  const {
    data: produccion,
    isLoading: loadingP,
    isError: errorP,
  } = useProduccionDelMes();

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
        {loadingV ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : errorV ? (
          <div className="p-8 text-center text-red-500">Error cargando ranking.</div>
        ) : (
          vendedores?.slice(0, 5).map((item, i) => (
            <RankingCard
              key={item.id}
              position={i + 1}
              initials={getInitials(item.nombre)}
              name={item.nombre}
              role="Vendedor"
              area="vendedores"
              data={{
                ventas: Math.round(item.ventas ?? 0),
                monto: Math.round(item.monto ?? 0),
                promedio: Math.round(item.promedio ?? 0),
              }}
            />
          ))
        )}
      </TabsContent>

      <TabsContent value="cajeros">
        {loadingC ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : errorC ? (
          <div className="p-8 text-center text-red-500">Error cargando ranking.</div>
        ) : (
          [
            {
              id: 2,
              nombre: "Luis Melchor",
              pedidos: 5,
              total: 50,
            },
            {
              id: 12,
              nombre: "Benji Gutierrez",
              pedidos: 4,
              total: 30,
            },
            {
              id: 13,
              nombre: "Paul Mendoza",
              pedidos: 2,
              total: 25,
            },
          ].map((item, i) => (
            <RankingCard
              key={item.id}
              position={i + 1}
              initials={getInitials(item.nombre)}
              name={item.nombre}
              role="Cajero"
              area="cajeros"
              data={{
                pedidos: Math.round(item.pedidos),
                total: Math.round(item.total),
              }}
            />
          ))
        )}
      </TabsContent>


      <TabsContent value="entregas">
        {loadingE ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : errorE ? (
          <div className="p-8 text-center text-red-500">Error cargando ranking.</div>
        ) : (
          entregadores?.slice(0, 5).map((item, i) => (
            <RankingCard
              key={item.id}
              position={i + 1}
              initials={getInitials(item.nombre)}
              name={item.nombre}
              role="Entregas"
              area="entregas"
              data={{
                entregas: Math.round(item.entregas ?? 0),
                puntualidad: Math.round(item.puntualidad ?? 0),
                distancia: Math.round(item.distancia ?? 0),
              }}
            />
          ))
        )}
      </TabsContent>

      <TabsContent value="produccion">
        {loadingP ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : errorP ? (
          <div className="p-8 text-center text-red-500">Error cargando ranking.</div>
        ) : (
          produccion?.slice(0, 5).map((item, i) => (
            <RankingCard
              key={item.id}
              position={i + 1}
              initials={getInitials(item.nombre)}
              name={item.nombre}
              role="Producción"
              area="produccion"
              data={{
                ordenes: Math.round(item.ordenes ?? 0),
                unidades: Math.round(item.unidades ?? 0),
                eficiencia: Math.round(item.eficiencia ?? 0),
              }}
            />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}
