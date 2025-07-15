import { driver } from "driver.js";
import "driver.js/dist/driver.css";

/**
 * Inicia el tour interactivo para el módulo de entregas.
 * @param tab Estado de la pestaña/tab: "PAGADO" | "ENTREGADO"
 */
import type { DriveStep } from "driver.js";
import type { Side } from "driver.js";

export default function startTourEntregas(tab: string = "PAGADO") {
  const steps: DriveStep[] = [
    {
      element: ".search-entrega-driver",
      popover: {
        title: "Buscar cliente",
        description: "Puedes buscar entregas por nombre del cliente aquí.",
        side: "bottom" as Side,
      },
    },
    {
      element: ".tabs-entrega-driver",
      popover: {
        title: "Filtrar por estado",
        description: "Filtra las órdenes por Pagados o Entregados.",
        side: "bottom" as Side,
      },
    },
  ];

  if (tab === "PAGADO") {
    steps.push(
      {
        element: ".order-entrega-driver",
        popover: {
          title: "Pedido listo para entrega",
          description: "Aquí aparecen los pedidos listos para entregar.",
          side: "top" as Side,
        },
      },
      {
        element: ".confirm-entrega-driver",
        popover: {
          title: "Confirmar entrega",
          description: "Haz clic aquí para confirmar la entrega al cliente.",
          side: "left" as Side,
        },
      }
    );
  } else if (tab === "ENTREGADO") {
    steps.push(
      {
        element: ".order-entregado-driver",
        popover: {
          title: "Pedido entregado",
          description: "Aquí aparecen los pedidos que ya han sido entregados.",
          side: "top" as Side,
        },
      },
      {
        element: ".details-entregado-driver",
        popover: {
          title: "Ver detalles",
          description: "Haz clic aquí para ver los detalles del pedido entregado.",
          side: "left" as Side,
        },
      }
    );
  }

  driver({
    showProgress: true,
    steps,
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
  }).drive();
}
