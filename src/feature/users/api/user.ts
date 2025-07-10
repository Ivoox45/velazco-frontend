// src/feature/users/api/user.ts
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

// Obtener roles disponibles
// src/feature/users/api/user.ts
export async function getAllRoles(): Promise<{ id: number; name: string; count: number }[]> {
  const res = await axios.get("/roles");
  return res.data;
}
