// src/utils/normalizeRole.ts
export function normalizeRole(role: string) {
  return role
    .normalize("NFD") // quita tildes
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}
