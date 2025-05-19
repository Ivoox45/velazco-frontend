import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import QueryProvider from "./providers/QueryProvider";

import Home from "./router";
import Layout from "./router/layout";

import ProductCreateForm from "./feature/products/components/product-create-form";
import ProductGetForm from "./feature/products/components/product-get-form";

import "./index.css";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", element: <ProductGetForm /> },
            { path: "products/create", element: <ProductCreateForm /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryProvider>
        <RouterProvider router={router} />
    </QueryProvider>
);
