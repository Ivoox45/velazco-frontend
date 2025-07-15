import * as React from "react";
import {
  BoxIcon,
  ChefHatIcon,
  ClipboardList,
  CreditCard,
  HandHelping,
  LayoutDashboardIcon,
  ShoppingCart,
  UsersIcon,
  AwardIcon,
} from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { normalizeRole } from "@/utils/normalizeRole";

const projects = [
  { key: "dashboard", name: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
  { key: "inventario", name: "Inventario", url: "/inventario", icon: BoxIcon },
  { key: "pedidos", name: "Pedidos en Tienda", url: "/pedidos", icon: ShoppingCart },
  { key: "caja", name: "Caja", url: "/caja", icon: CreditCard },
  { key: "entregas", name: "Entregas", url: "/entregas", icon: HandHelping },
  { key: "produccion", name: "Producción", url: "/produccion", icon: ChefHatIcon },
  { key: "ordenes_produccion", name: "Órdenes de Producción", url: "/ordenes-produccion", icon: ClipboardList },
  { key: "usuarios", name: "Usuarios", url: "/usuarios", icon: UsersIcon },
  { key: "reconocimientos", name: "Reconocimientos", url: "/reconocimientos", icon: AwardIcon },
];

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

function getInitials(name: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);

  const normalizedRole = user?.role ? normalizeRole(user.role) : "";
  const allowedModules =
    normalizedRole && ROLE_MODULES[normalizedRole]
      ? ROLE_MODULES[normalizedRole]
      : [];

  const visibleProjects = projects.filter((p) => allowedModules.includes(p.key));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img
          src="/logo.png"
          alt="Company Logo"
          style={{ width: "120px", height: "auto", margin: "auto" }}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={visibleProjects} />
      </SidebarContent>
      <SidebarFooter >
        <NavUser 
          user={{
            name: user?.name || "Usuario",
            email: user?.email || "correo@intranet.com",
            avatar: "",
            initials: getInitials(user?.name || "Usuario"),
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
