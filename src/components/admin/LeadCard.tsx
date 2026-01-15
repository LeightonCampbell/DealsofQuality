import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";

export interface Lead {
  id: string;
  service_type: string | null;
  zip_code: string | null;
  urgency: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  project_details: string | null;
  status: string | null;
  created_at: string;
  admin_notes?: string | null;
  deal_value?: number | null;
  follow_up_date?: string | null;
  last_contacted_at?: string | null;
}

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

const urgencyColors: Record<string, string> = {
  "Within 24 hours": "bg-red-500/10 text-red-600 border-red-200",
  "Within a few days": "bg-orange-500/10 text-orange-600 border-orange-200",
  "Within a week": "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  "Flexible": "bg-green-500/10 text-green-600 border-green-200",
};

const LeadCard = ({ lead, onClick }: LeadCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: lead,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 50 : undefined,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? "opacity-50" : ""}`}
    >
      <Card className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
        <CardContent className="p-3 space-y-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-sm truncate">
              {lead.customer_name || "Unknown"}
            </h4>
            {lead.deal_value && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                <DollarSign className="w-3 h-3 mr-0.5" />
                {lead.deal_value.toLocaleString()}
              </Badge>
            )}
          </div>

          {/* Service */}
          {lead.service_type && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {lead.service_type}
            </p>
          )}

          {/* Urgency Badge */}
          {lead.urgency && (
            <Badge 
              variant="outline" 
              className={`text-xs ${urgencyColors[lead.urgency] || "bg-muted"}`}
            >
              {lead.urgency}
            </Badge>
          )}

          {/* Contact Info */}
          <div className="space-y-1 pt-1 border-t border-border/50">
            {lead.customer_email && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Mail className="w-3 h-3 shrink-0" />
                <span className="truncate">{lead.customer_email}</span>
              </div>
            )}
            {lead.customer_phone && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="w-3 h-3 shrink-0" />
                <span>{lead.customer_phone}</span>
              </div>
            )}
            {lead.zip_code && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 shrink-0" />
                <span>ZIP: {lead.zip_code}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(lead.created_at), "MMM d")}
            </div>
            {lead.follow_up_date && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                Follow-up: {format(new Date(lead.follow_up_date), "MMM d")}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadCard;
