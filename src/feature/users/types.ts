// Enum de roles en español (tu tipo original)
export type RolUsuario =
  | "Administrador"
  | "Vendedor"
  | "Cajero"
  | "Producción"
  | "Entregas";

// User para vistas/tablas con descripciones y estado en español
export interface User {
  name: string;
  email: string;
  rol: RolUsuario;
  estado: "Activo" | "Inactivo";
  desc: string;
}

// ---------------- DTOs para el backend (en inglés, como el backend espera) ----------------

// Rol (para crear y actualizar usuario)
export interface RoleUserCreateResponseDto {
  id: number;
  name: string;
}
export interface RoleUserUpdateResponseDto {
  id: number;
  name: string;
}

// Para listado de usuarios
export interface UserListResponseDto {
  id: number;
  name: string;
  email: string;
  role: string; // Nombre del rol, ej: "ADMIN"
  active: boolean;
}

// Para la respuesta al crear usuario
export interface UserCreateResponseDto {
  id: number;
  name: string;
  email: string;
  active: boolean;
  role: RoleUserCreateResponseDto;
}

// Para la respuesta al actualizar usuario
export interface UserUpdateResponseDto {
  id: number;
  name: string;
  email: string;
  active: boolean;
  role: RoleUserUpdateResponseDto;
}

// Para crear usuario (request)
export interface UserCreateRequestDto {
  name: string;
  email: string;
  password: string;
  active?: boolean;
  roleId: number;
}

// Para actualizar usuario (request)
export interface UserUpdateRequestDto {
  name: string;
  email: string;
  password?: string;
  active?: boolean;
  roleId: number;
}
