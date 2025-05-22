"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import useCreateCategory from "@/feature/inventory/hooks/useCreateCategory";

export default function CategoryCreateForm({
    onClose,
}: {
    onClose: () => void;
}) {
    const [name, setName] = useState("");
    const { mutate, isPending } = useCreateCategory();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        mutate(
            { name },
            {
                onSuccess: () => {
                    toast.success("Categoría creada");
                    setName("");
                    onClose();
                },
                onError: () => {
                    toast.error("Error al crear categoría");
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
                    Crear
                </Button>
            </DialogFooter>
        </form>
    );
}
