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

const roles: RolUsuario[] = [
  "Administrador",
  "Vendedor",
  "Cajero",
  "Producción",
  "Entregas",
];

export default function NewUserDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (user: {
    nombre: string;
    correo: string;
    rol: RolUsuario;
  }) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState<RolUsuario | "">("");

  const handleCreate = () => {
    if (onCreate && rol) onCreate({ nombre, correo, rol });
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
            <Select value={rol} onValueChange={(v) => setRol(v as RolUsuario)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
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
            disabled={!nombre || !correo || !rol}
          >
            Crear Usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
