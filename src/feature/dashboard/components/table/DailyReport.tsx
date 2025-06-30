import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const dailyReportData = [
  {
    fecha: "24/04/2023",
    reporte: "Ventas diarias",
    total: "$4,231.89",
    pedidos: 42,
    estado: "Disponible",
  },
  {
    fecha: "23/04/2023",
    reporte: "Ventas diarias",
    total: "$3,521.50",
    pedidos: 37,
    estado: "Disponible",
  },
  {
    fecha: "22/04/2023",
    reporte: "Ventas diarias",
    total: "$3,982.25",
    pedidos: 40,
    estado: "Disponible",
  },
  {
    fecha: "21/04/2023",
    reporte: "Ventas diarias",
    total: "$3,756.10",
    pedidos: 38,
    estado: "Disponible",
  },
  {
    fecha: "20/04/2023",
    reporte: "Ventas diarias",
    total: "$4,102.75",
    pedidos: 41,
    estado: "Disponible",
  },
];

export default function DailyReport() {
  return (
    <div className="overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Reporte</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Pedidos</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dailyReportData.map(({ fecha, reporte, total, pedidos, estado }, index) => (
            <TableRow key={index}>
              <TableCell>{fecha}</TableCell>
              <TableCell>{reporte}</TableCell>
              <TableCell className="font-semibold">{total}</TableCell>
              <TableCell>{pedidos}</TableCell>
              <TableCell>
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {estado}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Descargando PDF del reporte del ${fecha}`)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
