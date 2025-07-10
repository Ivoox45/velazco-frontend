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
import type { UserListResponseDto } from "../../types"; // ✅ CORREGIDO

// Mapeo estático rol (string) → id (number)
const ROLE_ID_MAP: Record<string, number> = {
    ADMIN: 1,
    SELLER: 2,
    CASHIER: 3,
    PRODUCTION: 4,
    DELIVERY: 5,
};

// Rol mostrado en tabla (texto) → identificador string
const ROLE_MAP_REVERSE: Record<string, keyof typeof ROLE_ID_MAP> = {
    Administrador: "ADMIN",
    Vendedor: "SELLER",
    Cajero: "CASHIER",
    Producción: "PRODUCTION",
    Entregas: "DELIVERY",
};

const ROLE_OPTIONS = [
    { label: "Administrador", value: "ADMIN" },
    { label: "Vendedor", value: "SELLER" },
    { label: "Cajero", value: "CASHIER" },
    { label: "Producción", value: "PRODUCTION" },
    { label: "Entregas", value: "DELIVERY" },
];

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: UserListResponseDto | null; // ✅ CORREGIDO
};

export function EditUserDialog({ open, onOpenChange, user }: Props) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState<keyof typeof ROLE_ID_MAP>("ADMIN");
    const [activo, setActivo] = useState(true);
    const [password, setPassword] = useState("");

    const { mutate: updateUser, isPending } = useUpdateUser();

    useEffect(() => {
        if (user) {
            setNombre(user.name || "");
            setCorreo(user.email || "");
            setRol(
                ROLE_MAP_REVERSE[user.role as keyof typeof ROLE_MAP_REVERSE] ||
                    "ADMIN"
            );
            setActivo(user.active ?? true);
            setPassword("");
        }
    }, [user]);

    const handleSave = () => {
        if (!user) return;

        updateUser(
            {
                id: user.id,
                payload: {
                    name: nombre,
                    email: correo,
                    roleId: ROLE_ID_MAP[rol],
                    active: activo,
                    password: password || undefined,
                },
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
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
                        onValueChange={(value) =>
                            setRol(value as keyof typeof ROLE_ID_MAP)
                        }
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

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="activo"
                            checked={activo}
                            onCheckedChange={(checked: boolean) =>
                                setActivo(!!checked)
                            }
                        />
                        <Label htmlFor="activo">Usuario activo</Label>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
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
