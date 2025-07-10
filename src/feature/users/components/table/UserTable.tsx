import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { avatarVariants } from "@/components/ui/avatar";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button"; // Asegurate que esté importado

// Props para soportar edición
type Props = {
    onEditUser: (user: any) => void;
};

// Traducción inglés -> español
const ROLE_TRANSLATIONS: Record<string, string> = {
    ADMIN: "Administrador",
    SELLER: "Vendedor",
    CASHIER: "Cajero",
    PRODUCTION: "Producción",
    DELIVERY: "Entregas",
};

// Tipos para variant de badge
type RoleVariant =
    | "default"
    | "admin"
    | "vendedor"
    | "cajero"
    | "produccion"
    | "entregas";

type EstadoVariant = "default" | "estado_activo";

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
        .substring(0, 2);
}

function getRoleVariant(rol: string): RoleVariant {
    switch (rol) {
        case "Administrador":
            return "admin";
        case "Vendedor":
            return "vendedor";
        case "Cajero":
            return "cajero";
        case "Producción":
            return "produccion";
        case "Entregas":
            return "entregas";
        default:
            return "default";
    }
}

function getEstadoVariant(estado: string): EstadoVariant {
    if (estado === "Activo") return "estado_activo";
    return "default";
}

export default function UserTable({ onEditUser }: Props) {
    const { data: usersData, isLoading } = useGetAllUsers();

    const users =
        usersData && Array.isArray(usersData)
            ? usersData.map((u) => ({
                  name: u.name,
                  email: u.email,
                  role: u.role,
                  rol: ROLE_TRANSLATIONS[u.role] || u.role,
                  estado: u.active ? "Activo" : "Inactivo",
                  raw: u, // Para pasar todo el usuario si queremos editar
              }))
            : [];

    const ROLE_ORDER = [
        "Administrador",
        "Vendedor",
        "Cajero",
        "Producción",
        "Entregas",
    ];

    users.sort((a, b) => {
        const indexA = ROLE_ORDER.indexOf(a.rol);
        const indexB = ROLE_ORDER.indexOf(b.rol);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                Cargando usuarios...
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((u) => (
                            <TableRow key={u.email}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback
                                                className={avatarVariants({
                                                    variant: getRoleVariant(
                                                        u.rol
                                                    ),
                                                })}
                                            >
                                                {getInitials(u.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold">
                                                {u.name}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={getRoleVariant(u.rol)}
                                        className="px-4 py-1 rounded-full font-medium"
                                    >
                                        {u.rol}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={getEstadoVariant(u.estado)}
                                        className="px-4 py-1 rounded-full font-medium"
                                    >
                                        {u.estado}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2"
                                        onClick={() => onEditUser(u.raw)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
