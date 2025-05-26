import * as React from "react";
import {
    AudioWaveform,
    BoxIcon,
    ChefHatIcon,
    ClipboardList,
    Command,
    CreditCard,
    GalleryVerticalEnd,
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

// Solo usamos proyectos ahora
const data = {
    user: {
        name: "Said López",
        email: "said@gmail.com",
        avatar: "/nagi.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    projects: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboardIcon,
        },
        {
            name: "Inventario",
            url: "/inventario",
            icon: BoxIcon,
        },
        {
            name: "Pedidos en Tienda",
            url: "/pedidos",
            icon: ShoppingCart,
        },
        {
            name: "Caja",
            url: "/caja",
            icon: CreditCard,
        },
        {
            name: "Entregas",
            url: "/entregas",
            icon: HandHelping,
        },
        {
            name: "Producción",
            url: "/produccion",
            icon: ChefHatIcon,
        },
        {
            name: "Órdenes de Producción",
            url: "/ordenes-produccion",
            icon: ClipboardList,
        },
        {
            name: "Usuarios",
            url: "/usuarios",
            icon: UsersIcon,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <img
                    src="/logo.png"
                    alt="Company Logo"
                    style={{ width: "120px", height: "auto", margin: "auto " }}
                />
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
