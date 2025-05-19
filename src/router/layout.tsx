import { Outlet } from "react-router";

export default function Layout() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Mi Aplicación de Productos</h1>
            <Outlet />
        </div>
    );
}
