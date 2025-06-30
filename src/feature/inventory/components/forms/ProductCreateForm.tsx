"use client";

import { useEffect, useState } from "react";
import useCreateProduct from "@/feature/inventory/hooks/useCreateProduct";
import useGetCategories from "@/feature/inventory/hooks/useGetCategories";
import { toast } from "sonner";
import ImageCropDialog from "../ImageCropDialog";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const STORAGE_KEY = "draft-product";

export default function ProductCreateForm() {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateProduct();
  const { data: categories, isLoading } = useGetCategories();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [fileInputKey, setFileInputKey] = useState(0);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempImageUrl(url);
      setShowCropper(true);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setName(parsed.name || "");
      setPrice(parsed.price || "");
      setStock(parsed.stock || "");
      setCategoryId(parsed.categoryId || "");
      setActive(parsed.active || "");
    }
  }, []);

  useEffect(() => {
    const data = { name, price, stock, categoryId, active };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [name, price, stock, categoryId, active]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setActive("");
    setSelectedFile(null);
    setTempImageUrl(null);
    setFileInputKey((prev) => prev + 1);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        active: active === "true",
        categoryId: parseInt(categoryId),
        image: selectedFile || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Producto creado correctamente");
          setOpen(false);
          resetForm();
        },
        onError: (error) => {
          toast.error(error.message || "Error al crear el producto");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Crear producto</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo producto</DialogTitle>
          <DialogDescription>
            Complete los detalles del producto para agregarlo al inventario.
          </DialogDescription>
        </DialogHeader>

        {tempImageUrl && (
          <ImageCropDialog
            open={showCropper}
            imageUrl={tempImageUrl}
            onClose={() => setShowCropper(false)}
            onCropComplete={(croppedFile) => {
              setSelectedFile(croppedFile);
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1">
            <Label>Nombre del Producto</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Besitos"
              required
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <Label>Categoría</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {isLoading && (
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    Cargando categorías...
                  </div>
                )}
                {categories?.length === 0 && !isLoading && (
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    No hay categorías disponibles
                  </div>
                )}
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-y-1">
            <Label>Stock</Label>
            <Input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <Label>Precio</Label>
            <Input
              type="number"
              step={0.01}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ej: 25.99"
              required
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <Label>Estado</Label>
            <Select value={active} onValueChange={setActive}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Activo</SelectItem>
                <SelectItem value="false">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-1">
            <Label>Imagen del producto</Label>

            <div className="relative w-full h-48 border-2 border-dashed border-muted rounded-lg bg-muted/40 overflow-hidden group">
              <input
                key={fileInputKey}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                id="file-input-create"
                className="hidden"
              />

              <label
                htmlFor="file-input-create"
                className="w-full h-full flex items-center justify-center cursor-pointer relative"
              >
                {!selectedFile ? (
                  <div className="text-center text-muted-foreground">
                    <svg
                      className="mx-auto h-10 w-10 opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 16V6a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v10m-4 4H7a2 2 0 01-2-2v0a2 2 0 012-2h10a2 2 0 012 2v0a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm mt-2">
                      Haz clic para seleccionar una imagen
                    </p>
                  </div>
                ) : (
                  <>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Vista previa"
                      className="object-contain w-full h-full rounded"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white text-sm font-medium">
                        Cambiar imagen
                      </span>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>

          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
            <Button type="button" variant="secondary" onClick={resetForm}>
              Limpiar todo
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Guardar producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
