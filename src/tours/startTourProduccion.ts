import { driver } from "driver.js";
import "driver.js/dist/driver.css";

/**
 * Inicia el tour interactivo para el módulo de producción.
 * @param estado Estado actual de la producción ("PENDIENTE" | "EN_PROCESO")
 */
export default function startTourProduccion(estado: "PENDIENTE" | "EN_PROCESO" = "PENDIENTE") {
  const steps = [
    {
      element: ".production-tabs-driver",
      popover: {
        title: "Ver estados de la orden",
        description: "Filtra entre orden pendiente y en producción.",
        side: "bottom",
      },
    },
    // Botón dinámico
    estado === "PENDIENTE"
      ? {
          element: ".start-production-driver",
          popover: {
            title: "Iniciar Producción",
            description: "Haz clic aquí para iniciar la orden del día.",
            side: "left",
          },
        }
      : {
          element: ".finish-production-driver",
          popover: {
            title: "Finalizar Orden",
            description:
              "Cuando termines la producción, haz clic aquí para finalizar y registrar cantidades reales.",
            side: "left",
          },
        },
    {
      element: ".instructions-driver",
      popover: {
        title: "Instrucciones de la orden",
        description: "Lee las instrucciones antes de comenzar.",
        side: "top",
      },
    },
    {
      element: ".table-production-driver",
      popover: {
        title: "Productos por producir",
        description: "Aquí ves los productos y cantidades requeridas.",
        side: "top",
      },
    },
  ];

  driver({
    showProgress: true,
    steps,
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
    closeBtnText: "Cerrar",
    opacity: 0.6,
  }).drive();
}
