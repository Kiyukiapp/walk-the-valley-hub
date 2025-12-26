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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, Eye, Trash2 } from 'lucide-react';

interface ContactMessage {
  id: string;
  created_at: string;
  is_read: boolean;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  type: number;
}

const ContactMessagesTable = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    console.log('ContactMessagesTable mounted');
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm]);

  const fetchMessages = async () => {
    console.log('Fetching contact messages...');
    try {
      const { data, error } = await supabase.rpc('get_contact_messages_for_crm');

      if (error) {
        console.error('Supabase RPC error in fetchMessages:', error);
        throw error;
      }
      
      console.log('Contact messages fetched successfully:', data?.length || 0, 'records');
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      toast({
        title: "Error",
        description: "Failed to load contact messages.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase.rpc('mark_contact_message_read_for_crm', {
        message_id: id
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message marked as read.",
      });

      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark message as read.",
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase.rpc('delete_contact_message_for_crm', {
        message_id: id
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message deleted successfully.",
      });

      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !msg.is_read).length;
  };

  const getTypeLabel = (type: number) => {
    switch (type) {
      case 1:
        return "Guest Application";
      case 2:
        return "Partnership";
      case 3:
        return "Media Inquiry";
      case 4:
        return "General";
      default:
        return "General";
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading contact messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex items-center gap-2">
          {getUnreadCount() > 0 && (
            <Badge variant="destructive">
              {getUnreadCount()} unread
            </Badge>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No contact messages found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow 
                    key={message.id}
                    className={`cursor-pointer hover:bg-muted/50 ${!message.is_read ? 'bg-accent/30' : ''}`}
                    onClick={() => handleViewMessage(message)}
                  >
                    <TableCell>
                      <Badge variant={message.is_read ? "secondary" : "default"}>
                        {message.is_read ? "Read" : "Unread"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTypeLabel(message.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {message.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {message.email}
                        <a
                          href={`mailto:${message.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Mail className="h-3 w-3" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      {message.subject || "No subject"}
                    </TableCell>
                    <TableCell>
                      {new Date(message.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMessage(message);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Showing {filteredMessages.length} of {messages.length} messages
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Message from {selectedMessage?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">From:</span> {selectedMessage.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {selectedMessage.email}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {getTypeLabel(selectedMessage.type)}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {selectedMessage.is_read ? "Read" : "Unread"}
                </div>
              </div>
              
              {selectedMessage.subject && (
                <div>
                  <span className="font-medium">Subject:</span>
                  <p className="mt-1 p-2 bg-muted rounded">{selectedMessage.subject}</p>
                </div>
              )}
              
              <div>
                <span className="font-medium">Message:</span>
                <p className="mt-1 p-4 bg-muted rounded whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your contact message'}`, '_blank')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  onClick={() => deleteMessage(selectedMessage.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactMessagesTable;