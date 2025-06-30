import { Input } from "@/components/ui/input";

interface SaleSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SaleSearchInput({
  value,
  onChange,
}: SaleSearchInputProps) {
  return (
    <Input
      placeholder="Buscar por cliente..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
