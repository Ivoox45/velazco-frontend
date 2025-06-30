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

const weeklySalesData = [
  { day: "Lun", sales: 3100 },
  { day: "Mar", sales: 2900 },
  { day: "Mié", sales: 3300 },
  { day: "Jue", sales: 4300 },
  { day: "Vie", sales: 4700 },
  { day: "Sáb", sales: 5200 },
  { day: "Dom", sales: 3700 },
];

const paymentMethodData = [
  { name: "Efectivo", value: 40 },
  { name: "Tarjeta", value: 35 },
  { name: "Transferencia", value: 15 },
  { name: "Otros", value: 10 },
];

const COLORS = ["#f43f5e", "#ec4899", "#a78bfa", "#6366f1"];

export default function DashboardGraphs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold mb-2 px-4 pt-4">
          Ventas Semanales
        </h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySalesData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#f43f5e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-2 px-4 pt-4">
          Ventas por Método de Pago
        </h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentMethodData}
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
                {paymentMethodData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
