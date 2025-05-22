"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";

import { useGetCategories, useDeleteCategory } from "@/feature/inventory/hooks";
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryEditForm from "./CategoryEditForm";

export default function CategoriesModal() {
    const { data: categories, isLoading } = useGetCategories();
    const { mutate: deleteCategory } = useDeleteCategory();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<{
        id: number;
        name: string;
    } | null>(null);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Gestionar Categorías</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Categorías</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {isLoading && <p>Cargando categorías...</p>}
                        {!isLoading && categories?.length === 0 && (
                            <p className="text-muted-foreground">
                                No hay categorías registradas.
                            </p>
                        )}

                        <ul className="space-y-2">
                            {categories?.map((cat) => (
                                <li
                                    key={cat.id}
                                    className="flex items-center justify-between border px-3 py-2 rounded"
                                >
                                    <span>{cat.name}</span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                setEditingCategory({
                                                    id: cat.id,
                                                    name: cat.name,
                                                })
                                            }
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                deleteCategory(cat.id, {
                                                    onSuccess: () =>
                                                        toast.success(
                                                            "Categoría eliminada"
                                                        ),
                                                    onError: () =>
                                                        toast.error(
                                                            "Error al eliminar"
                                                        ),
                                                })
                                            }
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <Button
                            onClick={() => setShowCreateModal(true)}
                            className="w-full"
                        >
                            Crear nueva categoría
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Modal Crear Categoría */}
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Categoría</DialogTitle>
                    </DialogHeader>
                    <CategoryCreateForm
                        onClose={() => setShowCreateModal(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Modal Editar Categoría */}
            <Dialog
                open={!!editingCategory}
                onOpenChange={() => setEditingCategory(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Categoría</DialogTitle>
                    </DialogHeader>
                    {editingCategory && (
                        <CategoryEditForm
                            id={editingCategory.id}
                            initialName={editingCategory.name}
                            onClose={() => setEditingCategory(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
