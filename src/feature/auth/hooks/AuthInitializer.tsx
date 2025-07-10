import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  const { data, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  useEffect(() => {
    if (data) setUser(data);
    if (isError) setUser(null);
  }, [data, isError, setUser]);

  return <>{children}</>;
}
