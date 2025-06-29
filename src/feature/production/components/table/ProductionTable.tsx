// src/production/components/table/ProductionTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProductOrder } from "../../types";

type ProductionTableProps = {
  orders?: ProductOrder[];
};

const sampleOrders: ProductOrder[] = [
  {
    producto: "Torta de Chocolate",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "10 unidades",
  },
  {
    producto: "Galletas de Avena",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "120 unidades",
  },
  {
    producto: "Brownies",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "30 unidades",
  },
  {
    producto: "Alfajores",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "50 unidades",
  },
  {
    producto: "Cheesecake",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "8 unidades",
  },
  {
    producto: "Cupcakes de Vainilla",
    subtitulo: "Orden #OP-2023-042",
    cantidad: "48 unidades",
  },
];

export default function ProductionTable({ orders }: ProductionTableProps) {
  const data = orders && orders.length > 0 ? orders : sampleOrders;

  return (
    <div className="overflow-x-auto px-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="min-w-[200px] text-gray-700 font-semibold py-4 text-base">
              Producto
            </TableHead>
            <TableHead className="text-gray-700 font-semibold py-4 text-base">
              Cantidad
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order, idx) => (
            <TableRow key={idx} className="border-b last:border-0 hover:bg-gray-50 transition">
              <TableCell className="py-5">
                <div className="font-semibold text-[17px] leading-tight mb-0.5">
                  {order.producto}
                </div>
                {order.subtitulo && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight">
                    {order.subtitulo}
                  </div>
                )}
              </TableCell>
              <TableCell className="py-5 align-middle text-[16px]">
                {order.cantidad}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
