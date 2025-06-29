import { useState } from "react";
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
import type { Orden } from "../../types"; // <-- centralízalo

// --- Datos de ejemplo iniciales ---
const INITIAL_ORDERS: Orden[] = [
  {
    numero: "OP-2023-045",
    creacion: "24/04/2023",
    fecha: "25/04/2023",
    prioridad: "Alta",
    responsable: "Juan Pérez",
    estado: "Pendiente",
    productos: [
      { nombre: "Torta de Chocolate", cantidad: 5, unidad: "unidades" },
      { nombre: "Cupcakes de Vainilla", cantidad: 24, unidad: "unidades" },
    ],
  },
  {
    numero: "OP-2023-046",
    creacion: "24/04/2023",
    fecha: "26/04/2023",
    prioridad: "Media",
    responsable: "Ana Gómez",
    estado: "Pendiente",
    productos: [
      { nombre: "Cheesecake", cantidad: 8, unidad: "unidades" },
      { nombre: "Galletas", cantidad: 100, unidad: "unidades" },
    ],
  },
  {
    numero: "OP-2023-047",
    creacion: "24/04/2023",
    fecha: "27/04/2023",
    prioridad: "Baja",
    responsable: "María López",
    estado: "Pendiente",
    productos: [
      { nombre: "Brownies", cantidad: 30, unidad: "unidades" },
      { nombre: "Alfajores", cantidad: 50, unidad: "unidades" },
    ],
  },
];

export default function OrderProduction() {
  const [orders, setOrders] = useState<Orden[]>(INITIAL_ORDERS);

  // Para detalle
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null);

  // Para edición
  const [editOpen, setEditOpen] = useState(false);
  const [ordenEditar, setOrdenEditar] = useState<Orden | null>(null);

  // Abrir detalle
  const abrirDetalle = (order: Orden) => {
    setOrdenSeleccionada(order);
    setDetalleOpen(true);
  };

  // Abrir edición
  const abrirEdicion = (order: Orden) => {
    setOrdenEditar(order);
    setEditOpen(true);
  };

  // Guardar edición
  const guardarEdicion = (ordenEditada: Orden) => {
    setOrders((prev) =>
      prev.map((o) => (o.numero === ordenEditada.numero ? ordenEditada : o))
    );
    setEditOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Orden</TableHead>
            <TableHead>Fecha Creación</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.numero}>
              <TableCell>{order.numero}</TableCell>
              <TableCell>{order.creacion}</TableCell>
              <TableCell>{order.fecha}</TableCell>
              <TableCell>
                {order.productos.map((p, idx) => (
                  <span key={p.nombre}>
                    {p.nombre} ({p.cantidad})
                    {idx < order.productos.length - 1 && ", "}
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
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de Detalle */}
      <DetailOrderDialog
        order={ordenSeleccionada}
        open={detalleOpen}
        onClose={setDetalleOpen}
      />

      {/* Modal de Edición */}
      <EditOrderDialog
        order={ordenEditar}
        open={editOpen}
        onClose={setEditOpen}
        onSave={guardarEdicion}
      />
    </div>
  );
}
