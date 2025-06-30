import { DashboardCards } from "@/feature/dashboard/components/cards";
import { DashboardTabs } from "@/feature/dashboard/components/tabs"; // import nombrado
import { DashboardGraphs } from "@/feature/dashboard/components/Graphs";
import { DailyReport } from "../components/table";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Dashboard() {
  const [tabValue, setTabValue] = useState<"general" | "reports">("general");

  return (
    <div className="p-6 space-y-6">
      <DashboardTabs value={tabValue} onChange={setTabValue} />

      {tabValue === "general" && (
        <>
          <DashboardCards />
          <DashboardGraphs />
        </>
      )}

      {tabValue === "reports" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Reportes de Ventas</h3>
          <DailyReport />
        </Card>
      )}
    </div>
  );
}
