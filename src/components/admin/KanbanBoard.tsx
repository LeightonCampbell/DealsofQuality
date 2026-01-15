import { useState, useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import KanbanColumn from "./KanbanColumn";
import LeadCard, { Lead } from "./LeadCard";
import LeadDetailModal from "./LeadDetailModal";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";

interface KanbanBoardProps {
  leads: Lead[];
  onUpdate: () => void;
}

const COLUMNS = [
  { id: "New", title: "New", color: "bg-blue-500" },
  { id: "Contacted", title: "Contacted", color: "bg-purple-500" },
  { id: "Qualified", title: "Qualified", color: "bg-yellow-500" },
  { id: "Proposal", title: "Proposal", color: "bg-orange-500" },
  { id: "Won", title: "Won", color: "bg-green-500" },
  { id: "Lost", title: "Lost", color: "bg-red-500" },
];

const KanbanBoard = ({ leads, onUpdate }: KanbanBoardProps) => {
  const { toast } = useToast();
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columnLeads = useMemo(() => {
    const grouped: Record<string, Lead[]> = {};
    COLUMNS.forEach((col) => {
      grouped[col.id] = leads.filter((l) => (l.status || "New") === col.id);
    });
    return grouped;
  }, [leads]);

  const pipelineStats = useMemo(() => {
    const wonLeads = leads.filter((l) => l.status === "Won");
    const activeLeads = leads.filter((l) => !["Won", "Lost"].includes(l.status || "New"));
    
    return {
      totalPipeline: activeLeads.reduce((sum, l) => sum + (l.deal_value || 0), 0),
      wonValue: wonLeads.reduce((sum, l) => sum + (l.deal_value || 0), 0),
      conversionRate: leads.length > 0 
        ? Math.round((wonLeads.length / leads.length) * 100) 
        : 0,
    };
  }, [leads]);

  const handleDragStart = (event: DragStartEvent) => {
    const lead = leads.find((l) => l.id === event.active.id);
    if (lead) setActiveLead(lead);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveLead(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const newStatus = over.id as string;
    const leadId = active.id as string;

    // Optimistically update would go here, but for now just update DB
    try {
      const { error } = await supabase
        .from("leads")
        .update({ 
          status: newStatus,
          last_contacted_at: new Date().toISOString(),
        })
        .eq("id", leadId);

      if (error) throw error;

      toast({
        title: "Lead Updated",
        description: `Moved to ${newStatus}`,
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update lead status",
        variant: "destructive",
      });
    }
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${pipelineStats.totalPipeline.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Active Pipeline</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${pipelineStats.wonValue.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Won Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pipelineStats.conversionRate}%</p>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              leads={columnLeads[column.id] || []}
              onLeadClick={handleLeadClick}
            />
          ))}
        </div>

        <DragOverlay>
          {activeLead && (
            <div className="opacity-80 rotate-3">
              <LeadCard lead={activeLead} onClick={() => {}} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Lead Detail Modal */}
      <LeadDetailModal
        lead={selectedLead}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default KanbanBoard;
