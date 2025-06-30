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
  orders: ProductOrder[];
};

export default function ProductionTable({ orders }: ProductionTableProps) {
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
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-8 text-gray-400">
                No hay productos para mostrar.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, idx) => (
              <TableRow
                key={idx}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
