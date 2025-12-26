import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Filter, Mail, ExternalLink, LayoutGrid, List } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ProspectDialog from './ProspectDialog';
import KanbanView from './KanbanView';
// Temporarily removed drag-and-drop functionality to fix build issues
// import SortableRow from './SortableRow';

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

const ProspectsTable = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [filteredProspects, setFilteredProspects] = useState<Prospect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  // Temporarily removed drag-and-drop sensors

  useEffect(() => {
    console.log('ProspectsTable mounted');
    fetchProspects();
  }, []);

  useEffect(() => {
    filterProspects();
  }, [prospects, searchTerm, typeFilter, stageFilter, seasonFilter]);

  const fetchProspects = async () => {
    console.log('Fetching prospects...');
    try {
      const { data, error } = await supabase.rpc('get_prospects_for_crm');

      if (error) {
        console.error('Supabase RPC error in fetchProspects:', error);
        throw error;
      }
      
      console.log('Prospects fetched successfully:', data?.length || 0, 'records');
      setProspects(data || []);
    } catch (error) {
      console.error('Error fetching prospects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch prospects.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterProspects = () => {
    let filtered = prospects;

    if (searchTerm) {
      filtered = filtered.filter(
        (prospect) =>
          prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prospect.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prospect.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prospect.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prospect.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((prospect) => prospect.type === typeFilter);
    }

    if (stageFilter !== 'all') {
      filtered = filtered.filter((prospect) => {
        // Handle both old 'booked' and new 'planning_booked' for the same filter
        if (stageFilter === 'planning_booked') {
          return prospect.stage === 'booked' || prospect.stage === 'planning_booked';
        }
        return prospect.stage === stageFilter;
      });
    }

    if (seasonFilter !== 'all') {
      filtered = filtered.filter((prospect) => prospect.season.toString() === seasonFilter);
    }

    setFilteredProspects(filtered);
  };

  const handleProspectClick = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProspect(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProspect(null);
    fetchProspects(); // Refresh data
  };

  // Temporarily removed drag-and-drop functionality

  const formatStage = (stage: string) => {
    const stageMapping = {
      prospect: 'Prospect',
      contacted: 'Contacted', 
      booked: 'Planning Booked', // Legacy mapping
      planning_booked: 'Planning Booked',
      recording_booked: 'Recording Booked',
      recorded: 'Recorded',
      edited: 'Edited',
      published: 'Published',
    };
    return stageMapping[stage as keyof typeof stageMapping] || stage.charAt(0).toUpperCase() + stage.slice(1);
  };

  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStageColor = (stage: string) => {
    const colors = {
      prospect: 'text-muted-foreground',
      contacted: 'text-yellow-600',
      booked: 'text-blue-600', // Legacy mapping
      planning_booked: 'text-blue-600',
      recording_booked: 'text-indigo-600',
      recorded: 'text-purple-600',
      edited: 'text-orange-600',
      published: 'text-green-600',
    };
    return colors[stage as keyof typeof colors] || 'text-muted-foreground';
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading prospects...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <Input
            placeholder="Search prospects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="partner">Partner</SelectItem>
              <SelectItem value="sponsor">Sponsor</SelectItem>
            </SelectContent>
          </Select>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="planning_booked">Planning Booked</SelectItem>
              <SelectItem value="recording_booked">Recording Booked</SelectItem>
              <SelectItem value="recorded">Recorded</SelectItem>
              <SelectItem value="edited">Edited</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
          <Select value={seasonFilter} onValueChange={setSeasonFilter}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Filter by season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Seasons</SelectItem>
              <SelectItem value="1">Season 1</SelectItem>
              <SelectItem value="2">Season 2</SelectItem>
              <SelectItem value="3">Season 3</SelectItem>
              <SelectItem value="4">Season 4</SelectItem>
              <SelectItem value="5">Season 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-r-none"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="rounded-l-none"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Prospect
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProspects.length} of {prospects.length} prospects
      </div>

      {/* Content View */}
      {viewMode === 'table' ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No prospects found. Try adjusting your filters or add a new prospect.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProspects.map((prospect) => (
                  <TableRow key={prospect.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleProspectClick(prospect)}>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {formatType(prospect.type)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{prospect.name} {prospect.surname}</p>
                        <p className="text-sm text-muted-foreground">{prospect.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{prospect.company || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">{prospect.location || ''}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getStageColor(prospect.stage)}`}>
                        {formatStage(prospect.stage)}
                      </span>
                    </TableCell>
                    <TableCell>Season {prospect.season}</TableCell>
                    <TableCell>{prospect.publish_date || 'Not set'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {prospect.email && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`mailto:${prospect.email}`, '_blank');
                            }}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                        {prospect.linkedin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(prospect.linkedin, '_blank');
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <KanbanView prospects={filteredProspects} onProspectClick={handleProspectClick} />
      )}

      <ProspectDialog
        prospect={selectedProspect}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
};

export default ProspectsTable;