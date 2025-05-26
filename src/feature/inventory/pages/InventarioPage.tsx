import {
    ProductCreateForm,
    ProductTable,
    CategoriesModal,
} from "@/feature/inventory/components";

export default function InventarioPage() {
    return (
        <div className="p-4 sm:p-6">
            {/* Título y acciones */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h1 className="text-xl sm:text-2xl font-bold">
                    Lista de Productos
                </h1>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <ProductCreateForm />
                    <CategoriesModal />
                </div>
            </div>
            <ProductTable />
        </div>
    );
}
