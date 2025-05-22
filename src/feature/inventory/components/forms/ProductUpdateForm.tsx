"use client";

import useUpdateProduct from "@/feature/inventory/hooks/useUpdateProduct";
import useGetCategories from "@/feature/inventory/hooks/useGetCategories";
import { toast } from "sonner";
import type { ProductListResponse } from "@/feature/inventory/types";

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
import { useState } from "react";

type Props = {
    product: ProductListResponse;
    trigger: React.ReactNode;
};

export default function ProductUpdateForm({ product, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const { mutate } = useUpdateProduct();
    const { data: categories } = useGetCategories();

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price.toString());
    const [stock, setStock] = useState(product.stock.toString());
    const [categoryId, setCategoryId] = useState(
        product.category.id.toString()
    );
    const [active, setActive] = useState(product.active ? "true" : "false");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate(
            {
                id: product.id,
                name,
                price: parseFloat(price),
                stock: parseInt(stock),
                active: active === "true",
                categoryId: parseInt(categoryId),
                image: selectedFile || undefined,
            },
            {
                onSuccess: () => {
                    toast.success("Producto actualizado");
                    setOpen(false);
                },
                onError: (error) => {
                    toast.error(error.message || "Error al actualizar");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar producto</DialogTitle>
                    <DialogDescription>
                        Actualiza los datos de este producto.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-1">
                        <Label>Nombre</Label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <Label>Categoría</Label>
                        <Select
                            value={categoryId}
                            onValueChange={setCategoryId}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories?.map((cat) => (
                                    <SelectItem
                                        key={cat.id}
                                        value={String(cat.id)}
                                    >
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
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <Label>Estado</Label>
                        <Select value={active} onValueChange={setActive}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Activo</SelectItem>
                                <SelectItem value="false">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <Label>Imagen</Label>

                        <div className="relative w-full border rounded bg-muted p-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setSelectedFile(file);
                                }}
                                id={`file-input-${product.id}`}
                                className="hidden"
                            />

                            <label
                                htmlFor={`file-input-${product.id}`}
                                className="group cursor-pointer block relative"
                            >
                                <img
                                    src={
                                        selectedFile
                                            ? URL.createObjectURL(selectedFile)
                                            : product.image ||
                                                "/placeholder.png"
                                    }
                                    alt="Vista previa"
                                    className="w-full max-h-48 object-contain mx-auto"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-white text-sm font-medium">
                                        Cambiar imagen
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit">Guardar cambios</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
