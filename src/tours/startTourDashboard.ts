import { driver } from "driver.js";
import "driver.js/dist/driver.css";

/**
 * Tour para la pestaña de General
 */
export function startTourDashboardGeneral() {
  driver({
    showProgress: true,
    steps: [
      {
        element: ".dashboard-cards",
        popover: {
          title: "Resumen del día",
          description: "Aquí puedes ver los indicadores clave de tu negocio.",
          side: "top",
        },
      },
      {
        element: ".dashboard-graphs",
        popover: {
          title: "Gráficas",
          description: "Visualiza el comportamiento de tus ventas aquí.",
          side: "top",
        },
      },
    ],
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
  }).drive();
}

/**
 * Tour para la pestaña de Reportes
 */
export function startTourDashboardReports() {
  driver({
    showProgress: true,
    steps: [
      {
        element: ".reporte-table",
        popover: {
          title: "Tabla de Reportes",
          description: "Aquí puedes ver el resumen de ventas por día.",
          side: "top",
        },
      },
      {
        element: ".accion-pdf",
        popover: {
          title: "Descargar PDF",
          description: "Haz clic aquí para descargar el reporte del día como PDF.",
          side: "left",
        },
      },
    ],
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
  }).drive();
}
