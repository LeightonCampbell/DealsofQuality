import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Trash2, RefreshCw, Shield, Mail } from "lucide-react";
import { format } from "date-fns";

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  email: string | null;
  created_at: string | null;
}

const AdminUsersSection = () => {
  const { toast } = useToast();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchAdminUsers();
  }, []);

  const fetchCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setCurrentUserId(session.user.id);
    }
  };

  const fetchAdminUsers = async () => {
    setIsLoading(true);
    
    // Get all admin roles with profile info
    const { data: rolesData, error: rolesError } = await supabase
      .from("user_roles")
      .select("id, user_id, role")
      .eq("role", "admin");

    if (rolesError) {
      toast({
        title: "Error",
        description: "Failed to fetch admin users",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Get profile emails for each admin
    const adminUsersWithEmails: AdminUser[] = [];
    
    for (const role of rolesData || []) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("email, created_at")
        .eq("id", role.user_id)
        .maybeSingle();

      adminUsersWithEmails.push({
        id: role.id,
        user_id: role.user_id,
        role: role.role,
        email: profileData?.email || null,
        created_at: profileData?.created_at || null,
      });
    }

    setAdminUsers(adminUsersWithEmails);
    setIsLoading(false);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;

    setIsAdding(true);

    // Find user by email in profiles
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", newAdminEmail.trim().toLowerCase())
      .maybeSingle();

    if (profileError || !profileData) {
      toast({
        title: "User Not Found",
        description: "No user found with this email. They must sign up first at /admin.",
        variant: "destructive",
      });
      setIsAdding(false);
      return;
    }

    // Check if already admin
    const { data: existingRole } = await supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", profileData.id)
      .eq("role", "admin")
      .maybeSingle();

    if (existingRole) {
      toast({
        title: "Already Admin",
        description: "This user already has admin access.",
        variant: "destructive",
      });
      setIsAdding(false);
      return;
    }

    // Add admin role
    const { error: insertError } = await supabase
      .from("user_roles")
      .insert({ user_id: profileData.id, role: "admin" });

    if (insertError) {
      toast({
        title: "Error",
        description: "Failed to add admin role. You may not have permission.",
        variant: "destructive",
      });
      setIsAdding(false);
      return;
    }

    toast({
      title: "Admin Added",
      description: `${newAdminEmail} now has admin access.`,
    });

    setNewAdminEmail("");
    fetchAdminUsers();
    setIsAdding(false);
  };

  const handleRemoveAdmin = async (userId: string, email: string | null) => {
    if (userId === currentUserId) {
      toast({
        title: "Cannot Remove",
        description: "You cannot remove your own admin access.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", "admin");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove admin role. You may not have permission.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Admin Removed",
      description: `${email || "User"} no longer has admin access.`,
    });

    fetchAdminUsers();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>Manage who has admin access</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Admin Form */}
        <form onSubmit={handleAddAdmin} className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="newAdminEmail" className="sr-only">Email</Label>
            <Input
              id="newAdminEmail"
              type="email"
              placeholder="Enter email of registered user..."
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isAdding || !newAdminEmail.trim()}>
            {isAdding ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4 mr-2" />
            )}
            Add Admin
          </Button>
        </form>

        {/* Admin Users List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : adminUsers.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No admin users found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {admin.email || "Unknown"}
                        {admin.user_id === currentUserId && (
                          <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {admin.created_at 
                      ? format(new Date(admin.created_at), "MMM d, yyyy") 
                      : "Unknown"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAdmin(admin.user_id, admin.email)}
                      disabled={admin.user_id === currentUserId}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUsersSection;
