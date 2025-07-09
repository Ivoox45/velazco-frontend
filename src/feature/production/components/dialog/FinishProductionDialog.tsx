import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { ProductForFinish, ProductoForm } from "../../types";

type FinishProductionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFinish: (data: ProductoForm[]) => void;
  onCancel: () => void;
  products: ProductForFinish[];
  instrucciones?: string;
  loading?: boolean;
};

export default function FinishProductionDialog({
  open,
  onOpenChange,
  onFinish,
  onCancel,
  products,
  instrucciones = "",
  loading = false,
}: FinishProductionDialogProps) {
  const [resultados, setResultados] = useState<ProductoForm[]>(
    products.map((p) => ({
      estado: "COMPLETADO",
      cantidadProducida: p.cantidad,
      motivo: "",
    }))
  );

  useEffect(() => {
    if (open) {
      setResultados(
        products.map((p) => ({
          estado: "COMPLETADO",
          cantidadProducida: p.cantidad,
          motivo: "",
        }))
      );
    }
  }, [open, products]);

  const esValido = resultados.every((r, i) => {
    if (r.estado === "COMPLETADO") return true;
    return (
      r.cantidadProducida > 0 &&
      r.cantidadProducida < products[i].cantidad &&
      r.motivo.trim().length > 0
    );
  });

  // Resumen
  const completados = resultados.filter(
    (r) => r.estado === "COMPLETADO"
  ).length;
  const incompletos = resultados.length - completados;
  const totalProducido = resultados.reduce(
    (acc, r) => acc + (r.cantidadProducida || 0),
    0
  );
  const totalSolicitado = products.reduce((acc, p) => acc + p.cantidad, 0);
  const eficiencia =
    totalSolicitado === 0
      ? 0
      : Math.round((totalProducido / totalSolicitado) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[750px] max-h-[97vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold">
            Finalizar Orden de Producción
          </DialogTitle>
          <DialogDescription className="text-[15px] md:text-[16px] text-gray-600 dark:text-gray-300 mt-0 mb-2">
            Especifique el resultado de cada producto
          </DialogDescription>
        </DialogHeader>
        {/* Instrucciones */}
        <div
          className="
          bg-blue-50 text-blue-900 rounded-md px-2 md:px-4 py-2 font-normal mb-5 text-[14px] md:text-[15px]
          dark:bg-blue-950 dark:text-blue-100 dark:border dark:border-blue-900
        "
        >
          <span className="font-semibold">Instrucciones de la orden:</span>
          <span> {instrucciones}</span>
        </div>
        {/* Productos */}
        <div className="space-y-6">
          {products.map((p, idx) => {
            const form = resultados[idx] || {
              estado: "COMPLETADO",
              cantidadProducida: p.cantidad,
              motivo: "",
            };
            return (
              <div
                key={idx}
                className="
                  rounded-md border border-gray-200 dark:border-neutral-800 p-3 md:p-4
                  bg-gray-50 dark:bg-neutral-900
                "
              >
                <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                  <span className="font-semibold text-[16px] md:text-[17px] text-gray-900 dark:text-gray-100">
                    {p.producto}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                    Solicitado: {p.cantidad} unidades
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                  {/* Estado */}
                  <div>
                    <div className="font-semibold mb-1 text-[15px] md:text-base text-gray-900 dark:text-gray-100">
                      Estado del producto
                    </div>
                    <div className="flex items-center gap-3 md:gap-5">
                      <label className="flex items-center gap-1 cursor-pointer text-[14px] md:text-base text-gray-800 dark:text-gray-100">
                        <input
                          type="radio"
                          name={`estado-${idx}`}
                          checked={form.estado === "COMPLETADO"}
                          onChange={() =>
                            setResultados((r) =>
                              r.map((x, j) =>
                                j === idx
                                  ? {
                                      ...x,
                                      estado: "COMPLETADO",
                                      cantidadProducida: p.cantidad,
                                      motivo: "",
                                    }
                                  : x
                              )
                            )
                          }
                        />
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Completado
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer text-[14px] md:text-base text-gray-800 dark:text-gray-100">
                        <input
                          type="radio"
                          name={`estado-${idx}`}
                          checked={form.estado === "INCOMPLETO"}
                          onChange={() =>
                            setResultados((r) =>
                              r.map((x, j) =>
                                j === idx
                                  ? {
                                      ...x,
                                      estado: "INCOMPLETO",
                                      cantidadProducida:
                                        p.cantidad > 1 ? p.cantidad - 1 : 0,
                                    }
                                  : x
                              )
                            )
                          }
                        />
                        <XCircle className="w-4 h-4 text-red-600" />
                        Incompleto
                      </label>
                    </div>
                  </div>
                  {/* Cantidad producida */}
                  {form.estado === "INCOMPLETO" && (
                    <div className="md:ml-auto flex flex-col w-full md:w-auto md:items-end">
                      <div className="font-semibold mb-1 text-[15px] md:text-base text-gray-900 dark:text-gray-100">
                        Cantidad producida
                      </div>
                      <input
                        type="number"
                        className="border rounded px-3 py-1 w-full md:w-32 text-[15px] md:text-base bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-neutral-700"
                        min={0}
                        max={p.cantidad - 1}
                        value={form.cantidadProducida}
                        onChange={(e) =>
                          setResultados((r) =>
                            r.map((x, j) =>
                              j === idx
                                ? {
                                    ...x,
                                    cantidadProducida: Math.max(
                                      0,
                                      Math.min(
                                        Number(e.target.value) || 0,
                                        p.cantidad - 1
                                      )
                                    ),
                                  }
                                : x
                            )
                          )
                        }
                      />
                    </div>
                  )}
                </div>
                {/* Motivo */}
                {form.estado === "INCOMPLETO" && (
                  <div className="w-full mt-4">
                    <div className="font-semibold mb-1 text-[15px] md:text-base text-gray-900 dark:text-gray-100">
                      Motivo de producción incompleta *
                    </div>
                    <textarea
                      className="border rounded px-3 py-2 w-full text-[14px] md:text-[15px] resize-none bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-neutral-700"
                      placeholder="Ej: Falta de materia prima, problemas con el equipo, etc."
                      rows={2}
                      value={form.motivo}
                      onChange={(e) =>
                        setResultados((r) =>
                          r.map((x, j) =>
                            j === idx ? { ...x, motivo: e.target.value } : x
                          )
                        )
                      }
                      required
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Resumen final */}
        <div className="mt-8 mb-2">
          <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg px-3 md:px-6 py-3 md:py-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-[14px] md:text-[15px] items-center">
            <div>
              <div className="font-semibold text-green-700">Completados</div>
              <div>
                {completados} producto{completados !== 1 && "s"}
              </div>
            </div>
            <div>
              <div className="font-semibold text-orange-700">Incompletos</div>
              <div>
                {incompletos} producto{incompletos !== 1 && "s"}
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                Total Producido
              </div>
              <div>
                {totalProducido}/{totalSolicitado} unidades
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                Eficiencia
              </div>
              <div>{eficiencia}%</div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <DialogFooter className="mt-6 flex flex-row gap-2 justify-end">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            disabled={!esValido || loading}
            onClick={() => {
              onFinish(resultados);
              toast.success("¡Orden de producción finalizada con éxito! 🎉");
            }}
          >
            {loading ? "Finalizando..." : "Finalizar Orden"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
