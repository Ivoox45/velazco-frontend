import { useGetProducts } from "../../hooks";
import type { Product } from "../../types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ProductTable() {
    const { data, isLoading, error } = useGetProducts();

    if (isLoading)
        return <p className="text-gray-600">Cargando productos...</p>;
    if (error)
        return <p className="text-red-600">Error al cargar los productos</p>;

    return (
        <div className="mt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Activo</TableHead>
                        <TableHead>Categoría</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((product: Product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                {product.active ? "Sí" : "No"}
                            </TableCell>
                            <TableCell>{product.category.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
