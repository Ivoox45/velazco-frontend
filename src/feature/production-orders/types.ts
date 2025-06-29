export interface Producto {
  nombre: string;
  cantidad: number;
  unidad?: string;
}

export interface Orden {
  numero: string;
  creacion: string;
  fecha: string;
  prioridad?: string;
  responsable?: string;
  estado?: string;
  productos: Producto[];
  notas?: string;
}
