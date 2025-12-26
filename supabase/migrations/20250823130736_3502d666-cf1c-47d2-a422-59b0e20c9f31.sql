-- Create enum for prospect types
CREATE TYPE public.prospect_type AS ENUM ('interview', 'partner', 'sponsor');

-- Create enum for prospect stages
CREATE TYPE public.prospect_stage AS ENUM ('prospect', 'contacted', 'booked', 'recorded', 'edited', 'published');

-- Create table for storing the page password
CREATE TABLE public.page_passwords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for prospects
CREATE TABLE public.prospects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type prospect_type NOT NULL,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT,
  company TEXT,
  company_website TEXT,
  stage prospect_stage NOT NULL DEFAULT 'prospect',
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.page_passwords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;

-- Create policies for page_passwords (read-only for the app)
CREATE POLICY "Allow reading page passwords"
ON public.page_passwords
FOR SELECT
USING (true);

-- Create policies for prospects (full access for authenticated sessions)
CREATE POLICY "Allow all operations on prospects"
ON public.prospects
FOR ALL
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_page_passwords_updated_at
  BEFORE UPDATE ON public.page_passwords
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prospects_updated_at
  BEFORE UPDATE ON public.prospects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial password (you can change this in Supabase dashboard)
INSERT INTO public.page_passwords (page_name, password_hash)
VALUES ('contacts', 'defaultpassword123');