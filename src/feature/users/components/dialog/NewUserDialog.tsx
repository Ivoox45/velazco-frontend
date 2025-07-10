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
import { useGetAllRoles } from "../../hooks/useGetAllRoles";
import { useCreateUser } from "../../hooks/useCreateUser";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function NewUserDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState(""); // ahora simplemente guarda el string del nombre del rol
    const [password, setPassword] = useState("");
    const [active, setActive] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const { data: rolesData, isLoading: rolesLoading } = useGetAllRoles();
    const { mutate, isPending } = useCreateUser();

    const handleCreate = () => {
        const selectedRole = rolesData?.find((r) => r.name === rol);
        if (!selectedRole) {
            toast.error("Seleccione un rol válido");
            return;
        }

        mutate(
            {
                name: nombre,
                email: correo,
                password,
                active,
                roleId: selectedRole.id,
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                    setNombre("");
                    setCorreo("");
                    setRol("");
                    setPassword("");
                    setActive(true);
                    toast.success("Usuario creado correctamente 🎉");
                },
                onError: () => {
                    toast.error("Hubo un error al crear el usuario");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                    <DialogDescription>
                        Complete los detalles para crear un nuevo usuario en el
                        sistema.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {/* Nombre */}
                    <div>
                        <label className="font-semibold block mb-1">
                            Nombre Completo
                        </label>
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
                    {/* Contraseña */}
                    <div>
                        <label className="font-semibold block mb-1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Rol */}
                    <div>
                        <label className="font-semibold block mb-1">Rol</label>
                        <Select
                            value={rol}
                            onValueChange={(v) => setRol(v)}
                            disabled={rolesLoading}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {rolesData?.map((r) => (
                                    <SelectItem key={r.id} value={r.name}>
                                        {r.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Estado activo */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="active"
                            checked={active}
                            onCheckedChange={(checked) => setActive(!!checked)}
                        />
                        <label
                            htmlFor="active"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                        >
                            Usuario activo
                        </label>
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
                            !nombre ||
                            !correo ||
                            !rol ||
                            !password ||
                            rolesLoading ||
                            isPending
                        }
                    >
                        Crear Usuario
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
