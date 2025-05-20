import useCreateProduct from "../hooks/useCreateProduct";
import type { CreateProduct } from "../types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem, SelectLabel
} from "@/components/ui/select";

import { act, useState } from "react";

export default function ProductCreateForm() {
    const { mutate } = useCreateProduct();

    const [categoryId, setCategoryId] = useState<string>("");
    const [active, setActive] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const values: CreateProduct = {
            name: formData.get("name") as string,
            price: parseFloat(formData.get("price") as string),
            stock: parseInt(formData.get("stock") as string),
            active: active === "true",
            categoryId: parseInt(categoryId),
        };

        console.log("Datos que se van a enviar:", values);
        mutate(values);
        console.log("Formulario enviado ✅");

    };

    return (

        <Dialog>
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-1">
                        <Label>Nombre del Producto</Label>
                        <Input type="text" name="name" placeholder="Ej: Besitos" required />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <Label>Categoría</Label>
                        <Select onValueChange={setCategoryId}>
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
                        <Input type="number" name="stock" required />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <Label>Precio</Label>
                        <Input type="number" step={0.01} name="price" placeholder="Ej: 25.99" required />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <Label>Estado</Label>
                        <Select onValueChange={setActive}>
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
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Guardar producto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
