import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import useUpdateCategory from "@/feature/inventory/hooks/useUpdateCategory";

export default function CategoryEditForm({
    id,
    initialName,
    onClose,
}: {
    id: number;
    initialName: string;
    onClose: () => void;
}) {
    const [name, setName] = useState(initialName);
    const { mutate, isPending } = useUpdateCategory();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(
            { id, data: { name } },
            {
                onSuccess: () => {
                    toast.success("Categoría actualizada");
                    onClose();
                },
                onError: () => {
                    toast.error("Error al actualizar categoría");
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label className="block mb-2">Nombre</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <DialogFooter>
                <Button type="submit" disabled={isPending}>
                    Guardar cambios
                </Button>
            </DialogFooter>
        </form>
    );
}
