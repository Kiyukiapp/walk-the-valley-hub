import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, ExternalLink } from 'lucide-react';

type Prospect = {
  id: string;
  type: 'interview' | 'partner' | 'sponsor';
  name: string;
  surname: string;
  email: string;
  linkedin?: string;
  company?: string;
  company_website?: string;
  stage: 'prospect' | 'contacted' | 'booked' | 'planning_booked' | 'recording_booked' | 'recorded' | 'edited' | 'published';
  location?: string;
  notes?: string;
  season: number;
  publish_date?: string;
  created_at: string;
  updated_at: string;
};

interface KanbanViewProps {
  prospects: Prospect[];
  onProspectClick: (prospect: Prospect) => void;
}

const KanbanView: React.FC<KanbanViewProps> = ({ prospects, onProspectClick }) => {
  const stages = [
    { id: 'prospect', label: 'Prospect', color: 'bg-muted' },
    { id: 'contacted', label: 'Contacted', color: 'bg-yellow-100 border-yellow-200' },
    { id: 'planning_booked', label: 'Planning Booked', color: 'bg-blue-100 border-blue-200' },
    { id: 'recording_booked', label: 'Recording Booked', color: 'bg-indigo-100 border-indigo-200' },
    { id: 'recorded', label: 'Recorded', color: 'bg-purple-100 border-purple-200' },
    { id: 'edited', label: 'Edited', color: 'bg-orange-100 border-orange-200' },
    { id: 'published', label: 'Published', color: 'bg-green-100 border-green-200' },
  ];

  const getProspectsByStage = (stageId: string) => {
    // Map old 'booked' stage to 'planning_booked' for display
    if (stageId === 'planning_booked') {
      return prospects.filter(prospect => prospect.stage === 'booked' || prospect.stage === 'planning_booked');
    }
    return prospects.filter(prospect => prospect.stage === stageId);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      interview: 'bg-primary/10 text-primary',
      partner: 'bg-blue-100 text-blue-700',
      sponsor: 'bg-purple-100 text-purple-700',
    };
    return colors[type as keyof typeof colors] || 'bg-muted';
  };

  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageProspects = getProspectsByStage(stage.id);
        
        return (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className={`rounded-lg border-2 border-dashed p-4 min-h-[600px] ${stage.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{stage.label}</h3>
                <Badge variant="secondary" className="ml-2">
                  {stageProspects.length}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {stageProspects.map((prospect) => (
                  <Card 
                    key={prospect.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow bg-background"
                    onClick={() => onProspectClick(prospect)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium">
                          {prospect.name} {prospect.surname}
                        </CardTitle>
                        <Badge className={`text-xs ${getTypeColor(prospect.type)}`}>
                          {formatType(prospect.type)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {prospect.company && (
                        <div className="text-sm text-muted-foreground mb-2">
                          {prospect.company}
                        </div>
                      )}
                      
                      {prospect.publish_date && (
                        <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                          📅 {new Date(prospect.publish_date).toLocaleDateString()}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {stageProspects.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No prospects in this stage
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanView;