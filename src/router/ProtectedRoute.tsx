// src/router/ProtectedRoute.tsx
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, useLocation } from "react-router";
import { normalizeRole } from "@/utils/normalizeRole";

const ROLE_MODULES: Record<string, string[]> = {
  ADMINISTRADOR: [
    "dashboard",
    "inventario",
    "pedidos",
    "caja",
    "entregas",
    "produccion",
    "ordenes_produccion",
    "usuarios",
    "reconocimientos",
  ],
  CAJERO: ["caja", "reconocimientos"],
  VENDEDOR: ["pedidos", "reconocimientos"],
  PRODUCCION: ["produccion", "reconocimientos"],
  ENTREGAS: ["entregas", "reconocimientos"],
};

const PATH_TO_KEY: Record<string, string> = {
  "/dashboard": "dashboard",
  "/inventario": "inventario",
  "/pedidos": "pedidos",
  "/caja": "caja",
  "/entregas": "entregas",
  "/produccion": "produccion",
  "/ordenes-produccion": "ordenes_produccion",
  "/usuarios": "usuarios",
  "/reconocimientos": "reconocimientos",
};

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) return <Navigate to="/" replace />;

  const currentKey = PATH_TO_KEY[location.pathname];
  const normalizedRole = user.role ? normalizeRole(user.role) : "";
  const allowedModules =
    normalizedRole && ROLE_MODULES[normalizedRole]
      ? ROLE_MODULES[normalizedRole]
      : [];

  if (currentKey && !allowedModules.includes(currentKey)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-2 text-red-600">Acceso Denegado</h1>
        <p className="text-base text-gray-500">
          No tienes permiso para acceder a este módulo.
        </p>
      </div>
    );
    // O si prefieres redireccionar:
    // return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
