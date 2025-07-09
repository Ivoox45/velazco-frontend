// src/user/api/user.ts
import axios from "@/lib/axios";
import type {
  UserListResponseDto,
  UserCreateRequestDto,
  UserCreateResponseDto,
  UserUpdateRequestDto,
  UserUpdateResponseDto,
} from "../types";

// Obtener lista de usuarios
export async function getAllUsers(): Promise<UserListResponseDto[]> {
  const res = await axios.get("/users");
  return res.data;
}

// Crear usuario
export async function createUser(
  payload: UserCreateRequestDto
): Promise<UserCreateResponseDto> {
  const res = await axios.post("/users", payload);
  return res.data;
}

// Actualizar usuario por id
export async function updateUser(
  id: number,
  payload: UserUpdateRequestDto
): Promise<UserUpdateResponseDto> {
  const res = await axios.put(`/users/${id}`, payload);
  return res.data;
}

// Eliminar usuario por id
export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`/users/${id}`);
}

// (Opcional) Obtener roles disponibles, si tienes el endpoint
export async function getAllRoles(): Promise<{ id: number; name: string }[]> {
  const res = await axios.get("/roles/");
  return res.data;
}
