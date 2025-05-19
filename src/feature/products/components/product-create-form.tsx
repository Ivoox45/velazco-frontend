import useCreateProduct from "../hooks/useCreateProduct";
import type { CreateProduct } from "../types";

export default function ProductCreateForm() {
    const { mutate } = useCreateProduct();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const values: CreateProduct = {
            name: formData.get("name") as string,
            price: parseFloat(formData.get("price") as string),
            stock: parseInt(formData.get("stock") as string),
            active: formData.get("active") === "true",
            categoryId: parseInt(formData.get("categoryId") as string),
        };

        mutate(values);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-700">Crear Producto</h2>

            <input
                name="name"
                type="text"
                placeholder="Nombre"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Precio"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <input
                name="stock"
                type="number"
                placeholder="Stock"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <select
                name="active"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
            </select>

            <input
                name="categoryId"
                type="number"
                placeholder="ID Categoría"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Crear
            </button>
        </form>
    );
}
