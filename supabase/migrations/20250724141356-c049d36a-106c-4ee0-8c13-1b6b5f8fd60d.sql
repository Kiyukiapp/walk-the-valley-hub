-- Create subscriptions table for newsletter signups
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL, -- 'newsletter' or 'menu'
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for subscription signup)
CREATE POLICY "Anyone can subscribe" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow public reading (for checking existing subscriptions)
CREATE POLICY "Anyone can read subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (true);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_read BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for contact form)
CREATE POLICY "Anyone can send contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX idx_subscriptions_email ON public.subscriptions(email);
CREATE INDEX idx_subscriptions_source ON public.subscriptions(source);
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at);
CREATE INDEX idx_contact_messages_is_read ON public.contact_messages(is_read);