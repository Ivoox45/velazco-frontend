// src/feature/users/dialog/RolesSystemDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetAllRoles } from "../../hooks/useGetAllRoles";

const rolesPreset = [
    {
        label: "Administrador",
        backend: "Administrador",
        variant: "admin",
        text: "Acceso completo a todas las funciones del sistema. Puede gestionar usuarios, inventario, pedidos, caja, entregas, producción y órdenes.",
    },
    {
        label: "Vendedor",
        backend: "Vendedor",
        variant: "vendedor",
        text: "Atiende a los clientes y gestiona pedidos en tienda. Acceso a la sección de pedidos y consulta de inventario.",
    },
    {
        label: "Cajero",
        backend: "Cajero",
        variant: "cajero",
        text: "Procesa pagos y maneja la caja registradora. Acceso a la sección de caja y procesamiento de pagos.",
    },
    {
        label: "Producción",
        backend: "Producción",
        variant: "produccion",
        text: "Gestiona la producción diaria y órdenes de producción. Acceso a las secciones de producción y órdenes.",
    },
    {
        label: "Entregas",
        backend: "Entregas",
        variant: "entregas",
        text: "Maneja las entregas de pedidos a clientes. Acceso a la sección de entregas y gestión de pedidos.",
    },
];

export default function RolesSystemDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { data: rolesData, isLoading } = useGetAllRoles();

    const roles = rolesPreset.map((preset) => {
        const match = rolesData?.find((r) => r.name === preset.backend);
        return {
            ...preset,
            count: match?.count ?? 0,
        };
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[750px]">
                <DialogHeader>
                    <DialogTitle>Roles del Sistema</DialogTitle>
                    <DialogDescription>
                        Información sobre los roles predefinidos en el sistema
                        de gestión.
                    </DialogDescription>
                </DialogHeader>
                {/* Tabla de roles */}
                <div className="border rounded-lg overflow-x-auto">
                    <table className="w-full text-sm table-auto min-w-[600px]">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left font-medium w-32">
                                    Rol
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Descripción
                                </th>
                                <th className="px-4 py-3 text-center font-medium">
                                    Cantidad
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr
                                    key={role.label}
                                    className="border-b last:border-b-0"
                                >
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={role.variant as any}
                                            className="font-semibold px-4 py-1 rounded-full"
                                        >
                                            {role.label}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 break-words max-w-xs">
                                        {role.text}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-sm text-center">

                                        {isLoading ? "..." : role.count}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Nota */}
                <div className="mt-4 bg-blue-50 border border-blue-100 text-blue-900 rounded-lg px-4 py-3 text-[15px]">
                    <span className="font-semibold">Nota:</span> Los roles son
                    predefinidos y están configurados con permisos específicos
                    para cada función del sistema.
                </div>
                <DialogFooter className="mt-3 flex justify-end">
                    <DialogClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
