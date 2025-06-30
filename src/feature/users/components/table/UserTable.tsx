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
import type { User } from "../../types";

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

const USERS: User[] = [
  {
    name: "Ana Velazco",
    email: "ana@velazcopasteleria.com",
    rol: "Administrador",
    estado: "Activo",
    desc: "Propietaria",
  },
  {
    name: "Luis García",
    email: "luis@velazcopasteleria.com",
    rol: "Vendedor",
    estado: "Activo",
    desc: "Vendedor",
  },
  {
    name: "María López",
    email: "maria@velazcopasteleria.com",
    rol: "Cajero",
    estado: "Activo",
    desc: "Cajera",
  },
  {
    name: "Carlos Gómez",
    email: "carlos@velazcopasteleria.com",
    rol: "Producción",
    estado: "Activo",
    desc: "Jefe de Producción",
  },
  {
    name: "Roberto Martínez",
    email: "roberto@velazcopasteleria.com",
    rol: "Entregas",
    estado: "Activo",
    desc: "Encargado de Entregas",
  },
];

export default function UserTable() {
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
          {USERS.map((u) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
