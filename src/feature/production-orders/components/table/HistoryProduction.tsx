import { useGetProductionHistory } from "../../hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DetailHistoryDialog } from "../dialog";
import { useState } from "react";
import type { ProductionHistoryResponseDto } from "../../types";

// --- Importa paginación de shadcn
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

const PAGE_SIZE = 5;

export default function HistoryProduction() {
  const { data, isLoading, isError } = useGetProductionHistory();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] =
    useState<ProductionHistoryResponseDto | null>(null);

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error cargando historial.</div>;

  const totalPages = Math.ceil((data?.length || 0) / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const currentData = (data || []).slice(startIdx, endIdx);

  // Si cambian los datos y la página actual queda fuera de rango, vuelve a la primera página
  if (page > totalPages && totalPages > 0) setPage(1);

  const handleOpenDetail = (order: ProductionHistoryResponseDto) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Orden</TableHead>
            <TableHead>Fecha Creación</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row) => (
            <TableRow key={row.orderNumber}>
              <TableCell>{row.orderNumber}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                {row.products.map((p, i) => (
                  <span key={p.productName}>
                    {p.productName} ({p.requestedQuantity})
                    {i < row.products.length - 1 && ", "}
                  </span>
                ))}
              </TableCell>
              <TableCell>{row.responsible}</TableCell>
              <TableCell>
                {row.status === "COMPLETO" ? (
                  <Badge className="rounded-full bg-green-100 text-green-700 px-4 py-1 font-medium">
                    {row.status}
                  </Badge>
                ) : row.status === "INCOMPLETO" ? (
                  <Badge className="rounded-full bg-orange-100 text-orange-700 px-4 py-1 font-medium">
                    {row.status}
                  </Badge>
                ) : (
                  <Badge className="rounded-full bg-gray-100 text-gray-700 px-4 py-1 font-medium">
                    {row.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenDetail(row)}
                >
                  Ver Detalles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginación shadcn */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  aria-disabled={page === 1}
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={page === p}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  aria-disabled={page === totalPages}
                  className={page === totalPages ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <DetailHistoryDialog
        order={selectedOrder}
        open={open}
        onClose={setOpen}
      />
    </div>
  );
}
