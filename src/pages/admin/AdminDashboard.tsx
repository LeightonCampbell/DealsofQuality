import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Download, 
  FileText, 
  Calendar, 
  Users, 
  BarChart3,
  RefreshCw,
  Mail,
  Phone
} from "lucide-react";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AdminUsersSection from "@/components/admin/AdminUsersSection";

type FormType = "booking" | "schedule" | "application" | "newsletter";

interface FormSubmission {
  id: string;
  form_type: FormType;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  service_category: string | null;
  specific_service: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  address: string | null;
  city: string | null;
  zip: string | null;
  years_experience: string | null;
  certifications: string | null;
  service_areas: string | null;
  created_at: string;
}

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    booking: 0,
    schedule: 0,
    application: 0,
    newsletter: 0,
    today: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(submissions.filter((s) => s.form_type === filter));
    }
  }, [filter, submissions]);

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

  const fetchSubmissions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch submissions",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const typedData = (data || []) as FormSubmission[];
    setSubmissions(typedData);
    calculateStats(typedData);
    setIsLoading(false);
  };

  const calculateStats = (data: FormSubmission[]) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    setStats({
      total: data.length,
      booking: data.filter((s) => s.form_type === "booking").length,
      schedule: data.filter((s) => s.form_type === "schedule").length,
      application: data.filter((s) => s.form_type === "application").length,
      newsletter: data.filter((s) => s.form_type === "newsletter").length,
      today: data.filter((s) => new Date(s.created_at) >= todayStart).length,
      thisWeek: data.filter((s) => new Date(s.created_at) >= weekStart).length,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const exportToCSV = () => {
    const headers = [
      "ID", "Type", "Name", "Email", "Phone", "Service Category", 
      "Specific Service", "Preferred Date", "Preferred Time", "Address",
      "City", "ZIP", "Years Experience", "Certifications", "Service Areas",
      "Message", "Created At"
    ];
    
    const csvData = filteredSubmissions.map((s) => [
      s.id,
      s.form_type,
      s.name,
      s.email,
      s.phone || "",
      s.service_category || "",
      s.specific_service || "",
      s.preferred_date || "",
      s.preferred_time || "",
      s.address || "",
      s.city || "",
      s.zip || "",
      s.years_experience || "",
      s.certifications || "",
      s.service_areas || "",
      s.message || "",
      s.created_at,
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `form_submissions_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();

    toast({
      title: "Export Complete",
      description: `${filteredSubmissions.length} submissions exported to CSV`,
    });
  };

  const chartData = [
    { name: "Booking", value: stats.booking },
    { name: "Schedule", value: stats.schedule },
    { name: "Application", value: stats.application },
    { name: "Newsletter", value: stats.newsletter },
  ];

  const getFormTypeBadge = (type: FormType) => {
    const labels: Record<FormType, string> = {
      booking: "Booking",
      schedule: "Schedule",
      application: "Application",
      newsletter: "Newsletter",
    };
    const styles: Record<FormType, string> = {
      booking: "bg-primary text-primary-foreground hover:bg-primary/80",
      schedule: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      application: "bg-violet-600 text-white hover:bg-violet-700",
      newsletter: "bg-pink-500 text-white hover:bg-pink-600",
    };
    return <Badge className={styles[type]}>{labels[type]}</Badge>;
  };

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
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Deals of Quality</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.newsletter}</p>
                  <p className="text-xs text-muted-foreground">Newsletter</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.booking}</p>
                  <p className="text-xs text-muted-foreground">Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.schedule}</p>
                  <p className="text-xs text-muted-foreground">Schedules</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.application}</p>
                  <p className="text-xs text-muted-foreground">Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.today}</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.thisWeek}</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Submissions by Type</CardTitle>
              <CardDescription>Distribution of form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
              <CardTitle>Submissions Overview</CardTitle>
              <CardDescription>Bar chart comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Users Management */}
        <AdminUsersSection />

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Form Submissions</CardTitle>
                <CardDescription>
                  {filteredSubmissions.length} submissions
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="booking">Booking</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={fetchSubmissions}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button onClick={exportToCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No submissions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Appointment</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{getFormTypeBadge(submission.form_type)}</TableCell>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1 text-sm">
                              <Mail className="w-3 h-3" />
                              {submission.email}
                            </span>
                            {submission.phone && (
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                {submission.phone}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {submission.service_category && (
                              <span className="text-sm">{submission.service_category}</span>
                            )}
                            {submission.specific_service && (
                              <span className="text-xs text-muted-foreground">{submission.specific_service}</span>
                            )}
                            {submission.years_experience && (
                              <span className="text-xs text-muted-foreground">{submission.years_experience} experience</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {submission.preferred_date && (
                              <span className="text-sm font-medium">
                                {submission.preferred_date}
                              </span>
                            )}
                            {submission.preferred_time && (
                              <span className="text-xs text-muted-foreground">
                                {submission.preferred_time === "morning" ? "Morning (8AM - 12PM)" :
                                 submission.preferred_time === "afternoon" ? "Afternoon (12PM - 5PM)" :
                                 submission.preferred_time === "evening" ? "Evening (5PM - 8PM)" :
                                 submission.preferred_time}
                              </span>
                            )}
                            {!submission.preferred_date && !submission.preferred_time && (
                              <span className="text-xs text-muted-foreground italic">Not specified</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(submission.created_at), "MMM d, yyyy h:mm a")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
