import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReportTabsProps {
  value: "daily" | "monthly";
  onChange: (value: "daily" | "monthly") => void;
}

export default function ReportTabs({ value, onChange }: ReportTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(val) => onChange(val as "daily" | "monthly")}
      className="w-full"
    >
      <TabsList className="w-full bg-muted rounded-full p-1 flex">
        <TabsTrigger value="daily" className="flex-1 text-center text-sm px-4">
          Diario
        </TabsTrigger>
        <TabsTrigger
          value="monthly"
          className="flex-1 text-center text-sm px-4"
        >
          Mensual
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
