import { Input } from "@/components/ui/input";

interface DispatchSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string; // <--- Soporta className
}

export default function DispatchSearchInput({
  value,
  onChange,
  className = "", // <--- Default vacío
}: DispatchSearchInputProps) {
  return (
    <Input
      placeholder="Buscar por cliente..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className} // <--- Pasa la clase al input
    />
  );
}
