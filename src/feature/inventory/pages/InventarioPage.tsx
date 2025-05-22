import {
    ProductCreateForm,
    ProductTable,
    CategoriesModal,
} from "@/feature/inventory/components";

export default function InventarioPage() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Lista de Productos</h1>

                <div className="flex gap-2">
                    <ProductCreateForm />
                    <CategoriesModal />
                </div>
            </div>

            <ProductTable />
        </div>
    );
}
