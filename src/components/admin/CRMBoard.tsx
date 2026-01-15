import { useState, useMemo } from "react";
import { Lead } from "./LeadCard";
import CRMLeadList from "./CRMLeadList";
import CRMDetailPanel from "./CRMDetailPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CRMBoardProps {
  leads: Lead[];
  onUpdate: () => void;
}

const STATUS_TABS = [
  { id: "All", label: "All Leads", color: "bg-slate-500" },
  { id: "New", label: "New", color: "bg-blue-500" },
  { id: "Contacted", label: "Contacted", color: "bg-purple-500" },
  { id: "Qualified", label: "Qualified", color: "bg-yellow-500" },
  { id: "Proposal", label: "Proposal", color: "bg-orange-500" },
  { id: "Won", label: "Won", color: "bg-green-500" },
  { id: "Lost", label: "Lost", color: "bg-red-500" },
];

const CRMBoard = ({ leads, onUpdate }: CRMBoardProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Count leads per status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: leads.length };
    STATUS_TABS.slice(1).forEach((tab) => {
      counts[tab.id] = leads.filter((l) => (l.status || "New") === tab.id).length;
    });
    return counts;
  }, [leads]);

  // Update selected lead when leads change (e.g., after save)
  const currentLead = useMemo(() => {
    if (!selectedLead) return null;
    return leads.find((l) => l.id === selectedLead.id) || null;
  }, [leads, selectedLead]);

  return (
    <div className="space-y-4">
      {/* Status Tabs - Colored pipeline stages */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              activeFilter === tab.id
                ? `${tab.color} text-white shadow-md`
                : "bg-muted hover:bg-muted/80 text-foreground"
            )}
          >
            {tab.label}
            <Badge
              variant="secondary"
              className={cn(
                "text-xs min-w-[20px] justify-center",
                activeFilter === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-background"
              )}
            >
              {statusCounts[tab.id]}
            </Badge>
          </button>
        ))}
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Panel - Lead List */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">
                {activeFilter === "All" ? "All Leads" : activeFilter}
              </h3>
              <Badge variant="outline" className="text-xs">
                {statusCounts[activeFilter]} leads
              </Badge>
            </div>
            <CRMLeadList
              leads={leads}
              selectedLead={currentLead}
              onSelectLead={setSelectedLead}
              filter={activeFilter}
            />
          </CardContent>
        </Card>

        {/* Right Panel - Lead Details */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <CRMDetailPanel lead={currentLead} onUpdate={onUpdate} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CRMBoard;
