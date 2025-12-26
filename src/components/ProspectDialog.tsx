import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

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

const prospectSchema = z.object({
  type: z.enum(['interview', 'partner', 'sponsor']),
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().email('Valid email is required'),
  linkedin: z.string().optional(),
  company: z.string().optional(),
  company_website: z.string().optional(),
  stage: z.enum(['prospect', 'contacted', 'booked', 'planning_booked', 'recording_booked', 'recorded', 'edited', 'published']),
  location: z.string().optional(),
  notes: z.string().optional(),
  season: z.number().int().min(1, 'Season must be at least 1'),
  publish_date: z.string().optional(),
});

type ProspectFormData = z.infer<typeof prospectSchema>;

interface ProspectDialogProps {
  prospect?: Prospect | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProspectDialog: React.FC<ProspectDialogProps> = ({
  prospect,
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<ProspectFormData>({
    resolver: zodResolver(prospectSchema),
    defaultValues: {
      type: 'interview',
      name: '',
      surname: '',
      email: '',
      linkedin: '',
      company: '',
      company_website: '',
      stage: 'prospect',
      location: '',
      notes: '',
      season: 1,
      publish_date: '',
    },
  });

  useEffect(() => {
    if (prospect) {
      form.reset({
        type: prospect.type,
        name: prospect.name,
        surname: prospect.surname,
        email: prospect.email,
        linkedin: prospect.linkedin || '',
        company: prospect.company || '',
        company_website: prospect.company_website || '',
        stage: prospect.stage,
        location: prospect.location || '',
        notes: prospect.notes || '',
        season: prospect.season,
        publish_date: prospect.publish_date || '',
      });
    } else {
      form.reset({
        type: 'interview',
        name: '',
        surname: '',
        email: '',
        linkedin: '',
        company: '',
        company_website: '',
        stage: 'prospect',
        location: '',
        notes: '',
        season: 1,
        publish_date: '',
      });
    }
  }, [prospect, form]);

  const onSubmit = async (data: ProspectFormData) => {
    setIsLoading(true);

    try {
      // Map new stage values to database-compatible values
      const mapStageForDb = (stage: string): 'prospect' | 'contacted' | 'booked' | 'recorded' | 'edited' | 'published' => {
        if (stage === 'planning_booked') return 'booked';
        if (stage === 'recording_booked') return 'booked'; // Temporary mapping until DB is updated
        return stage as 'prospect' | 'contacted' | 'booked' | 'recorded' | 'edited' | 'published';
      };

      if (prospect) {
        // Update existing prospect
        const { data: result, error } = await supabase.rpc('update_prospect_for_crm', {
          p_id: prospect.id,
          p_type: data.type,
          p_name: data.name,
          p_surname: data.surname,
          p_email: data.email,
          p_linkedin: data.linkedin || null,
          p_company: data.company || null,
          p_company_website: data.company_website || null,
          p_stage: mapStageForDb(data.stage),
          p_location: data.location || null,
          p_notes: data.notes || null,
          p_season: data.season,
          p_publish_date: data.publish_date || null,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Prospect updated successfully.",
        });
      } else {
        // Create new prospect
        const { data: result, error } = await supabase.rpc('create_prospect_for_crm', {
          p_type: data.type,
          p_name: data.name,
          p_surname: data.surname,
          p_email: data.email,
          p_linkedin: data.linkedin || null,
          p_company: data.company || null,
          p_company_website: data.company_website || null,
          p_stage: mapStageForDb(data.stage),
          p_location: data.location || null,
          p_notes: data.notes || null,
          p_season: data.season,
          p_publish_date: data.publish_date || null,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Prospect created successfully.",
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving prospect:', error);
      toast({
        title: "Error",
        description: "Failed to save prospect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!prospect) return;

    setIsDeleting(true);

    try {
      const { data, error } = await supabase.rpc('delete_prospect_for_crm', {
        p_id: prospect.id
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Prospect deleted successfully.",
      });

      onClose();
    } catch (error) {
      console.error('Error deleting prospect:', error);
      toast({
        title: "Error",
        description: "Failed to delete prospect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {prospect ? 'Edit Prospect' : 'Add New Prospect'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="sponsor">Sponsor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                       <SelectContent>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="planning_booked">Planning Booked</SelectItem>
                        <SelectItem value="recording_booked">Recording Booked</SelectItem>
                        <SelectItem value="recorded">Recorded</SelectItem>
                        <SelectItem value="edited">Edited</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Season</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publish_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://linkedin.com/in/" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {prospect && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="sm:mr-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : prospect ? 'Update' : 'Create'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProspectDialog;