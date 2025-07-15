import { driver } from "driver.js";
import "driver.js/dist/driver.css";

/**
 * Inicia el tour para la página de usuarios.
 */
export default function startTourUsuarios() {
  driver({
    showProgress: true,
    steps: [
      {
        element: ".new-user-driver",
        popover: {
          title: "Agregar nuevo usuario",
          description: "Crea un nuevo usuario para acceder al sistema.",
          side: "left",
        },
      },
      {
        element: ".roles-driver",
        popover: {
          title: "Gestionar roles",
          description: "Aquí puedes ver los roles y sus permisos.",
          side: "left",
        },
      },
      {
        element: ".table-users-driver",
        popover: {
          title: "Lista de usuarios",
          description: "Aquí están todos los usuarios registrados y puedes editarlos.",
          side: "top",
        },
      },
    ],
    nextBtnText: "Siguiente",
    prevBtnText: "Anterior",
    doneBtnText: "Listo",
    closeBtnText: "Cerrar",
    opacity: 0.6,
  }).drive();
}
