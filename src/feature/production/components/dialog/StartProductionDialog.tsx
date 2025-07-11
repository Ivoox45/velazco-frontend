import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { StartProduct } from "../../types";

type StartProductionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: () => void;
  onCancel: () => void;
  products?: StartProduct[];
  loading?: boolean;
};

export default function StartProductionDialog({
  open,
  onOpenChange,
  onStart,
  onCancel,
  products = [],
  loading = false,
}: StartProductionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-bold">
            Iniciar Producción de Orden
          </DialogTitle>
          <DialogDescription className="text-[15px] text-gray-600 mt-0 mb-2">
            Confirmar inicio de producción para todos los productos
          </DialogDescription>
        </DialogHeader>
        <div className="bg-blue-50 rounded-md px-4 py-3 mb-4 border border-blue-100">
          <div className="mb-2 font-medium text-[15px] text-blue-900">
            Al iniciar la producción, todos los productos pasarán al estado{" "}
            <span className="font-semibold">"En Producción"</span>:
          </div>
          <ul className="divide-y divide-blue-100">
            {products.map((item, idx) => (
              <li
                key={idx}
                className="flex flex-row justify-between items-start py-2"
              >
                <span className="font-medium text-[16px] text-blue-900">
                  {item.producto}
                </span>
                <span className="flex flex-col items-end justify-center min-h-[40px]">
                  <span className="flex text-[16px] text-blue-900 leading-tight">
                    {item.cantidad}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-2 text-[15px] mb-1">
          <span className="font-bold text-yellow-800">Importante: </span>
          <span className="text-yellow-900">
            Una vez iniciada la producción, podrá finalizar la orden cuando
            todos los productos estén listos, indicando cuáles se completaron y
            cuáles no.
          </span>
        </div>
        <DialogFooter className="mt-2 flex flex-row gap-2 justify-end">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            onClick={onStart}
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Iniciar Producción"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
