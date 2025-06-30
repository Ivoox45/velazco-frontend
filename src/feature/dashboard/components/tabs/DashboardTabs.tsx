import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardTabsProps {
  value: "general" | "reports";
  onChange: (value: "general" | "reports") => void;
}

export default function DashboardTabs({ value, onChange }: DashboardTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(val) => onChange(val as "general" | "reports")}
      className="w-full"
    >
      <TabsList className="w-full bg-muted rounded-full p-1 flex">
        <TabsTrigger value="general" className="flex-1 text-center text-sm px-4">
          Vista General
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex-1 text-center text-sm px-4">
          Reportes
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
