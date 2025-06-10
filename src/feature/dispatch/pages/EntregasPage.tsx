import { useState } from "react";
import DispatchSearchInput from "../components/input/DispatchSearchInput";
import DispatchTabs, {
  type EstadoDespacho,
} from "../components/tabs/DispatchTabs";
import DispatchCard from "../components/cards/DispatchCard";
import useGetDispatchedOrders from "../hooks/useGetDispatchedOrders";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function EntregasPage() {
  const [estado, setEstado] = useState<EstadoDespacho>("PAGADO");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const esEstadoFiltrable = estado !== "TODOS";

  const { data, isLoading } = useGetDispatchedOrders(
    estado as "PAGADO" | "ENTREGADO",
    page,
    10,
    esEstadoFiltrable
  );

  const ordenes = esEstadoFiltrable ? data?.content || [] : [];

  const ordenesFiltradas = ordenes.filter((orden) =>
    orden.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && data && newPage < data.totalPages) {
      setPage(newPage);
    }
  };

  const CardSkeleton = () => (
    <div className="border rounded-md p-4 space-y-2 w-full">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-28 mt-2" />
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      {/* Filtros */}
      <div className="flex flex-col gap-2">
        <div className="w-full sm:max-w-[250px]">
          <DispatchSearchInput value={search} onChange={setSearch} />
        </div>

        <div className="w-full">
          <DispatchTabs
            status={estado}
            onChange={(nuevoEstado) => {
              setEstado(nuevoEstado);
              setPage(0); // Reiniciar paginación
            }}
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="mt-4 space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {ordenesFiltradas.map((orden) => (
              <DispatchCard key={orden.id} order={orden} />
            ))}

            {ordenesFiltradas.length > 0 && data && data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                >
                  Anterior
                </Button>
                <span className="text-sm">
                  Página {page + 1} de {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page + 1 >= data.totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
