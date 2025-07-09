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
import { useGetAllUsers } from "../../hooks/useGetAllUsers"; // Importa el hook

// Traducción inglés -> español
const ROLE_TRANSLATIONS: Record<string, string> = {
  ADMIN: "Administrador",
  SELLER: "Vendedor",
  CASHIER: "Cajero",
  PRODUCTION: "Producción",
  DELIVERY: "Entregas",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .substring(0, 2);
}

function getRoleVariant(rol: string) {
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
function getEstadoVariant(estado: string) {
  if (estado === "Activo") return "estado_activo";
  return "default";
}

export default function UserTable() {
  // Usa el hook para cargar usuarios
  const { data: usersData, isLoading } = useGetAllUsers();

  // Mapea usuarios del backend al formato de la tabla
  const users =
    usersData && Array.isArray(usersData)
      ? usersData.map((u: any) => ({
          name: u.name,
          email: u.email,
          rol: ROLE_TRANSLATIONS[u.role] || u.role, // Traduce a español
          estado: u.active ? "Activo" : "Inactivo",
          desc: "", // Aquí podrías poner algún campo de descripción si lo tienes
        }))
      : [];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
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
                          variant: getRoleVariant(u.rol),
                        })}
                      >
                        {getInitials(u.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.desc}</div>
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
