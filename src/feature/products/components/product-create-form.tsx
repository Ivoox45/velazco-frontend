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
        <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Nombre" />
            <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Precio"
            />
            <input name="stock" type="number" placeholder="Stock" />
            <select name="active">
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
            </select>
            <input name="categoryId" type="number" placeholder="ID Categoría" />
            <button type="submit">Crear</button>
        </form>
    );
}
