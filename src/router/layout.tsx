import { AppSidebar } from "@/components/app.sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </SidebarProvider>
        </div>
    );
}
