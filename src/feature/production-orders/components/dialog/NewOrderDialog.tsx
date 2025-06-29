import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Plus, Trash2 } from "lucide-react";

interface ProductRow {
  id: number;
  productId: string;
  quantity: string;
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

export default function NewOrderDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<ProductRow[]>([
    { id: Date.now(), productId: "", quantity: "" },
  ]);
  const [fecha, setFecha] = React.useState<Date | undefined>(undefined);
  const [responsable, setResponsable] = React.useState("");
  const [notas, setNotas] = React.useState("");

  // Fechas ocupadas (formato dd/MM/yyyy)
  const fechasOcupadas = ["24/04/2023", "23/04/2023", "22/04/2023"];

  const handleProductChange = (
    idx: number,
    key: "productId" | "quantity",
    value: string
  ) => {
    setProducts((products) =>
      products.map((prod, i) => (i === idx ? { ...prod, [key]: value } : prod))
    );
  };

  const handleAddProduct = () => {
    setProducts([...products, { id: Date.now(), productId: "", quantity: "" }]);
  };

  const handleRemoveProduct = (idx: number) => {
    setProducts(products.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fecha) return; // Validación: fecha obligatoria
    // Aquí deberías guardar la orden (API, estado, etc.)
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[750px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Crear Nueva Orden de Producción
          </DialogTitle>
        </DialogHeader>
        <div className="text-gray-600 text-sm mb-4">
          Solo se permite una orden por día. Seleccione una fecha futura que no
          tenga órdenes existentes.
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    className={`w-full justify-start text-left font-normal ${!fecha ? "text-muted-foreground" : ""}`}
                  >
                    {fecha ? format(fecha, "dd/MM/yyyy", { locale: es }) : <span>Seleccionar fecha</span>}
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
              <div className="text-xs text-gray-500 mt-1">
                Solo se puede crear una orden por día. Fechas ocupadas:{" "}
                {fechasOcupadas.join(", ")}
              </div>
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
                onClick={handleAddProduct}
              >
                <Plus className="w-4 h-4" /> Añadir Producto
              </Button>
            </div>
            <div className="space-y-2">
              {/* Header de producto/cantidad SOLO una vez */}
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-700 mb-1 pl-1">
                <div className="col-span-6">Producto</div>
                <div className="col-span-4">Cantidad</div>
                <div className="col-span-2"></div>
              </div>
              {products.map((prod, idx) => (
                <div
                  className="grid grid-cols-12 gap-2 items-center"
                  key={prod.id}
                >
                  <div className="col-span-6">
                    <Select
                      value={prod.productId}
                      onValueChange={(value) =>
                        handleProductChange(idx, "productId", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {productOptions.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
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
                      value={prod.quantity}
                      onChange={(e) =>
                        handleProductChange(idx, "quantity", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    {products.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveProduct(idx)}
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
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear Orden</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
