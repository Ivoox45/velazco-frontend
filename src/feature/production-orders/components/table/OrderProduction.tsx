import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import DetailOrderDialog from "../dialog/DetailOrderDialog";
import EditOrderDialog from "../dialog/EditOrderDialog";
import { useGetProductions, useDeleteProduction } from "../../hooks";
import { useState } from "react";
import type { ProductionCreateResponseDto } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// --- Agrega imports de paginación shadcn
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

const ORDERS_PER_PAGE = 8;

export default function OrderProduction() {
  const { data: orders, isLoading, isError, refetch } = useGetProductions();
  const deleteMutation = useDeleteProduction();

  // Dialog detalle y edición
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [ordenSeleccionada, setOrdenSeleccionada] =
    useState<ProductionCreateResponseDto | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [ordenEditar, setOrdenEditar] =
    useState<ProductionCreateResponseDto | null>(null);

  // Dialog de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ordenAEliminar, setOrdenAEliminar] = useState<number | null>(null);

  // --- Estado de paginación
  const [page, setPage] = useState(1);

  // Slice de órdenes para la página actual
  const orderList = orders || [];
  const pageCount = Math.ceil(orderList.length / ORDERS_PER_PAGE);

  // Si cambian los datos y la página actual queda fuera de rango, vuelve a la primera página
  if (page > pageCount && pageCount > 0) setPage(1);

  const paginatedOrders = orderList.slice(
    (page - 1) * ORDERS_PER_PAGE,
    page * ORDERS_PER_PAGE
  );

  // Abrir detalle
  const abrirDetalle = (order: ProductionCreateResponseDto) => {
    setOrdenSeleccionada(order);
    setDetalleOpen(true);
  };

  // Abrir edición
  const abrirEdicion = (order: ProductionCreateResponseDto) => {
    setOrdenEditar(order);
    setEditOpen(true);
  };

  // Abrir confirmación de eliminación
  const pedirConfirmEliminacion = (id: number) => {
    setOrdenAEliminar(id);
    setDeleteDialogOpen(true);
  };

  // Eliminar orden (tras confirmación)
  const eliminarOrden = () => {
    if (ordenAEliminar) {
      deleteMutation.mutate(ordenAEliminar, {
        onSuccess: () => {
          refetch();
          setDeleteDialogOpen(false);
          setOrdenAEliminar(null);
        },
        onError: () => {
          setDeleteDialogOpen(false);
          setOrdenAEliminar(null);
          // puedes mostrar toast.error si quieres
        },
      });
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error cargando órdenes.</div>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Orden</TableHead>
            <TableHead>Fecha de Produccion</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No hay órdenes.
              </TableCell>
            </TableRow>
          ) : (
            paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>OP-{order.id.toString().padStart(6, "0")}</TableCell>
                <TableCell>{order.productionDate}</TableCell>
                <TableCell>
                  {order.details.map((p, idx) => (
                    <span key={p.product.id}>
                      {p.product.name} ({p.requestedQuantity})
                      {idx < order.details.length - 1 && ", "}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => abrirDetalle(order)}
                    >
                      Ver Detalles
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => abrirEdicion(order)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => pedirConfirmEliminacion(order.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* PAGINADOR */}
      {pageCount > 1 && (
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
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
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
                  onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
                  aria-disabled={page === pageCount}
                  className={page === pageCount ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <DetailOrderDialog
        order={ordenSeleccionada}
        open={detalleOpen}
        onClose={setDetalleOpen}
      />
      <EditOrderDialog
        order={ordenEditar}
        open={editOpen}
        onClose={setEditOpen}
        onSave={refetch}
      />

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Cancelar Orden de Producción</DialogTitle>
          </DialogHeader>
          <div className="text-base">
            ¿Estás seguro de que deseas cancelar este pedido? Esta acción no se
            puede deshacer.
          </div>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              No
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={eliminarOrden}
            >
              Sí, cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
