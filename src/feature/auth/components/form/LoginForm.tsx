import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "../../hooks/useLogin";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { normalizeRole } from "@/utils/normalizeRole";

// Devuelve la ruta home según el rol
function getHomeRouteByRole(role?: string) {
  switch (normalizeRole(role ?? "")) {
    case "ADMINISTRADOR":
      return "/dashboard";
    case "CAJERO":
      return "/caja";
    case "VENDEDOR":
      return "/pedidos";
    case "PRODUCCION":
      return "/produccion";
    case "ENTREGAS":
      return "/entregas";
    default:
      return "/reconocimientos";
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (shouldRedirect && user?.role) {
      navigate(getHomeRouteByRole(user.role));
    }
  }, [shouldRedirect, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      await queryClient.refetchQueries({ queryKey: ["profile"] });
      toast.success("Inicio de sesión exitoso");
      setShouldRedirect(true);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Error al iniciar sesión";
      toast.error(msg);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex text-center justify-between">
            <div>
              <CardTitle className="mb-2">Iniciar sesión</CardTitle>
              <CardDescription>
                Ingresa tu correo y contraseña para acceder al intranet
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tucorreo@empresa.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loginMutation.isPending}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    disabled={loginMutation.isPending}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Ingresando..." : "Iniciar sesión"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6 text-xs text-gray-500 text-center select-none">
        &copy; {new Date().getFullYear()} Intranet - Velazco
      </div>
    </div>
  );
}
