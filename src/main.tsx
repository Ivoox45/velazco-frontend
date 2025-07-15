import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/providers/CartProvider";
import QueryProvider from "./providers/QueryProvider";
import Layout from "./router/layout";
import AuthPage from "./feature/auth/pages/AuthPage";
import { AuthInitializer } from "./feature/auth/hooks/AuthInitializer";
import {
  InventarioPage,
  PedidosPage,
  CajaPage,
  EntregasPage,
  ProduccionPage,
  OrderProductionPage,
  UserPage,
  DashboardPage,
  ReconocimientosPage,
} from "@/feature";
import { Toaster } from "@/components/ui/sonner";
import "driver.js/dist/driver.css";
import "./index.css";
import "./driver-custom.css";
import { ProtectedRoute } from "./router/ProtectedRoute"; 

const router = createBrowserRouter([
  { path: "/", element: <AuthPage /> },

  {
    element: <Layout />,
    children: [
      { path: "dashboard", element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: "inventario", element: <ProtectedRoute><InventarioPage /></ProtectedRoute> },
      { path: "pedidos", element: <ProtectedRoute><PedidosPage /></ProtectedRoute> },
      { path: "caja", element: <ProtectedRoute><CajaPage /></ProtectedRoute> },
      { path: "entregas", element: <ProtectedRoute><EntregasPage /></ProtectedRoute> },
      { path: "produccion", element: <ProtectedRoute><ProduccionPage /></ProtectedRoute> },
      { path: "ordenes-produccion", element: <ProtectedRoute><OrderProductionPage /></ProtectedRoute> },
      { path: "usuarios", element: <ProtectedRoute><UserPage /></ProtectedRoute> },
      { path: "reconocimientos", element: <ProtectedRoute><ReconocimientosPage /></ProtectedRoute> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryProvider>
      <CartProvider>
        <AuthInitializer>
          <RouterProvider router={router} />
          <Toaster richColors />
        </AuthInitializer>
      </CartProvider>
    </QueryProvider>
  </ThemeProvider>
);
