import { useState } from "react";
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
import DetailOrderDialog from "../dialog/DetailOrderDialog";
import type { Orden } from "../../types"; // <-- usa tu archivo central

// --- Datos de ejemplo ---
const DATA: Orden[] = [
  {
    numero: "OP-2023-044",
    creacion: "24/04/2023",
    fecha: "25/04/2023",
    responsable: "Carlos Gómez",
    estado: "Completada",
    productos: [
      { nombre: "Pan de Banana", cantidad: 15 },
      { nombre: "Alfajores", cantidad: 40 },
    ],
  },
  {
    numero: "OP-2023-043",
    creacion: "23/04/2023",
    fecha: "26/04/2023",
    responsable: "Carlos Gómez",
    estado: "Completada",
    productos: [
      { nombre: "Cheesecake", cantidad: 8 },
      { nombre: "Cupcakes", cantidad: 48 },
    ],
  },
  // ...otros datos
];

const PAGE_SIZE = 5;

export default function HistoryProduction() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Orden | null>(null);

  const totalPages = Math.ceil(DATA.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const currentData = DATA.slice(startIdx, endIdx);

  const handleOpenDetail = (order: Orden) => {
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
            <TableRow key={row.numero}>
              <TableCell>{row.numero}</TableCell>
              <TableCell>{row.creacion}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>
                {row.productos.map((p, i) => (
                  <span key={p.nombre}>
                    {p.nombre} ({p.cantidad})
                    {i < row.productos.length - 1 && ", "}
                  </span>
                ))}
              </TableCell>
              <TableCell>{row.responsable}</TableCell>
              <TableCell>
                <Badge
                  variant="estado_activo"
                  className="rounded-full bg-green-100 text-green-700 px-4 py-1 font-medium"
                >
                  {row.estado}
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

      {/* Modal de Detalle */}
      <DetailOrderDialog order={selectedOrder} open={open} onClose={setOpen} />
    </div>
  );
}
