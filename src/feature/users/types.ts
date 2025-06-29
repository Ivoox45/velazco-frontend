export type RolUsuario =
  | "Administrador"
  | "Vendedor"
  | "Cajero"
  | "Producción"
  | "Entregas";

export interface User {
  name: string;
  email: string;
  rol: RolUsuario;
  estado: "Activo" | "Inactivo";
  desc: string;
}