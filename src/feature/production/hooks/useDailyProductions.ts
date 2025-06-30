import { useQuery } from "@tanstack/react-query";
import { getDailyProductions } from "../api/production";

export default function useDailyProductions() {
  return useQuery({
    queryKey: ["daily-productions"],
    queryFn: getDailyProductions,
  });
}