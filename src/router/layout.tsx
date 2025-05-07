import { Outlet } from "react-router";

export default function layout() {
    return (
        <div>
            sidebar
            <Outlet />
        </div>
    );
}
