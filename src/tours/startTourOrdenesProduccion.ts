import { driver, type Side } from "driver.js";
import "driver.js/dist/driver.css";

/**
 * Inicia el tour para la página de órdenes de producción.
 * @param tab El tab activo: "nuevas" | "historial"
 */
export default function startTourOrdenesProduccion(tab: string = "nuevas") {
  const steps: Array<{
    element: string;
    popover: {
      title: string;
      description: string;
      side: Side;
    };
  }> = [
    {
      element: ".new-order-driver",
      popover: {
        title: "Crear Nueva Orden",
        description: "Haz clic aquí para crear una nueva orden de producción.",
        side: "left",
      },
    },
    {
      element: ".tabs-order-production-driver",
      popover: {
        title: "Ver órdenes y el historial",
        description: "Puedes cambiar entre órdenes nuevas y el historial aquí.",
        side: "bottom",
      },
    },
  ];

  // Paso condicional por tab
  if (tab === "nuevas") {
    steps.push({
      element: ".table-new-orders-driver",
      popover: {
        title: "Órdenes Nuevas",
        description: "Aquí ves todas las órdenes de producción recientes.",
        side: "top",
      },
    });
  }
  if (tab === "historial") {
    steps.push({
      element: ".table-history-orders-driver",
      popover: {
        title: "Historial de órdenes",
        description: "Aquí puedes consultar todas las órdenes pasadas.",
        side: "top",
      },
    });
  }

  driver({
    showProgress: true,
    steps,
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
  }).drive();
}
