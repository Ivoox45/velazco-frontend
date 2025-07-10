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

const ROLE_OPTIONS = [
    { label: "Administrador", value: "Administrador" },
    { label: "Vendedor", value: "Vendedor" },
    { label: "Cajero", value: "Cajero" },
    { label: "Producción", value: "Producción" },
    { label: "Entregas", value: "Entregas" },
];

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: UserListResponseDto | null;
};

export function EditUserDialog({ open, onOpenChange, user }: Props) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState<string>("Administrador");
    const [activo, setActivo] = useState(true);
    const [password, setPassword] = useState("");

    const { data: rolesData } = useGetAllRoles();
    const { mutate: updateUser, isPending } = useUpdateUser();

    useEffect(() => {
        if (!user) return;

        setNombre(user.name ?? "");
        setCorreo(user.email ?? "");
        setRol(user.role ?? "Administrador");
        setActivo(user.active ?? true);
        setPassword("");
    }, [user]);

    const handleSave = () => {
        if (!user) return;

        const selectedRole = rolesData?.find((r) => r.name === rol);
        if (!selectedRole) {
            toast.error("Rol inválido");
            return;
        }

        const trimmedPassword = password.trim();

        const payload: any = {
            name: nombre.trim(),
            email: correo.trim(),
            roleId: selectedRole.id,
            active: activo,
        };

        if (trimmedPassword.length >= 6) {
            payload.password = trimmedPassword;
        }

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
                        value={rol}
                        onValueChange={(value) => setRol(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                            {ROLE_OPTIONS.map((r) => (
                                <SelectItem key={r.value} value={r.value}>
                                    {r.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2 select-none">
                        <Checkbox
                            id="activo"
                            checked={activo}
                            onCheckedChange={(checked) =>
                                setActivo(Boolean(checked))
                            }
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
