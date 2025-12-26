import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
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

interface SortableRowProps {
  prospect: Prospect;
  onProspectClick: (prospect: Prospect) => void;
  formatType: (type: string) => string;
  formatStage: (stage: string) => string;
  getStageColor: (stage: string) => string;
}

const SortableRow: React.FC<SortableRowProps> = ({
  prospect,
  onProspectClick,
  formatType,
  formatStage,
  getStageColor,
}) => {
  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onProspectClick(prospect)}
    >
      <TableCell>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted">
          {formatType(prospect.type)}
        </span>
      </TableCell>
      <TableCell className="font-medium">
        {prospect.name} {prospect.surname}
      </TableCell>
      <TableCell>
        {prospect.company_website ? (
          <a
            href={prospect.company_website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 hover:text-primary"
          >
            {prospect.company}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          prospect.company
        )}
      </TableCell>
      <TableCell>
        <span className={`font-medium ${getStageColor(prospect.stage)}`}>
          {formatStage(prospect.stage)}
        </span>
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          Season {prospect.season}
        </span>
      </TableCell>
      <TableCell>
        {prospect.publish_date ? (
          <span className="text-sm">
            {new Date(prospect.publish_date).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-muted-foreground text-sm">Not set</span>
        )}
      </TableCell>
      <TableCell>
        {prospect.linkedin && (
          <a
            href={prospect.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-600 hover:text-blue-800"
          >
            LinkedIn
          </a>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SortableRow;