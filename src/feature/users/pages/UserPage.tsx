import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, ShieldCheck } from "lucide-react";
import { UserTable, NewUserDialog, RolesSystemDialog } from "../components";
import { EditUserDialog } from "../components/dialog/EditUserDialog";
import { useState } from "react";

export default function UserPage() {
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [rolesDialogOpen, setRolesDialogOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            <div>
              <CardTitle className="text-2xl">Lista de Usuarios</CardTitle>
              <CardDescription>
                Gestione los usuarios y sus roles en el sistema.
              </CardDescription>
            </div>
            <div className="flex flex-row gap-2 justify-start md:justify-end">
              <div className="flex flex-col gap-2 w-full md:flex-row md:justify-end md:w-auto">
                <Button
                  className="w-full md:w-auto"
                  variant="default"
                  onClick={() => setNewUserOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nuevo Usuario
                </Button>
                <Button
                  className="w-full md:w-auto"
                  variant="outline"
                  onClick={() => setRolesDialogOpen(true)}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Roles
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <UserTable
            onEditUser={(user) => {
              setSelectedUser(user);
              setEditUserOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <NewUserDialog open={newUserOpen} onOpenChange={setNewUserOpen} />
      <RolesSystemDialog
        open={rolesDialogOpen}
        onOpenChange={setRolesDialogOpen}
      />
      <EditUserDialog
        open={editUserOpen}
        onOpenChange={setEditUserOpen}
        user={selectedUser}
      />
    </div>
  );
}
