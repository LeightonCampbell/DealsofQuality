import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Download, 
  FileText, 
  BarChart3,
  RefreshCw,
  Users,
  Kanban
} from "lucide-react";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AdminUsersSection from "@/components/admin/AdminUsersSection";
import CRMBoard from "@/components/admin/CRMBoard";
import type { Lead } from "@/components/admin/LeadCard";

const COLORS = ["#3b82f6", "#a855f7", "#eab308", "#f97316", "#22c55e", "#ef4444"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal: 0,
    won: 0,
    lost: 0,
    today: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchLeads();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin");
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const typedData = (data || []) as Lead[];
    setLeads(typedData);
    calculateStats(typedData);
    setIsLoading(false);
  };

  const calculateStats = (data: Lead[]) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    setStats({
      total: data.length,
      new: data.filter((l) => (l.status || "New") === "New").length,
      contacted: data.filter((l) => l.status === "Contacted").length,
      qualified: data.filter((l) => l.status === "Qualified").length,
      proposal: data.filter((l) => l.status === "Proposal").length,
      won: data.filter((l) => l.status === "Won").length,
      lost: data.filter((l) => l.status === "Lost").length,
      today: data.filter((l) => new Date(l.created_at) >= todayStart).length,
      thisWeek: data.filter((l) => new Date(l.created_at) >= weekStart).length,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const exportToCSV = () => {
    const headers = [
      "ID", "Service Type", "Zip Code", "Urgency", "Customer Name", 
      "Customer Email", "Customer Phone", "Project Details", "Status", 
      "Deal Value", "Admin Notes", "Follow-up Date", "Created At"
    ];
    
    const csvData = leads.map((l) => [
      l.id,
      l.service_type || "",
      l.zip_code || "",
      l.urgency || "",
      l.customer_name || "",
      l.customer_email || "",
      l.customer_phone || "",
      l.project_details || "",
      l.status || "",
      l.deal_value || "",
      l.admin_notes || "",
      l.follow_up_date || "",
      l.created_at,
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();

    toast({
      title: "Export Complete",
      description: `${leads.length} leads exported to CSV`,
    });
  };

  const chartData = [
    { name: "New", value: stats.new, fill: COLORS[0] },
    { name: "Contacted", value: stats.contacted, fill: COLORS[1] },
    { name: "Qualified", value: stats.qualified, fill: COLORS[2] },
    { name: "Proposal", value: stats.proposal, fill: COLORS[3] },
    { name: "Won", value: stats.won, fill: COLORS[4] },
    { name: "Lost", value: stats.lost, fill: COLORS[5] },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">CRM Dashboard</h1>
              <p className="text-sm text-muted-foreground">Deals of Quality</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={fetchLeads} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="crm" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="crm" className="flex items-center gap-2">
                <Kanban className="w-4 h-4" />
                CRM Pipeline
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
            </TabsList>
            <p className="text-sm text-muted-foreground">
              {stats.total} total leads • {stats.today} today
            </p>
          </div>

          {/* CRM Tab */}
          <TabsContent value="crm" className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <CRMBoard leads={leads} onUpdate={fetchLeads} />
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.total}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {[
                { label: "New", value: stats.new, color: "bg-blue-500" },
                { label: "Contacted", value: stats.contacted, color: "bg-purple-500" },
                { label: "Qualified", value: stats.qualified, color: "bg-yellow-500" },
                { label: "Proposal", value: stats.proposal, color: "bg-orange-500" },
                { label: "Won", value: stats.won, color: "bg-green-500" },
                { label: "Lost", value: stats.lost, color: "bg-red-500" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pipeline Distribution</CardTitle>
                  <CardDescription>Leads by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.filter(d => d.value > 0)}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pipeline Overview</CardTitle>
                  <CardDescription>Bar chart comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="name" className="text-muted-foreground" fontSize={12} />
                        <YAxis className="text-muted-foreground" />
                        <Tooltip />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <AdminUsersSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
