import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useWeeklySales } from "../../hooks/useWeeklySales";
import { useSalesByPaymentMethod } from "../../hooks/useSalesByPaymentMethod";
import { parseISO, isThisWeek } from "date-fns";

const COLORS = ["#f43f5e", "#ec4899", "#a78bfa", "#6366f1"];

const DIAS_ORDEN = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
const LABELS = {
  SUNDAY: "Dom",
  MONDAY: "Lun",
  TUESDAY: "Mar",
  WEDNESDAY: "Mié",
  THURSDAY: "Jue",
  FRIDAY: "Vie",
  SATURDAY: "Sáb",
};

export default function DashboardGraphs() {
  const { data: weeklySalesData, isLoading: loadingWeekly } = useWeeklySales();
  const { data: paymentMethodData, isLoading: loadingPayment } =
    useSalesByPaymentMethod();

  // Solo muestra ventas de la SEMANA ACTUAL (según fecha del sistema)
  let currentWeek = null;

  if (weeklySalesData) {
    // Buscar la semana que contiene HOY
    currentWeek = weeklySalesData.find((week) =>
      isThisWeek(parseISO(week.startDate), { weekStartsOn: 0 }) // Domingo inicia la semana
    );

    // Si no encuentra la actual (ej. en demo o test), agarra la última semana disponible
    if (!currentWeek && weeklySalesData.length > 0) {
      // Ordena por startDate descendente y agarra la más reciente
      currentWeek = weeklySalesData
        .slice()
        .sort(
          (a, b) =>
            parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime()
        )[0];
    }
  }

  // Agrupa ventas por día SOLO de la semana seleccionada
  const salesByDay = {};
  if (currentWeek) {
    for (const order of currentWeek.orders) {
      const day = order.dayOfWeek;
      salesByDay[day] = (salesByDay[day] || 0) + order.orderTotal;
    }
  }

  const barChartData = DIAS_ORDEN.map((dayOfWeek) => ({
    day: LABELS[dayOfWeek],
    sales: salesByDay[dayOfWeek] || 0,
  }));

  // Adaptar datos para el PieChart
  const pieChartData = paymentMethodData
    ? paymentMethodData.map((item) => ({
        name: item.paymentMethod,
        value: item.percentage,
      }))
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold mb-2 px-4 pt-4">
          Ventas de la Semana Actual
        </h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            {loadingWeekly ? (
              <div className="flex items-center justify-center h-full">
                Cargando...
              </div>
            ) : (
              <BarChart data={barChartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#f43f5e" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-2 px-4 pt-4">
          Ventas por Método de Pago
        </h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            {loadingPayment ? (
              <div className="flex items-center justify-center h-full">
                Cargando...
              </div>
            ) : (
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    percent !== undefined
                      ? `${name} ${(percent * 100).toFixed(0)}%`
                      : name
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
