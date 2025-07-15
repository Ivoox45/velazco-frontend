import { driver } from "driver.js";
import "driver.js/dist/driver.css";

/**
 * Inicia el tour interactivo para el módulo de pedidos.
 */
export default function startTourPedidos() {
  driver({
    showProgress: true,
    steps: [
      {
        element: ".cart-sheet-driver",
        popover: {
          title: "Carrito",
          description: "Aquí puedes ver y finalizar tus pedidos.",
          side: "left",
        },
      },
      {
        element: ".search-driver",
        popover: {
          title: "Buscar productos",
          description: "Busca productos por nombre rápidamente.",
          side: "bottom",
        },
      },
      {
        element: ".category-driver",
        popover: {
          title: "Filtrar por categoría",
          description: "Filtra productos por la categoría seleccionada.",
          side: "bottom",
        },
      },
      {
        element: ".producto-driver",
        popover: {
          title: "Producto",
          description: "Así se ve un producto. Haz clic en 'Agregar' para añadirlo al carrito.",
          side: "top",
        },
      },
    ],
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
  }).drive();
}
