import useGetProducts from "../hooks/useGetProducts";
import type { Product } from "../types";

export default function ProductGetForm() {
    const { data, isLoading, error } = useGetProducts();

    if (isLoading) return <p className="text-gray-600">Cargando productos...</p>;
    if (error) return <p className="text-red-600">Error al cargar los productos</p>;

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Precio</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Stock</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Activo</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Categoría</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((product: Product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-800">{product.id}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{product.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{product.price}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{product.stock}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{product.active ? "Sí" : "No"}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{product.category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
