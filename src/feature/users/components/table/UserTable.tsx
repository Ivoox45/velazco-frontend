import { useState } from "react";
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
import { Button } from "@/components/ui/button";

// --- AGREGADO: Paginación shadcn
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

// Props para soportar edición
type Props = {
  onEditUser: (user: any) => void;
};

const ROLE_TRANSLATIONS: Record<string, string> = {
  ADMIN: "Administrador",
  SELLER: "Vendedor",
  CASHIER: "Cajero",
  PRODUCTION: "Producción",
  DELIVERY: "Entregas",
};

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

const USERS_PER_PAGE = 8; // --- DEFINE CUANTOS POR PAGINA

export default function UserTable({ onEditUser }: Props) {
  const { data: usersData, isLoading } = useGetAllUsers();

  // --- ESTADO DE LA PAGINA ACTUAL
  const [page, setPage] = useState(1);

  const users =
    usersData && Array.isArray(usersData)
      ? usersData.map((u) => ({
          name: u.name,
          email: u.email,
          role: u.role,
          rol: ROLE_TRANSLATIONS[u.role] || u.role,
          estado: u.active ? "Activo" : "Inactivo",
          raw: u,
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

  // --- PAGINACION LOGIC
  const pageCount = Math.ceil(users.length / USERS_PER_PAGE);

  // Slice de usuarios para la página actual
  const paginatedUsers = users.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  // Si cambian los usuarios y la página actual queda fuera de rango, vuelve a la primera página
  if (page > pageCount && pageCount > 0) setPage(1);

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
            paginatedUsers.map((u) => (
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

      {/* PAGINADOR SOLO SI HAY MAS DE UNA PAGINA */}
      {pageCount > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  aria-disabled={page === 1}
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              {/* Si son menos de 6 páginas, muéstralas todas, si no, muestra ... */}
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) =>
                pageCount > 5 && (p === 2 && page > 4 || p === pageCount - 1 && page < pageCount - 2)
                  ? page === 3 && p === 2 // muestro el 2 si está en la 3
                    ? (
                      <PaginationItem key={p}>
                        <PaginationLink
                          isActive={page === p}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                    : page === pageCount - 2 && p === pageCount - 1 // muestro el penúltimo si está cerca del final
                    ? (
                      <PaginationItem key={p}>
                        <PaginationLink
                          isActive={page === p}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                    : p !== 1 && p !== pageCount
                    ? <PaginationItem key={p}><PaginationEllipsis /></PaginationItem>
                    : null
                  : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={page === p}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
                  aria-disabled={page === pageCount}
                  className={page === pageCount ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
