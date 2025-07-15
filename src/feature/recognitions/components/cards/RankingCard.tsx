import { Crown, Medal } from "lucide-react";

interface RankingCardProps {
  position: number;
  initials: string;
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

export default function RankingCard({
  position,
  initials,
  name,
  role,
  area,
  data,
}: RankingCardProps) {
  const areaColors = {
    vendedores: { text: "text-yellow-600", circleBg: "bg-yellow-200" },
    cajeros: { text: "text-blue-600", circleBg: "bg-blue-200" },
    entregas: { text: "text-purple-600", circleBg: "bg-purple-200" },
    produccion: { text: "text-orange-600", circleBg: "bg-orange-200" },
  };

  // Colores para las medallas del top 3
  const medalColors = [
    { bg: "bg-yellow-400", text: "text-yellow-900" }, // Oro
    { bg: "bg-gray-400", text: "text-gray-900" }, // Plata
    { bg: "bg-yellow-700", text: "text-yellow-100" }, // Bronce
  ];

  // Fondos para el card según posición
  const cardBgColors = [
    "bg-yellow-100", // Oro claro
    "bg-gray-200", // Plata claro
    "bg-orange-100", // Bronce claro/naranja suave
    "bg-white", // Normal
    "bg-white", // Normal
  ];

  const colors = areaColors[area];

  const isTopThree = position >= 1 && position <= 3;
  const medalColor = isTopThree ? medalColors[position - 1] : null;
  const cardBg =
    position >= 1 && position <= 5 ? cardBgColors[position - 1] : "bg-white";

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-md border border-transparent mb-2 ${cardBg}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
            isTopThree
              ? `${medalColor!.bg} ${medalColor!.text}`
              : `${colors.circleBg} text-gray-900`
          }`}
        >
          {position}
        </div>
        <div
          className={`text-lg ${isTopThree ? colors.text : "text-gray-400"}`}
        >
          {position === 1 ? <Crown /> : <Medal />}
        </div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${colors.circleBg} text-gray-900 font-bold`}
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>

      <div className="flex gap-8 font-semibold text-sm">
        {area === "vendedores" && (
          <>
            <div className="text-green-700 text-right">
              {data.ventas}
              <p className="font-normal text-xs text-gray-600">Ventas</p>
            </div>
            <div className="text-blue-700 text-right">
              ${data.monto?.toLocaleString()}
              <p className="font-normal text-xs text-gray-600">Monto</p>
            </div>
            <div className="text-purple-700 text-right">
              ${data.promedio}
              <p className="font-normal text-xs text-gray-600">Promedio</p>
            </div>
          </>
        )}
        {area === "cajeros" && (
          <>
            <div className="text-green-700 text-right">
              {data.ventas}
              <p className="font-normal text-xs text-gray-600">Ventas</p>
            </div>
            <div className="text-blue-700 text-right">
              ${data.monto?.toLocaleString()}
              <p className="font-normal text-xs text-gray-600">Monto</p>
            </div>
          </>
        )}
        {area === "entregas" && (
          <>
            <div className="text-purple-700 text-right">
              {data.entregas}
              <p className="font-normal text-xs text-gray-600">Entregas</p>
            </div>
            <div className="text-green-700 text-right">
              {data.puntualidad}
              <p className="font-normal text-xs text-gray-600">Puntualidad</p>
            </div>
            <div className="text-blue-700 text-right">
              {data.distancia}
              <p className="font-normal text-xs text-gray-600">Distancia</p>
            </div>
          </>
        )}
        {area === "produccion" && (
          <>
            <div className="text-orange-600 text-right">
              {data.ordenes}
              <p className="font-normal text-xs text-gray-600">Órdenes</p>
            </div>
            <div className="text-green-700 text-right">
              {data.unidades}
              <p className="font-normal text-xs text-gray-600">Unidades</p>
            </div>
            <div className="text-blue-700 text-right">
              {data.eficiencia}
              <p className="font-normal text-xs text-gray-600">Eficiencia</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
