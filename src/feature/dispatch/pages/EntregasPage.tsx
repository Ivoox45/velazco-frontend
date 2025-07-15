import { useState, useEffect } from "react";
import DispatchSearchInput from "../components/input/DispatchSearchInput";
import DispatchTabs, {
  type EstadoDespacho,
} from "../components/tabs/DispatchTabs";
import DispatchCard from "../components/cards/DispatchCard";
import useGetDispatchedOrders from "../hooks/useGetDispatchedOrders";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import startTourEntregas from "../../../tours/startTourEntregas"; // <- ¡importa aquí!

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

  // -- REGISTRA EL TOUR GLOBAL --
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.startTour_entregas = (tab: string) =>
        startTourEntregas(tab || estado);
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.startTour_entregas;
      }
    };
  }, [estado]);
  // -----------------------------

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
          <DispatchSearchInput
            value={search}
            onChange={setSearch}
            className="search-entrega-driver"
          />
        </div>
        <div className="w-full">
          <DispatchTabs
            status={estado}
            onChange={(nuevoEstado) => {
              setEstado(nuevoEstado);
              setPage(0);
            }}
            className="tabs-entrega-driver"
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="mt-4 space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {ordenesFiltradas.map((orden, idx) => {
              let orderClass = "";
              let btnClass = "";
              if (idx === 0) {
                if (estado === "PAGADO") {
                  orderClass = "order-entrega-driver";
                  btnClass = "confirm-entrega-driver";
                }
                if (estado === "ENTREGADO") {
                  orderClass = "order-entregado-driver";
                  btnClass = "details-entregado-driver";
                }
              }
              return (
                <div key={orden.id} className={orderClass}>
                  <DispatchCard order={orden} confirmBtnClass={btnClass} />
                </div>
              );
            })}

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
