import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Subscriber {
  id: string;
  name: string;
  email: string;
  source: string;
  subscribed_at: string;
  is_active: boolean;
}

const SubscribersTable = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  useEffect(() => {
    console.log('SubscribersTable mounted');
    fetchSubscribers();
  }, []);

  useEffect(() => {
    filterSubscribers();
  }, [subscribers, searchTerm, statusFilter, sourceFilter]);

  const fetchSubscribers = async () => {
    console.log('Fetching subscribers...');
    try {
      const { data, error } = await supabase.rpc('get_subscribers_for_crm');

      if (error) {
        console.error('Supabase RPC error in fetchSubscribers:', error);
        throw error;
      }
      
      console.log('Subscribers fetched successfully:', data?.length || 0, 'records');
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: "Error",
        description: "Failed to load subscribers.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubscribers = () => {
    let filtered = subscribers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(subscriber =>
        (subscriber.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(subscriber =>
        statusFilter === 'active' ? subscriber.is_active : !subscriber.is_active
      );
    }

    // Filter by source
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(subscriber =>
        subscriber.source === sourceFilter
      );
    }

    setFilteredSubscribers(filtered);
  };

  const toggleSubscriberStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { data, error } = await supabase.rpc('update_subscriber_status', {
        subscriber_id: id,
        new_status: !currentStatus
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Subscriber ${!currentStatus ? 'activated' : 'deactivated'}.`,
      });

      fetchSubscribers();
    } catch (error) {
      console.error('Error updating subscriber:', error);
      toast({
        title: "Error",
        description: "Failed to update subscriber status.",
        variant: "destructive",
      });
    }
  };

  const getUniqueSourcecs = () => {
    const sources = [...new Set(subscribers.map(sub => sub.source))];
    return sources;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading subscribers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, email or source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              {getUniqueSourcecs().map((source) => (
                <SelectItem key={source} value={source}>
                  {source.charAt(0).toUpperCase() + source.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Subscribed Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No subscribers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">
                      {subscriber.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {subscriber.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {subscriber.source.charAt(0).toUpperCase() + subscriber.source.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={subscriber.is_active ? "default" : "secondary"}>
                        {subscriber.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.is_active)}
                      >
                        {subscriber.is_active ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Showing {filteredSubscribers.length} of {subscribers.length} subscribers
      </div>
    </div>
  );
};

export default SubscribersTable;