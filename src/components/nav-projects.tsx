import {
    type LucideIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";


import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,

    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar";

export function NavProjects({
    projects,
}: {
    projects: {
        name: string;
        url: string;
        icon: LucideIcon;
    }[];
}) {
    const location = useLocation();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Modulos</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => {
                    const isActive = location.pathname === item.url;

                    return (
                        <SidebarMenuItem
                            key={item.name}
                            className={isActive ? "bg-muted" : ""}
                        >
                            <SidebarMenuButton asChild tooltip={item.name}>
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-primary font-medium"
                                            : "text-muted-foreground"
                                    }
                                >
                                    <item.icon />
                                    <span>{item.name}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
                <SidebarMenuItem></SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
