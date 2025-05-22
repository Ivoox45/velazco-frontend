"use client";

import { useGetProducts } from "../../hooks";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import useUpdateProductActive from "../../hooks/useUpdateProductActive";
import ProductUpdateForm from "../forms/ProductUpdateForm";
import type { ProductListResponse } from "../../types";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProductTable() {
    const { data, isLoading, error } = useGetProducts();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { mutate: updateActive } = useUpdateProductActive();

    const handleToggleActive = (product: ProductListResponse) => {
        updateActive(
            { id: product.id, active: { active: !product.active } },
            {
                onSuccess: () => {
                    toast.success("Estado actualizado");
                },
                onError: () => {
                    toast.error("Error al actualizar estado");
                },
            }
        );
    };

    const handleDelete = (id: number) => {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            deleteProduct(id, {
                onSuccess: () => {
                    toast.success("Producto eliminado");
                },
                onError: () => {
                    toast.error("Error al eliminar producto");
                },
            });
        }
    };

    if (isLoading)
        return <p className="text-gray-600">Cargando productos...</p>;
    if (error)
        return <p className="text-red-600">Error al cargar los productos</p>;

    return (
        <div className="mt-6 overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((product: ProductListResponse) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                <Switch
                                    checked={product.active}
                                    onCheckedChange={() =>
                                        handleToggleActive(product)
                                    }
                                />
                            </TableCell>
                            <TableCell>{product.category.name}</TableCell>
                            <TableCell className="flex justify-center gap-2">
                                <ProductUpdateForm
                                    product={product}
                                    trigger={
                                        <Button size="sm" variant="outline">
                                            Editar
                                        </Button>
                                    }
                                />
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
