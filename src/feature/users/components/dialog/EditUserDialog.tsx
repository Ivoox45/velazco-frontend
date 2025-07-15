import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import type { UserListResponseDto } from "../../types";
import { useGetAllRoles } from "../../hooks/useGetAllRoles";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserListResponseDto | null;
};

export function EditUserDialog({ open, onOpenChange, user }: Props) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rolId, setRolId] = useState<number | "">("");
  const [activo, setActivo] = useState(true);
  const [password, setPassword] = useState("");

  const { data: rolesData, isLoading: loadingRoles } = useGetAllRoles();
  const { mutate: updateUser, isPending } = useUpdateUser();

  // Setear los valores al abrir modal o cambiar usuario
  useEffect(() => {
    if (!user || !rolesData) return;

    setNombre(user.name ?? "");
    setCorreo(user.email ?? "");
    setActivo(user.active ?? true);
    setPassword("");
    // Buscar el id del rol correspondiente al nombre recibido
    const rolFound = rolesData.find((r) => r.name === user.role);
    setRolId(rolFound ? rolFound.id : "");
  }, [user, rolesData]);

  const handleSave = () => {
    if (!user) return;

    if (!nombre.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }
    if (!correo.trim()) {
      toast.error("El correo no puede estar vacío");
      return;
    }
    if (!rolId) {
      toast.error("Debes seleccionar un rol válido");
      return;
    }

    const trimmedPassword = password.trim();
    const payload: any = {
      name: nombre.trim(),
      email: correo.trim(),
      roleId: rolId,
      active: activo,
    };
    if (trimmedPassword.length >= 6) {
      payload.password = trimmedPassword;
    }

    // ⬇️ Agrega este log para ver lo que se enviará
    console.log("Payload para actualizar usuario:", {
      id: user.id,
      ...payload,
    });

    updateUser(
      {
        id: user.id,
        payload,
      },
      {
        onSuccess: () => {
          toast.success("Usuario actualizado correctamente");
          onOpenChange(false);
        },
        onError: () => {
          toast.error("No se pudo actualizar el usuario");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Actualiza la información del usuario seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <Input
            placeholder="Nueva contraseña (opcional)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Select
            value={rolId === "" ? "" : String(rolId)}
            onValueChange={(value) => setRolId(Number(value))}
            disabled={loadingRoles || !rolesData}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              {(rolesData || []).map((r) => (
                <SelectItem key={r.id} value={String(r.id)}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 select-none">
            <Checkbox
              id="activo"
              checked={activo}
              onCheckedChange={(checked) => setActivo(Boolean(checked))}
            />
            <Label htmlFor="activo">Usuario activo</Label>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isPending}>
              Guardar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
