-- Add type column to contact_messages table
ALTER TABLE public.contact_messages 
ADD COLUMN type integer DEFAULT 4;