import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Orden } from "../../types";

interface DetailOrderDialogProps {
  order: Orden | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function DetailOrderDialog({ order, open, onClose }: DetailOrderDialogProps) {
  if (!order) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Detalles de Orden de Producción</DialogTitle>
          <div className="text-gray-400 text-sm font-normal">Orden {order.numero}</div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 mt-2">
          <div>
            <div className="font-medium text-sm mb-1">Información General</div>
            <div className="text-sm text-gray-700">
              <div>Fecha de creación: {order.creacion}</div>
              <div>Fecha requerida: {order.fecha}</div>
              <div>Prioridad: {order.prioridad}</div>
              <div>Responsable: {order.responsable}</div>
            </div>
          </div>
          <div>
            <div className="font-medium text-sm mb-1">Estado de la Orden</div>
            <div className="text-sm text-gray-700">
              <div>Estado actual: {order.estado}</div>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <div className="mb-2">
          <div className="bg-gray-50 border rounded text-center py-1 text-base font-medium">
            Productos
          </div>
        </div>
        <div className="border rounded overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 border-b px-4 py-2 text-sm font-semibold">
            <div className="col-span-8">Producto</div>
            <div className="col-span-4 text-right">Cantidad</div>
          </div>
          {order.productos.map((prod, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 items-center border-b last:border-0 px-4 py-3 text-base bg-white"
            >
              <div className="col-span-8">{prod.nombre}</div>
              <div className="col-span-4 text-right">
                {prod.cantidad} {prod.unidad || ""}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Button type="button" variant="outline" onClick={() => onClose(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
