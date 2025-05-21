import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/providers/CartProvider";
import QueryProvider from "./providers/QueryProvider";

import Home from "./router";
import Layout from "./router/layout";

import "./index.css";
import {
    InventarioPage,
    PedidosPage,
    CajaPage,
    EntregasPage,
    ProduccionPage,
    OrderProductionPage,
    UserPage,
} from "@/feature";
import { Toaster } from "@/components/ui/sonner";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Navigate to="/dashboard" replace /> },
            { path: "dashboard", element: <Home /> },
            { path: "inventario", element: <InventarioPage /> },
            { path: "pedidos", element: <PedidosPage /> },
            { path: "caja", element: <CajaPage /> },
            { path: "entregas", element: <EntregasPage /> },
            { path: "produccion", element: <ProduccionPage /> },
            { path: "ordenes-produccion", element: <OrderProductionPage /> },
            { path: "usuarios", element: <UserPage /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryProvider>
            <CartProvider>
                <RouterProvider router={router} />
                <Toaster />
            </CartProvider>
        </QueryProvider>
    </ThemeProvider>
);
