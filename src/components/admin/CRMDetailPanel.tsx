import { useState, useEffect } from "react";
import { Lead } from "./LeadCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  FileText,
  DollarSign,
  Save,
  ExternalLink,
  Loader2,
  User,
  Activity,
} from "lucide-react";

interface CRMDetailPanelProps {
  lead: Lead | null;
  onUpdate: () => void;
}

const STATUS_OPTIONS = [
  { value: "New", label: "New", color: "bg-blue-500" },
  { value: "Contacted", label: "Contacted", color: "bg-purple-500" },
  { value: "Qualified", label: "Qualified", color: "bg-yellow-500" },
  { value: "Proposal", label: "Proposal", color: "bg-orange-500" },
  { value: "Won", label: "Won", color: "bg-green-500" },
  { value: "Lost", label: "Lost", color: "bg-red-500" },
];

const CRMDetailPanel = ({ lead, onUpdate }: CRMDetailPanelProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    status: "New",
    admin_notes: "",
    deal_value: "",
    follow_up_date: "",
  });

  // Reset form when lead changes
  useEffect(() => {
    if (lead) {
      setFormData({
        status: lead.status || "New",
        admin_notes: lead.admin_notes || "",
        deal_value: lead.deal_value?.toString() || "",
        follow_up_date: lead.follow_up_date
          ? format(new Date(lead.follow_up_date), "yyyy-MM-dd")
          : "",
      });
    }
  }, [lead]);

  if (!lead) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Select a lead to view details</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("leads")
        .update({
          status: formData.status,
          admin_notes: formData.admin_notes || null,
          deal_value: formData.deal_value ? parseFloat(formData.deal_value) : null,
          follow_up_date: formData.follow_up_date || null,
          last_contacted_at: new Date().toISOString(),
        })
        .eq("id", lead.id);

      if (error) throw error;

      toast({
        title: "Lead Updated",
        description: "Changes saved successfully",
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const statusOption = STATUS_OPTIONS.find((s) => s.value === (lead.status || "New"));

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-6 pr-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{lead.customer_name || "Unknown Lead"}</h2>
            <p className="text-sm text-muted-foreground">
              Lead #{lead.id.slice(0, 8)}
            </p>
          </div>
          <Badge className={`${statusOption?.color} text-white px-3 py-1`}>
            {statusOption?.label || "New"}
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <p className="text-lg font-bold">
                ${(lead.deal_value || 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Deal Value</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p className="text-lg font-bold">
                {format(new Date(lead.created_at), "MMM d")}
              </p>
              <p className="text-xs text-muted-foreground">Created</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Activity className="w-5 h-5 mx-auto mb-1 text-purple-500" />
              <p className="text-lg font-bold">
                {lead.last_contacted_at
                  ? format(new Date(lead.last_contacted_at), "MMM d")
                  : "Never"}
              </p>
              <p className="text-xs text-muted-foreground">Last Contact</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {lead.customer_email && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${lead.customer_email}`}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    {lead.customer_email}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
            {lead.customer_phone && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${lead.customer_phone}`}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    {lead.customer_phone}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
            {lead.zip_code && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm">ZIP: {lead.zip_code}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Request Details */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Request Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {lead.service_type && (
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Service Type</p>
                  <p className="text-sm font-medium">{lead.service_type}</p>
                </div>
              </div>
            )}
            {lead.urgency && (
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Urgency</p>
                  <Badge variant="outline">{lead.urgency}</Badge>
                </div>
              </div>
            )}
            {lead.project_details && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Project Details</p>
                <div className="p-3 bg-muted rounded-lg text-sm">
                  {lead.project_details}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* CRM Management */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              CRM Management
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-xs">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deal_value" className="text-xs flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Deal Value
                </Label>
                <Input
                  id="deal_value"
                  type="number"
                  placeholder="0.00"
                  className="h-9"
                  value={formData.deal_value}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, deal_value: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="follow_up_date" className="text-xs">Follow-up Date</Label>
              <Input
                id="follow_up_date"
                type="date"
                className="h-9"
                value={formData.follow_up_date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, follow_up_date: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin_notes" className="text-xs">Admin Notes</Label>
              <Textarea
                id="admin_notes"
                placeholder="Add notes about this lead..."
                rows={3}
                value={formData.admin_notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, admin_notes: e.target.value }))
                }
              />
            </div>

            <Button onClick={handleSave} disabled={isSaving} className="w-full">
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default CRMDetailPanel;
