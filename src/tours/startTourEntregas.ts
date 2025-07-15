import { driver } from "driver.js";
import "driver.js/dist/driver.css";

/**
 * Inicia el tour interactivo para el módulo de entregas.
 * @param tab Estado de la pestaña/tab: "PAGADO" | "ENTREGADO"
 */
export default function startTourEntregas(tab: string = "PAGADO") {
  let steps = [
    {
      element: ".search-entrega-driver",
      popover: {
        title: "Buscar cliente",
        description: "Puedes buscar entregas por nombre del cliente aquí.",
        side: "bottom",
      },
    },
    {
      element: ".tabs-entrega-driver",
      popover: {
        title: "Filtrar por estado",
        description: "Filtra las órdenes por Pagados o Entregados.",
        side: "bottom",
      },
    },
  ];

  // Paso dinámico según el tab seleccionado
  if (tab === "PAGADO") {
    steps.push(
      {
        element: ".order-entrega-driver",
        popover: {
          title: "Pedido listo para entrega",
          description: "Aquí aparecen los pedidos listos para entregar.",
          side: "top",
        },
      },
      {
        element: ".confirm-entrega-driver",
        popover: {
          title: "Confirmar entrega",
          description: "Haz clic aquí para confirmar la entrega al cliente.",
          side: "left",
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
          side: "top",
        },
      },
      {
        element: ".details-entregado-driver",
        popover: {
          title: "Ver detalles",
          description: "Haz clic aquí para ver los detalles del pedido entregado.",
          side: "left",
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
    closeBtnText: "Cerrar",
    opacity: 0.6,
  }).drive();
}
