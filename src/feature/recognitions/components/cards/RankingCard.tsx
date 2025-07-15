import { Crown, Award } from "lucide-react";
import { avatarVariants } from "@/components/ui/avatar";

interface RankingCardProps {
  position: number;
  initials?: string;
  name: string;
  role: string;
  area: "vendedores" | "cajeros" | "entregas" | "produccion";
  data: {
    ventas?: number;
    monto?: number;
    promedio?: number;
    clientes?: number;
    presicion?: number;
    entregas?: number;
    puntualidad?: string;
    distancia?: string;
    satisfechos?: number;
    ordenes?: number;
    unidades?: number;
    eficiencia?: string;
    calidad?: string;
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .substring(0, 2);
}

function getRoleVariant(rol: string) {
  switch (rol) {
    case "Administrador":
      return "admin";
    case "Vendedor":
      return "vendedor";
    case "Cajero":
      return "cajero";
    case "Producción":
      return "produccion";
    case "Entregas":
      return "entregas";
    default:
      return "default";
  }
}

export default function RankingCard({
  position,
  initials,
  name,
  role,
  area,
  data,
}: RankingCardProps) {
  const roleVariant = getRoleVariant(role);
  const circleClass = avatarVariants({ variant: roleVariant });

  const cardBgColors = [
    "bg-yellow-50 border-yellow-300", // Oro
    "bg-gray-100 border-gray-300", // Plata
    "bg-orange-50 border-orange-300", // Bronce
    "bg-white border-gray-300", // 4to puesto borde gris suave
    "bg-white border-gray-300", // 5to puesto borde gris suave
  ];

  const circleBgColors = [
    "bg-yellow-400 text-yellow-900",
    "bg-gray-400 text-gray-900",
    "bg-yellow-700 text-yellow-100",
  ];

  const cardBg =
    position >= 1 && position <= 5
      ? cardBgColors[position - 1]
      : "bg-white border-gray-300"; // Aquí borde gris también para posiciones > 5

  const isTopThree = position >= 1 && position <= 3;

  return (
    <div
      className={`flex items-center justify-between p-6 rounded-md border mb-3 ${cardBg}`}
      style={{ minHeight: "72px" }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-full font-semibold text-lg ${
            isTopThree
              ? circleBgColors[position - 1]
              : "bg-gray-200 text-gray-900"
          }`}
        >
          {position}
        </div>

        <div className="text-2xl">
          {position === 1 ? (
            <Crown className="text-yellow-600" />
          ) : position === 2 ? (
            <Award className="text-gray-600" />
          ) : position === 3 ? (
            <Award className="text-orange-600" />
          ) : (
            <Award className="text-gray-300" />
          )}
        </div>

        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${circleClass} text-gray-900 font-bold text-lg`}
        >
          {initials || getInitials(name)}
        </div>

        <div>
          <p className="font-semibold text-gray-900 text-lg">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>

      <div className="flex gap-12 font-semibold text-lg">
        {area === "vendedores" && (
          <>
            <div className="text-green-500 text-right">
              <span className="text-xl font-semibold">{data.ventas}</span>
              <p className="font-normal text-xs text-gray-500">Ventas</p>
            </div>
            <div className="text-blue-600 text-right">
              <span className="text-xl font-semibold">
                ${data.monto?.toLocaleString()}
              </span>
              <p className="font-normal text-xs text-gray-500">Monto</p>
            </div>
            <div className="text-purple-600 text-right">
              <span className="text-xl font-semibold">${data.promedio}</span>
              <p className="font-normal text-xs text-gray-500">Promedio</p>
            </div>
          </>
        )}
        {area === "cajeros" && (
          <>
            <div className="text-green-500 text-right">
              <span className="text-xl font-semibold">{data.ventas}</span>
              <p className="font-normal text-xs text-gray-500">Ventas</p>
            </div>
            <div className="text-blue-600 text-right">
              <span className="text-xl font-semibold">
                ${data.monto?.toLocaleString()}
              </span>
              <p className="font-normal text-xs text-gray-500">Monto</p>
            </div>
          </>
        )}
        {area === "entregas" && (
          <>
            <div className="text-purple-600 text-right">
              <span className="text-xl font-semibold">{data.entregas}</span>
              <p className="font-normal text-xs text-gray-500">Entregas</p>
            </div>
            <div className="text-green-500 text-right">
              <span className="text-xl font-semibold">{data.puntualidad}</span>
              <p className="font-normal text-xs text-gray-500">Puntualidad</p>
            </div>
            <div className="text-blue-600 text-right">
              <span className="text-xl font-semibold">{data.distancia}</span>
              <p className="font-normal text-xs text-gray-500">Distancia</p>
            </div>
          </>
        )}
        {area === "produccion" && (
          <>
            <div className="text-orange-600 text-right">
              <span className="text-xl font-semibold">{data.ordenes}</span>
              <p className="font-normal text-xs text-gray-500">Órdenes</p>
            </div>
            <div className="text-green-500 text-right">
              <span className="text-xl font-semibold">{data.unidades}</span>
              <p className="font-normal text-xs text-gray-500">Unidades</p>
            </div>
            <div className="text-blue-600 text-right">
              <span className="text-xl font-semibold">{data.eficiencia}</span>
              <p className="font-normal text-xs text-gray-500">Eficiencia</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
