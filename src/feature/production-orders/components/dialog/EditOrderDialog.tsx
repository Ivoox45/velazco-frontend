import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Plus, Trash2 } from "lucide-react";
import type { Orden, Producto } from "../../types";

// Helpers
function parseFecha(fechaStr: string): Date {
  const [day, month, year] = fechaStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

const productOptions = [
  { id: "cheesecake", name: "Cheesecake" },
  { id: "galletas", name: "Galletas" },
  { id: "torta_chocolate", name: "Torta de Chocolate" },
  { id: "cupcakes_vainilla", name: "Cupcakes de Vainilla" },
  { id: "brownies", name: "Brownies" },
  { id: "alfajores", name: "Alfajores" },
];

const responsableOptions = [
  { id: "resp1", name: "Juan Pérez" },
  { id: "resp2", name: "Ana Gómez" },
  { id: "resp3", name: "María López" },
];

interface EditOrderDialogProps {
  open: boolean;
  order: Orden | null;
  onClose: (open: boolean) => void;
  onSave: (orderEditado: Orden) => void;
}

export default function EditOrderDialog({
  open,
  order,
  onClose,
  onSave,
}: EditOrderDialogProps) {
  const [fecha, setFecha] = React.useState<Date | undefined>(undefined);
  const [responsable, setResponsable] = React.useState("");
  const [productos, setProductos] = React.useState<Producto[]>([]);
  const [notas, setNotas] = React.useState("");

  // Sincroniza con la orden
  React.useEffect(() => {
    if (order) {
      setFecha(order.fecha ? parseFecha(order.fecha) : undefined);
      setResponsable(order.responsable || "");
      setProductos(order.productos ? order.productos.map((p) => ({ ...p })) : []);
      setNotas(order.notas || "");
    }
  }, [order]);

  // Fechas ocupadas (sin la actual para permitir editar)
  const fechasOcupadas = ["24/04/2023", "23/04/2023", "22/04/2023"].filter(
    (f) => f !== order?.fecha
  );

  if (!order) return null;

  // Handlers
  const handleProductoChange = (
    idx: number,
    key: "nombre" | "cantidad",
    value: any
  ) => {
    setProductos((productos) =>
      productos.map((prod, i) =>
        i === idx
          ? { ...prod, [key]: key === "cantidad" ? Number(value) : value }
          : prod
      )
    );
  };

  const handleAddProducto = () => {
    setProductos([...productos, { nombre: "", cantidad: 1 }]);
  };

  const handleRemoveProducto = (idx: number) => {
    setProductos(productos.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha) return;
    const fechaString = format(fecha, "dd/MM/yyyy");
    onSave({
      ...order,
      fecha: fechaString,
      responsable,
      productos,
      notas,
    });
    onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[750px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Editar Orden de Producción
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Fecha y Responsable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Fecha Requerida
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !fecha ? "text-muted-foreground" : ""
                    }`}
                  >
                    {fecha ? (
                      format(fecha, "dd/MM/yyyy", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fecha}
                    onSelect={setFecha}
                    locale={es}
                    fromDate={new Date()}
                    disabled={(date) =>
                      fechasOcupadas.includes(format(date, "dd/MM/yyyy"))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Responsable
              </label>
              <Select value={responsable} onValueChange={setResponsable}>
                <SelectTrigger>
                  <SelectValue placeholder="Asignar responsable" />
                </SelectTrigger>
                <SelectContent>
                  {responsableOptions.map((r) => (
                    <SelectItem key={r.id} value={r.name}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Productos */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm">Productos</span>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1 px-2 py-1 h-8 text-sm"
                onClick={handleAddProducto}
              >
                <Plus className="w-4 h-4" /> Añadir Producto
              </Button>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-700 mb-1 pl-1">
                <div className="col-span-6">Producto</div>
                <div className="col-span-4">Cantidad</div>
                <div className="col-span-2"></div>
              </div>
              {productos.map((prod, idx) => (
                <div className="grid grid-cols-12 gap-2 items-center" key={idx}>
                  <div className="col-span-6">
                    <Select
                      value={prod.nombre}
                      onValueChange={(value) =>
                        handleProductoChange(idx, "nombre", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {productOptions.map((p) => (
                          <SelectItem key={p.id} value={p.name}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-4">
                    <Input
                      type="number"
                      placeholder="Cantidad"
                      min={1}
                      className="w-full"
                      value={prod.cantidad}
                      onChange={(e) =>
                        handleProductoChange(idx, "cantidad", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    {productos.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveProducto(idx)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Notas o Instrucciones Especiales
            </label>
            <Textarea
              placeholder="Añadir notas o instrucciones especiales para la producción..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
