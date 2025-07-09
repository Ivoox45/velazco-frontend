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
          <TableRow className="">
            <TableHead className="min-w-[200px] font-semibold py-4 text-base">
              Producto
            </TableHead>
            <TableHead className=" font-semibold py-4 text-base">
              Cantidad
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-8 ">
                No hay productos para mostrar.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, idx) => (
              <TableRow
                key={idx}
                className="border-b last:border-0"
              >
                <TableCell className="py-5">
                  <div className="font-semibold text-[17px] leading-tight mb-0.5">
                    {order.producto}
                  </div>
                  {order.subtitulo && (
                    <div className="text-xs mt-1 leading-tight">
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
