import {
  ProductCreateForm,
  ProductTable,
  CategoriesModal,
} from "@/feature/inventory/components";
import { useEffect } from "react";
// Importa el tour separado:
import startTourInventario from "../../../tours/startTourInventario";

declare global {
  interface Window {
    startTour_inventario?: () => void;
  }
}

export default function InventarioPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.startTour_inventario = startTourInventario;
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.startTour_inventario;
      }
    };
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">Lista de Productos</h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="agregar-producto-driver">
            <ProductCreateForm />
          </div>
          <div className="categorias-driver">
            <CategoriesModal />
          </div>
        </div>
      </div>
      <div className="tabla-driver">
        <ProductTable />
      </div>
    </div>
  );
}
