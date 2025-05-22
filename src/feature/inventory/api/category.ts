// src/features/categories/api/categories.ts
import axios from "@/lib/axios";
import type {
    Category,
    CreateCategory,
    UpdateCategory,
    CategoryCreateResponse,
    CategoryUpdateResponse,
} from "../types";

// 🔹 Obtener todas las categorías
export async function getCategories(): Promise<Category[]> {
    const res = await axios.get("/categories");
    return res.data;
}

// 🔹 Crear una nueva categoría
export async function createCategory(
    payload: CreateCategory
): Promise<CategoryCreateResponse> {
    const res = await axios.post("/categories", payload);
    return res.data;
}

// 🔹 Actualizar una categoría existente
export async function updateCategory(
    id: number,
    payload: UpdateCategory
): Promise<CategoryUpdateResponse> {
    const res = await axios.put(`/categories/${id}`, payload);
    return res.data;
}

// 🔹 Eliminar una categoría por ID
export async function deleteCategory(id: number): Promise<void> {
    await axios.delete(`/categories/${id}`);
}
