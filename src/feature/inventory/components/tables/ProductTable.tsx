"use client";

import { useGetProducts } from "../../hooks";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import useUpdateProductActive from "../../hooks/useUpdateProductActive";
import ProductUpdateForm from "../forms/ProductUpdateForm";
import type { ProductListResponse } from "../../types";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

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

// ✅ Función para formatear moneda en soles peruanos
const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
    }).format(value);

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
                            <TableCell>
                                {formatCurrency(product.price)}
                            </TableCell>
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

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="sm" variant="destructive">
                                            Eliminar
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                ¿Eliminar producto?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción no se puede
                                                deshacer. El producto será
                                                eliminado permanentemente.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                            >
                                                Confirmar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
