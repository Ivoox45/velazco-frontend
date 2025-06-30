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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DetailOrderDialog } from "../dialog";
import { useState } from "react";
import type { ProductionHistoryResponseDto } from "../../types";

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
            <TableHead>Fecha Requerida</TableHead>
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
              <TableCell>{row.date}</TableCell>
              <TableCell>
                {row.products.map((p, i) => (
                  <span key={p.productName}>
                    {p.productName} ({p.quantity})
                    {i < row.products.length - 1 && ", "}
                  </span>
                ))}
              </TableCell>
              <TableCell>{row.responsible}</TableCell>
              <TableCell>
                <Badge
                  variant="estado_activo"
                  className="rounded-full bg-green-100 text-green-700 px-4 py-1 font-medium"
                >
                  {row.status}
                </Badge>
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

      {/* Paginación */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-3 px-2">
        <span className="text-sm text-gray-600">
          Página {page} de {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="flex items-center gap-1"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <DetailOrderDialog order={selectedOrder} open={open} onClose={setOpen} />
    </div>
  );
}
