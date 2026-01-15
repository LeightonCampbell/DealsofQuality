import { Lead } from "./LeadCard";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Mail, Phone, DollarSign, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CRMLeadListProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onSelectLead: (lead: Lead) => void;
  filter: string;
}

const urgencyColors: Record<string, string> = {
  "Within 24 hours": "text-red-600",
  "Within a few days": "text-orange-600",
  "Within a week": "text-yellow-600",
  "Flexible": "text-green-600",
};

const CRMLeadList = ({ leads, selectedLead, onSelectLead, filter }: CRMLeadListProps) => {
  const filteredLeads = filter === "All" 
    ? leads 
    : leads.filter((l) => (l.status || "New") === filter);

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-1 pr-2">
        {filteredLeads.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No leads in this category
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => onSelectLead(lead)}
              className={cn(
                "p-3 rounded-lg cursor-pointer transition-all border",
                selectedLead?.id === lead.id
                  ? "bg-primary/10 border-primary shadow-sm"
                  : "bg-card hover:bg-muted/50 border-transparent hover:border-border"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-sm truncate">
                  {lead.customer_name || "Unknown Lead"}
                </h4>
                {lead.deal_value && (
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    <DollarSign className="w-3 h-3" />
                    {lead.deal_value.toLocaleString()}
                  </Badge>
                )}
              </div>

              {lead.service_type && (
                <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
                  {lead.service_type}
                </p>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{format(new Date(lead.created_at), "MMM d, h:mm a")}</span>
                {lead.urgency && (
                  <span className={cn("flex items-center gap-0.5", urgencyColors[lead.urgency])}>
                    <Clock className="w-3 h-3" />
                    {lead.urgency}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                {lead.customer_email && (
                  <span className="flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 shrink-0" />
                    <span className="truncate">{lead.customer_email}</span>
                  </span>
                )}
                {lead.customer_phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 shrink-0" />
                    {lead.customer_phone}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default CRMLeadList;
