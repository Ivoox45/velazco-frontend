import { useState } from "react";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./ui/theme-toggle";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logout as logoutApi } from "@/feature/auth/api/auth"; // logout API
import { toast } from "sonner"; // feedback visual

export function NavUser({
  user,
}: {
  user: { name: string; email: string; avatar: string; initials: string };
}) {
  const { isMobile } = useSidebar();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  // Estado para el dialog
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      await logoutApi(); // Hace logout en backend (borra cookie/session)
      toast.success("Sesión cerrada correctamente.");
    } catch (e) {
      toast.error(
        "No se pudo cerrar sesión en el servidor, pero se cerró localmente."
      );
    }
    logout(); // Limpia estado local (zustand)
    setOpen(false);
    navigate("/"); // Regresa al login
  };


  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : null}
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : null}
                    <AvatarFallback className="dark:text-white">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <ThemeToggle />
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpenProfile(true)}>
                  <BadgeCheck />
                  Cuenta
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* El logout ahora solo abre el modal */}
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <LogOut />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Dialog de confirmación */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Desea cerrar sesión?</DialogTitle>
            <DialogDescription>
              Se cerrará tu sesión actual y regresarás al inicio de sesión.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmLogout}>
              Cerrar sesión
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perfil de usuario</DialogTitle>
            <DialogDescription>Consulta tus datos de cuenta.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            <Avatar className="w-16 h-16">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : null}
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            <div className="text-center space-y-1">
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <div className="text-sm">
                Rol: <span className="font-medium">{user.role}</span>
              </div>
              <div className="text-sm">
                Estado:{" "}
                {user.active ? (
                  <span className="text-green-600 font-semibold">Activo</span>
                ) : (
                  <span className="text-red-600 font-semibold">Inactivo</span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenProfile(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
