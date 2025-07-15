import { driver, type Side} from "driver.js";
import "driver.js/dist/driver.css";


export default function startTourCaja(tab: string = "PENDIENTE") {
  const steps = [
    {
      element: ".search-client-driver",
      popover: {
        title: "Buscar cliente",
        description: "Puedes buscar los pedidos por nombre del cliente aquí.",
        side: "bottom" as Side,
      },
    },
    {
      element: ".tabs-caja-driver",
      popover: {
        title: "Filtrar por estado",
        description: "Filtra los pedidos por Pendiente, Pagado o Cancelado.",
        side: "bottom" as Side,
      },
    }
  ];

  if (tab === "PENDIENTE") {
    steps.push(
      {
        element: ".order-pendiente-driver",
        popover: {
          title: "Pedido pendiente",
          description: "Aquí verás los pedidos pendientes de pago.",
          side: "top" as Side,
        },
      },
      {
        element: ".confirm-pendiente-driver",
        popover: {
          title: "Confirmar pago",
          description: "Haz clic aquí para confirmar el pago y seleccionar el método.",
          side: "left" as Side,
        },
      }
    );
  } else if (tab === "PAGADO") {
    steps.push(
      {
        element: ".order-pagado-driver",
        popover: {
          title: "Pedido pagado",
          description: "Aquí se muestran los pedidos ya pagados.",
          side: "top" as Side,
        },
      },
      {
        element: ".details-pagado-driver",
        popover: {
          title: "Ver detalles",
          description: "Haz clic aquí para ver los detalles del pedido pagado.",
          side: "left" as Side,
        },
      }
    );
  } else if (tab === "CANCELADO") {
    steps.push(
      {
        element: ".order-cancelado-driver",
        popover: {
          title: "Pedido cancelado",
          description: "Aquí se muestran los pedidos cancelados.",
          side: "top" as Side,
        },
      },
      {
        element: ".details-cancelado-driver",
        popover: {
          title: "Ver detalles",
          description: "Haz clic aquí para ver los detalles del pedido cancelado.",
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
