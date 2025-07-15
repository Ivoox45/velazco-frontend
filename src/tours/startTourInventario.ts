import { driver } from "driver.js";
import "driver.js/dist/driver.css";

/**
 * Tour interactivo para el módulo de Inventario.
 */
export default function startTourInventario() {
  driver({
    showProgress: true,
    allowClose: false,
    steps: [
      {
        element: ".agregar-producto-driver",
        popover: {
          title: "Agregar Producto",
          description: "Usa este botón para añadir un nuevo producto a tu inventario.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".categorias-driver",
        popover: {
          title: "Categorías",
          description: "Aquí puedes gestionar las categorías de tus productos.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: ".tabla-driver",
        popover: {
          title: "Tabla de Productos",
          description: "Aquí ves la lista completa de tus productos, puedes editarlos o eliminarlos.",
          side: "top",
          align: "start",
        },
      },
      {
        popover: {
          title: "¡Listo!",
          description: "Eso es todo, ya puedes usar el módulo de inventario.",
        },
      },
    ],
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
  }).drive();
}
