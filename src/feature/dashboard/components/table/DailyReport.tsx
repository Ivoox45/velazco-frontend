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
import { useDailySales } from "../../hooks/useDailySales";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DailySalePDF } from "../pdf/DailySalePDF";

// Función para saber si la fecha es anterior a hoy (no genera PDF si es hoy)
function isPastDay(dateStr: string) {
  const today = new Date();
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  // Pone la hora en 00:00:00 para ambos
  today.setHours(0,0,0,0);
  date.setHours(0,0,0,0);
  return date < today;
}

export default function DailyReport() {
  const { data, isLoading, isError } = useDailySales();

  if (isLoading) return <div>Cargando reportes...</div>;
  if (isError || !data) return <div>Error al cargar los reportes.</div>;

  // Ordenar por fecha descendente (opcional)
  const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Pedidos</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((sale) => (
            <TableRow key={sale.date}>
              <TableCell>
                {sale.date.split("-").reverse().join("/")}
              </TableCell>
              <TableCell className="font-semibold">
                S/.{sale.totalSales.toFixed(2)}
              </TableCell>
              <TableCell>
                {/* Total de productos vendidos en el día */}
                {sale.products.reduce((sum, p) => sum + p.quantitySold, 0)}
              </TableCell>
              <TableCell>
                {isPastDay(sale.date) && (
                  <PDFDownloadLink
                    document={<DailySalePDF sale={sale} />}
                    fileName={`reporte-ventas-${sale.date}.pdf`}
                    className="inline-flex"
                  >
                    {({ loading }) => (
                      <Button variant="outline" size="sm" disabled={loading}>
                        <Download className="mr-2 h-4 w-4" />
                        {loading ? "Generando..." : "PDF"}
                      </Button>
                    )}
                  </PDFDownloadLink>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
