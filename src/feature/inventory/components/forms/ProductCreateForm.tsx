import { useEffect, useState } from "react";
import useCreateProduct from "@/feature/inventario/hooks/useCreateProduct";
import type { CreateProduct } from "@/feature/inventario/types";
import { toast } from "sonner";

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

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState("");

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
        localStorage.removeItem(STORAGE_KEY);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const values: CreateProduct = {
            name,
            price: parseFloat(price),
            stock: parseInt(stock),
            active: active === "true",
            categoryId: parseInt(categoryId),
        };

        mutate(values, {
            onSuccess: () => {
                toast.success("Producto creado correctamente");
                setOpen(false);
                resetForm();
            },
            onError: () => {
                toast.error("Error al crear el producto");
            },
        });
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
                        Complete los detalles del producto para agregarlo al
                        inventario.
                    </DialogDescription>
                </DialogHeader>

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
                        <Select
                            value={categoryId}
                            onValueChange={setCategoryId}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Categoría 1</SelectItem>
                                <SelectItem value="2">Categoría 2</SelectItem>
                                <SelectItem value="3">Categoría 3</SelectItem>
                                <SelectItem value="4">Categoría 4</SelectItem>
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

                    <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={resetForm}
                        >
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
