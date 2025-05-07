import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import Home from "./router";
import QueryProvider from "./providers/QueryProvider";
import layout from "./router/layout";

const router = createBrowserRouter([
    {
        Component: layout,
        children: [{ index: true, element: <Home /> },
          {path: "/products", element: <Home />}, 
        ],
    },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <QueryProvider>
        <RouterProvider router={router} />
    </QueryProvider>
);
