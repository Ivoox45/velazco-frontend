// src/production/components/types.ts

// Producto que entra a la orden
export type Product = {
  producto: string;
  cantidad: number;
};

// Estado interno de cada producto en el formulario de cierre
export type EstadoProducto = "COMPLETADO" | "INCOMPLETO";

// Para StartProductionDialog (puedes extender Product si quieres)
export type StartProduct = {
  producto: string;
  cantidad: string; // Ej: "10 unidades"
  responsable: string;
};

// Tabs de producción
export type EstadoProduccion = "PENDIENTE" | "PRODUCCION";
// src/production/types.ts

export type ProductOrder = {
  producto: string;
  subtitulo?: string;
  cantidad: string;
};

export type ProductoForm = {
  estado: "COMPLETADO" | "INCOMPLETO";
  cantidadProducida: number;
  motivo: string;
};

export type FinishResult = {
  producto: string;
  completado: boolean;
  cantidadProducida?: number;
  motivo?: string;
};
