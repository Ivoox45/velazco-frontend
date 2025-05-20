import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import QueryProvider from "./providers/QueryProvider";

import Home from "./router";
import Layout from "./router/layout";

import ProductGetForm from "./feature/products/components/product-get-form";

import "./index.css";
import SaleGetForm from "./feature/caja/components/sale-get-form";
import PedidoGetForm from "./feature/pedidos/components/pedido-get-form";
import EntregaGetForm from "./feature/entregas/components/entrega-get-form";
import OrdenProduccionGetForm from "./feature/ordenes-produccion/components/orden-produccion-get-form";
import ProduccionGetForm from "./feature/produccion/components/produccion-get-form";
import UsuarioGetForm from "./feature/usuarios/components/usuario-get-form";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "dashboard", element: <Home /> },
            { path: "inventario", element: <ProductGetForm /> },
            { path: "pedidos", element: <PedidoGetForm /> },
            { path: "caja", element: <SaleGetForm /> },
            { path: "entregas", element: <EntregaGetForm /> },
            { path: "produccion", element: <ProduccionGetForm /> },
            { path: "ordenes-produccion", element: <OrdenProduccionGetForm /> },
            { path: "usuarios", element: <UsuarioGetForm /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryProvider>
        <RouterProvider router={router} />
    </QueryProvider>
);
