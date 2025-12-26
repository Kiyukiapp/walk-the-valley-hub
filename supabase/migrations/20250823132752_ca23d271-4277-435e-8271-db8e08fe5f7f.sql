-- Remove the overly permissive public access policy for prospects
DROP POLICY IF EXISTS "Allow all operations on prospects" ON public.prospects;

-- Create secure policies that deny public access entirely
CREATE POLICY "No public access to prospects" 
ON public.prospects 
FOR ALL 
USING (false)
WITH CHECK (false);

-- Create security definer functions for the password-protected CRM system
CREATE OR REPLACE FUNCTION public.get_prospects_for_crm()
RETURNS TABLE (
  id UUID,
  type public.prospect_type,
  name TEXT,
  surname TEXT,
  email TEXT,
  linkedin TEXT,
  company TEXT,
  company_website TEXT,
  stage public.prospect_stage,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE SQL
AS $$
  SELECT id, type, name, surname, email, linkedin, company, company_website, 
         stage, location, notes, created_at, updated_at 
  FROM public.prospects
  ORDER BY created_at DESC;
$$;

-- Function to create a new prospect
CREATE OR REPLACE FUNCTION public.create_prospect_for_crm(
  p_type public.prospect_type,
  p_name TEXT,
  p_surname TEXT,
  p_email TEXT,
  p_linkedin TEXT DEFAULT NULL,
  p_company TEXT DEFAULT NULL,
  p_company_website TEXT DEFAULT NULL,
  p_stage public.prospect_stage DEFAULT 'prospect',
  p_location TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.prospects (
    type, name, surname, email, linkedin, company, 
    company_website, stage, location, notes
  ) VALUES (
    p_type, p_name, p_surname, p_email, p_linkedin, p_company,
    p_company_website, p_stage, p_location, p_notes
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$;

-- Function to update an existing prospect
CREATE OR REPLACE FUNCTION public.update_prospect_for_crm(
  p_id UUID,
  p_type public.prospect_type,
  p_name TEXT,
  p_surname TEXT,
  p_email TEXT,
  p_linkedin TEXT DEFAULT NULL,
  p_company TEXT DEFAULT NULL,
  p_company_website TEXT DEFAULT NULL,
  p_stage public.prospect_stage DEFAULT 'prospect',
  p_location TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.prospects 
  SET 
    type = p_type,
    name = p_name,
    surname = p_surname,
    email = p_email,
    linkedin = p_linkedin,
    company = p_company,
    company_website = p_company_website,
    stage = p_stage,
    location = p_location,
    notes = p_notes,
    updated_at = now()
  WHERE id = p_id;
  
  RETURN FOUND;
END;
$$;

-- Function to delete a prospect
CREATE OR REPLACE FUNCTION public.delete_prospect_for_crm(
  p_id UUID
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.prospects WHERE id = p_id;
  RETURN FOUND;
END;
$$;