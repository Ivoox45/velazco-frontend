import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function Layout() {
    return (

        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main>
                    <SidebarTrigger />
                    <div style={{ padding: "20px" }}>
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Dashboard</h1>

                        <Outlet />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
