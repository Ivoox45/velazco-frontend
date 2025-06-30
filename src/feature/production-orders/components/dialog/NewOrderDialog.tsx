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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { ProductionCreateRequestDto } from "../../types";
import { useGetAvailableProducts } from "../../hooks";
import { useCreateProduction } from "../../hooks";

const responsableOptions = [{ id: 1, name: "Administrador" }];

export default function NewOrderDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<
    { productId: number | ""; quantity: number | "" }[]
  >([{ productId: "", quantity: "" }]);
  const [fecha, setFecha] = React.useState<Date | undefined>(undefined);
  const [responsable, setResponsable] = React.useState("");
  const [notas, setNotas] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const { data: productCatalog, isLoading: loadingProducts } =
    useGetAvailableProducts();
  const createMutation = useCreateProduction();

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleProductChange = (
    idx: number,
    key: "productId" | "quantity",
    value: string | number
  ) => {
    setProducts((prev) =>
      prev.map((prod, i) =>
        i === idx
          ? {
              ...prod,
              [key]: value === "" ? "" : Number(value),
            }
          : prod
      )
    );
  };

  const handleAddProduct = () => {
    if (products.length >= 4) return; // máximo 4 productos
    setProducts([...products, { productId: "", quantity: "" }]);
  };

  const handleRemoveProduct = (idx: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== idx));
    }
  };

  const selectedProductIds = products
    .map((p) => p.productId)
    .filter((id): id is number => typeof id === "number");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fecha) return setError("Debe seleccionar una fecha.");
    if (!responsable) return setError("Debe seleccionar un responsable.");
    if (notas.trim().length === 0)
      return setError("Las notas son obligatorias.");
    if (
      products.some(
        (p) =>
          !p.productId ||
          !p.quantity ||
          Number.isNaN(Number(p.productId)) ||
          Number.isNaN(Number(p.quantity)) ||
          Number(p.quantity) < 1
      )
    )
      return setError("Debes seleccionar productos y cantidades válidas.");

    const payload: ProductionCreateRequestDto = {
      productionDate: format(fecha, "yyyy-MM-dd"),
      assignedToId: Number(responsable),
      status: "PENDIENTE",
      details: products.map((p) => ({
        productId: Number(p.productId),
        requestedQuantity: Number(p.quantity),
        comments: notas,
      })),
    };

    setError(null);
    createMutation.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        setProducts([{ productId: "", quantity: "" }]);
        setFecha(undefined);
        setResponsable("");
        setNotas("");
        setError(null);
        toast.success("Orden creada correctamente 🎉");
      },
      onError: (_err) => {
        setError("Error al crear la orden. Intenta nuevamente." + _err);
        toast.error("Error al crear la orden");
      },
    });
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
          {error && (
            <div className="text-red-600 bg-red-100 border border-red-300 p-2 rounded text-sm">
              {error}
            </div>
          )}

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
                    disabled={isPastDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Responsable
              </label>
              <Select value={responsable} onValueChange={setResponsable}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Asignar responsable" />
                </SelectTrigger>
                <SelectContent>
                  {responsableOptions.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {products.length < 4 && (
            <div className="mb-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1 px-2 py-1 h-8 text-sm mb-4"
                onClick={handleAddProduct}
              >
                <Plus className="w-4 h-4" /> Añadir Producto
              </Button>
            </div>
          )}

          <div>
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-700 mb-1 pl-1">
              <div className="col-span-6">Producto</div>
              <div className="col-span-4">Cantidad</div>
              <div className="col-span-2"></div>
            </div>
            {products.map((prod, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-2 items-center mb-3"
              >
                <div className="col-span-6">
                  <Select
                    value={prod.productId ? String(prod.productId) : ""}
                    onValueChange={(value) =>
                      handleProductChange(idx, "productId", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          loadingProducts
                            ? "Cargando..."
                            : "Seleccionar producto"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {(productCatalog || [])
                        .filter(
                          (p) =>
                            !selectedProductIds.includes(p.id) ||
                            p.id === prod.productId
                        )
                        .map((p) => (
                          <SelectItem key={p.id} value={String(p.id)}>
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
                  {products.length > 1 && idx !== 0 && (
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

          <div>
            <label className="block text-sm font-medium mb-1">
              Notas o Instrucciones Especiales{" "}
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Añadir notas o instrucciones especiales para la producción..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              Crear Orden
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
