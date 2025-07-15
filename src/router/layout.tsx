import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router";
import { HelpCircle } from "lucide-react";

export default function Layout() {
  const location = useLocation();

  const routeTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/inventario": "Inventario",
    "/pedidos": "Pedidos en Tienda",
    "/caja": "Caja",
    "/entregas": "Entregas",
    "/produccion": "Producción",
    "/ordenes-produccion": "Órdenes de Producción",
    "/usuarios": "Usuarios y Roles",
    "/reconocimientos": "Reconocimientos",
  };

  // Rutas para cada módulo
  const moduleTours: Record<string, string> = {
    "/dashboard": "dashboard",
    "/inventario": "inventario",
    "/pedidos": "pedidos",
    "/caja": "caja",
    "/entregas": "entregas",
    "/produccion": "produccion",
    "/ordenes-produccion": "ordenes_produccion",
    "/usuarios": "usuarios",
    "/reconocimientos": "Reconocimientos",
  };

  const currentPath = location.pathname;
  const title = routeTitles[currentPath] || "Módulo";

  function startTour() {
    const modulo = moduleTours[currentPath];
    if (
      modulo &&
      typeof window !== "undefined" &&
      typeof window[`startTour_${modulo}`] === "function"
    ) {
      window[`startTour_${modulo}`]();
    } else {
      alert("No hay guía para este módulo aún.");
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <SidebarTrigger />
          <div style={{ padding: "20px" }}>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
              {title}
            </h1>
            <Outlet />
          </div>
        </main>
        {/* Botón flotante de guía */}
        <button
          onClick={startTour}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition"
          aria-label="Ver Guía"
        >
          <HelpCircle size={18} strokeWidth={2.2} />
        </button>
      </SidebarInset>
    </SidebarProvider>
  );
}
