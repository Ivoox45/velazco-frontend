// users/components/dialog/NewUserDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import type { RolUsuario } from "../../types";
import { useGetAllRoles } from "../../hooks/useGetAllRoles";

// Diccionario: backend (en inglés) => frontend (en español)
const ROLE_TRANSLATIONS: Record<string, RolUsuario> = {
  ADMIN: "Administrador",
  SELLER: "Vendedor",
  CASHIER: "Cajero",
  PRODUCTION: "Producción",
  DELIVERY: "Entregas",
};

export default function NewUserDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Ahora también devuelve el roleId, necesario para crear usuario
  onCreate?: (user: {
    nombre: string;
    correo: string;
    rol: RolUsuario;
    roleId: number;
  }) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState<RolUsuario | "">("");

  // Carga dinámica de roles desde el backend
  const { data: rolesData, isLoading: rolesLoading } = useGetAllRoles();

  // Encuentra el id del rol según el nombre en español
  const findRoleId = (rolEsp: RolUsuario) => {
    if (!rolesData) return undefined;
    const entry = rolesData.find((r) => ROLE_TRANSLATIONS[r.name] === rolEsp);
    return entry ? entry.id : undefined;
  };

  const handleCreate = () => {
    if (!rol) return;
    const roleId = findRoleId(rol);
    if (onCreate && roleId) {
      onCreate({
        nombre,
        correo,
        rol,
        roleId,
      });
    }
    onOpenChange(false);
    setNombre("");
    setCorreo("");
    setRol("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Complete los detalles para crear un nuevo usuario en el sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Nombre */}
          <div>
            <label className="font-semibold block mb-1">Nombre Completo</label>
            <Input
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          {/* Correo */}
          <div>
            <label className="font-semibold block mb-1">
              Correo Electrónico
            </label>
            <Input
              type="email"
              placeholder="Ej: juan@velazcopasteleria.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          {/* Rol */}
          <div>
            <label className="font-semibold block mb-1">Rol</label>
            <Select
              value={rol}
              onValueChange={(v) => setRol(v as RolUsuario)}
              disabled={rolesLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {rolesData &&
                  rolesData
                    .map((r) => ({
                      backend: r.name,
                      frontend: ROLE_TRANSLATIONS[r.name] as RolUsuario,
                      id: r.id,
                    }))
                    .filter((r) => !!r.frontend)
                    .map((r) => (
                      <SelectItem key={r.id} value={r.frontend}>
                        {r.frontend}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            className="bg-black text-white hover:bg-zinc-800"
            onClick={handleCreate}
            disabled={
              !nombre || !correo || !rol || !findRoleId(rol) || rolesLoading
            }
          >
            Crear Usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
