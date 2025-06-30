import axios from "@/lib/axios";
import type {
  Category,
  CreateCategory,
  UpdateCategory,
  CategoryCreateResponse,
  CategoryUpdateResponse,
} from "../types";

export async function getCategories(): Promise<Category[]> {
  const res = await axios.get("/categories");
  return res.data;
}

export async function createCategory(
  payload: CreateCategory
): Promise<CategoryCreateResponse> {
  const res = await axios.post("/categories", payload);
  return res.data;
}

export async function updateCategory(
  id: number,
  payload: UpdateCategory
): Promise<CategoryUpdateResponse> {
  const res = await axios.put(`/categories/${id}`, payload);
  return res.data;
}

export async function deleteCategory(id: number): Promise<void> {
  await axios.delete(`/categories/${id}`);
}
