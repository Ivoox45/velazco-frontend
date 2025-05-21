import {
    ProductCreateForm,
    ProductTable,
} from "@/feature/inventario/components";

export default function InventarioPage() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Lista de Productos</h1>
                <ProductCreateForm />
            </div>
            <ProductTable />
        </div>
    );
}
