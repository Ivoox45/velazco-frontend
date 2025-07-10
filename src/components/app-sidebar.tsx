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

// Proyectos igual que antes
const projects = [
  { name: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
  { name: "Inventario", url: "/inventario", icon: BoxIcon },
  { name: "Pedidos en Tienda", url: "/pedidos", icon: ShoppingCart },
  { name: "Caja", url: "/caja", icon: CreditCard },
  { name: "Entregas", url: "/entregas", icon: HandHelping },
  { name: "Producción", url: "/produccion", icon: ChefHatIcon },
  {
    name: "Órdenes de Producción",
    url: "/ordenes-produccion",
    icon: ClipboardList,
  },
  { name: "Usuarios", url: "/usuarios", icon: UsersIcon },
];

// Calcula iniciales, ejemplo: "Luis Enrique" => "LE"
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
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "Usuario",
            email: user?.email || "correo@intranet.com",
            avatar: "", // vacío para forzar fallback
            initials: getInitials(user?.name || "Usuario"),
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
