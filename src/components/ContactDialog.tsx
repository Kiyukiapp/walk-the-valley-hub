import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ContactDialogProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  type?: number;
}

const ContactDialog = ({ 
  trigger, 
  title = "Send us a message",
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  type = 4
}: ContactDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (formData.name.trim().length < 2) {
      toast({
        title: "Invalid name",
        description: "Name must be at least 2 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      toast({
        title: "Message too short",
        description: "Please provide a more detailed message (at least 10 characters).",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Insert into contact_messages table
      const { error: contactError } = await supabase
        .from("contact_messages")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          subject: formData.subject.trim() || null,
          message: formData.message.trim(),
          type: type,
        });

      if (contactError) {
        console.error("Contact form error:", contactError);
        throw contactError;
      }

      // Also create a prospect entry in the accounts database
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Unknown";
      
      // Combine subject and message for notes
      const notes = formData.subject.trim() 
        ? `Subject: ${formData.subject.trim()}\n\nMessage: ${formData.message.trim()}`
        : formData.message.trim();

      const { error: prospectError } = await supabase
        .from("prospects")
        .insert([{
          type: "interview", // Default type for contact form submissions
          name: firstName,
          surname: lastName,
          email: formData.email.trim().toLowerCase(),
          stage: "prospect", // Default stage
          notes: notes,
        }]);

      // Don't fail if prospect creation fails (contact message is more important)
      if (prospectError) {
        console.error("Prospect creation error:", prospectError);
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us what's on your mind..."
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              rows={4}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            variant="cta"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;