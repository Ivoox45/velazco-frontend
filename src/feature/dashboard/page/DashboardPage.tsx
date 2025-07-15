import { useState, useEffect } from "react";
import { DashboardCards } from "@/feature/dashboard/components/cards";
import { DashboardTabs } from "@/feature/dashboard/components/tabs";
import { DashboardGraphs } from "@/feature/dashboard/components/Graphs";
import { DailyReport } from "../components/table";
import { Card } from "@/components/ui/card";

// Importa los tours separados:
import { startTourDashboardGeneral, startTourDashboardReports } from "../../../tours/startTourDashboard";

export default function Dashboard() {
  const [tabValue, setTabValue] = useState<"general" | "reports">("general");

  // Registra SOLO window.startTour_dashboard, que detecta el tab activo
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.startTour_dashboard = () => {
        if (tabValue === "reports") {
          startTourDashboardReports();
        } else {
          startTourDashboardGeneral();
        }
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.startTour_dashboard;
      }
    };
  }, [tabValue]);

  return (
    <div className="p-6 space-y-6">
      <DashboardTabs value={tabValue} onChange={setTabValue} />
      {tabValue === "general" && (
        <>
          <div className="dashboard-cards">
            <DashboardCards />
          </div>
          <div className="dashboard-graphs">
            <DashboardGraphs />
          </div>
        </>
      )}
      {tabValue === "reports" && (
        <Card className="p-6 space-y-4 relative">
          <h3 className="text-lg font-semibold">Reportes de Ventas</h3>
          <div className="reporte-table">
            <DailyReport />
          </div>
        </Card>
      )}
    </div>
  );
}
