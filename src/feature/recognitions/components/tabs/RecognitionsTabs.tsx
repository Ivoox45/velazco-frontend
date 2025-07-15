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
                ventas: item.ventas,
                monto: item.monto,
                promedio: item.promedio,
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
          cajeros?.slice(0, 5).map((item, i) => (
            <RankingCard
              key={item.id}
              position={i + 1}
              initials={getInitials(item.nombre)}
              name={item.nombre}
              role="Cajero"
              area="cajeros"
              data={{
                pedidos: item.pedidos,
                total: item.total,
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
                entregas: item.entregas,
                puntualidad: item.puntualidad,
                distancia: item.distancia,
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
                ordenes: item.ordenes,
                unidades: item.unidades,
                eficiencia: item.eficiencia,
              }}
            />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}
