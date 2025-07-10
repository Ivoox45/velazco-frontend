// src/feature/auth/api/auth.ts
import axios from "@/lib/axios";
import type { AuthLoginRequestDto, AuthLoginResponseDto } from "../types";
import type { AuthUser } from "@/store/useAuthStore";

// Iniciar sesión
export async function login(
  payload: AuthLoginRequestDto
): Promise<AuthLoginResponseDto> {
  const res = await axios.post("/auth/login", payload);
  return res.data;
}
export async function getProfile(): Promise<AuthUser> {
  const res = await axios.get("/profile");
  return res.data;
}
export async function logout(): Promise<{ message: string }> {
  const res = await axios.post("/auth/logout");
  return res.data;
}
