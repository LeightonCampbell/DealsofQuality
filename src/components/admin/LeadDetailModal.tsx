import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import type { Lead } from "./LeadCard";

interface LeadDetailModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const LeadDetailModal = ({ lead, open, onOpenChange, onUpdate }: LeadDetailModalProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    status: lead?.status || "New",
    admin_notes: lead?.admin_notes || "",
    deal_value: lead?.deal_value?.toString() || "",
    follow_up_date: lead?.follow_up_date
      ? format(new Date(lead.follow_up_date), "yyyy-MM-dd")
      : "",
  });

  // Reset form when lead changes
  useState(() => {
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
  });

  if (!lead) return null;

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
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {lead.customer_name || "Unknown Lead"}
            </DialogTitle>
            <Badge className={`${statusOption?.color} text-white`}>
              {statusOption?.label || "New"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Contact Info
              </h3>
              {lead.customer_email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`mailto:${lead.customer_email}`}
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    {lead.customer_email}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              {lead.customer_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`tel:${lead.customer_phone}`}
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    {lead.customer_phone}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              {lead.zip_code && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>ZIP: {lead.zip_code}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Request Details
              </h3>
              {lead.service_type && (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.service_type}</span>
                </div>
              )}
              {lead.urgency && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="outline">{lead.urgency}</Badge>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  Submitted: {format(new Date(lead.created_at), "MMM d, yyyy h:mm a")}
                </span>
              </div>
            </div>
          </div>

          {/* Project Details */}
          {lead.project_details && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Project Details
              </h3>
              <div className="p-3 bg-muted rounded-lg text-sm">
                {lead.project_details}
              </div>
            </div>
          )}

          <Separator />

          {/* CRM Fields */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              CRM Management
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
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
                <Label htmlFor="deal_value">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Deal Value
                  </div>
                </Label>
                <Input
                  id="deal_value"
                  type="number"
                  placeholder="0.00"
                  value={formData.deal_value}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, deal_value: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="follow_up_date">Follow-up Date</Label>
                <Input
                  id="follow_up_date"
                  type="date"
                  value={formData.follow_up_date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, follow_up_date: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  placeholder="Add notes about this lead..."
                  rows={4}
                  value={formData.admin_notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, admin_notes: e.target.value }))
                  }
                />
              </div>
            </div>

            {lead.last_contacted_at && (
              <p className="text-xs text-muted-foreground">
                Last contacted: {format(new Date(lead.last_contacted_at), "MMM d, yyyy h:mm a")}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailModal;
