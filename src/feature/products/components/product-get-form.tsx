import useGetProducts from "../hooks/useGetProducts";
import type { Product } from "../types";

export default function ProductGetForm() {
    const { data, isLoading, error } = useGetProducts();

    if (isLoading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar los productos</p>;

    return (
        <table border={1} cellPadding={8} cellSpacing={0}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Activo</th>
                    <th>Categoría</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((product: Product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.active ? "Sí" : "No"}</td>
                        <td>{product.category.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
