import { Badge } from "@/components/ui/badge";
import { CalendarDays, Bookmark } from "lucide-react";
import { RecognitionsTabs } from "../components/tabs";

export default function RankingsHeader() {
  const fechaActual = new Date().toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
  });
  const fechaCapitalizada =
    fechaActual.charAt(0).toUpperCase() + fechaActual.slice(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bookmark className="w-10 h-10 text-indigo-600" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold ">Rankings por Área</h1>
            <p className="text-sm text-gray-600 dark:text-gray-100">
              Mejores empleados de cada departamento
            </p>
          </div>
        </div>

        <Badge className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2">
          {fechaCapitalizada}
          <CalendarDays className="w-5 h-5" />
        </Badge>
      </div>

      <RecognitionsTabs />
    </div>
  );
}
