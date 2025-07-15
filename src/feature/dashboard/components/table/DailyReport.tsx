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
import { DailySalePDF } from "../pdf/DailySalePDF";
import { getOrGeneratePdfBlob } from "@/utils/pdfCache";
import { useState } from "react";

// Función para saber si la fecha es anterior a hoy (no genera PDF si es hoy)
function isPastDay(dateStr: string) {
  const today = new Date();
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  today.setHours(0,0,0,0);
  date.setHours(0,0,0,0);
  return date < today;
}

// Botón que cachea y descarga el PDF
function SavePdfButton({ sale, fileName }: { sale: any; fileName: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await getOrGeneratePdfBlob(sale.date, <DailySalePDF sale={sale} />);
      const url = URL.createObjectURL(blob);

      // Forzar descarga
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();

      // Limpiar la URL al poco tiempo (para liberar memoria)
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleDownload} disabled={loading}>
      <Download className="mr-2 h-4 w-4" />
      {loading ? "Generando..." : "PDF"}
    </Button>
  );
}

export default function DailyReport() {
  const { data, isLoading, isError } = useDailySales();

  if (isLoading) return <div>Cargando reportes...</div>;
  if (isError || !data) return <div>Error al cargar los reportes.</div>;

  // Ordenar por fecha descendente (opcional)
  const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="overflow-auto rounded-md border reporte-table">
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
                {sale.products.reduce((sum, p) => sum + p.quantitySold, 0)}
              </TableCell>
              <TableCell>
                {isPastDay(sale.date) && (
                  <SavePdfButton
                    sale={sale}
                    fileName={`reporte-ventas-${sale.date}.pdf`}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
