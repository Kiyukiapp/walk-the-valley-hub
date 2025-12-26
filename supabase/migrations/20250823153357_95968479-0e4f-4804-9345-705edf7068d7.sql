-- Add season column to prospects table
ALTER TABLE public.prospects 
ADD COLUMN season integer DEFAULT 1 NOT NULL;

-- Add index for better performance on season filtering
CREATE INDEX idx_prospects_season ON public.prospects(season);

-- Update the get_prospects_for_crm function to include season
CREATE OR REPLACE FUNCTION public.get_prospects_for_crm()
 RETURNS TABLE(id uuid, type prospect_type, name text, surname text, email text, linkedin text, company text, company_website text, stage prospect_stage, location text, notes text, season integer, created_at timestamp with time zone, updated_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT id, type, name, surname, email, linkedin, company, company_website, 
         stage, location, notes, season, created_at, updated_at 
  FROM public.prospects
  ORDER BY created_at DESC;
$function$

-- Update the create_prospect_for_crm function to include season
CREATE OR REPLACE FUNCTION public.create_prospect_for_crm(p_type prospect_type, p_name text, p_surname text, p_email text, p_linkedin text DEFAULT NULL::text, p_company text DEFAULT NULL::text, p_company_website text DEFAULT NULL::text, p_stage prospect_stage DEFAULT 'prospect'::prospect_stage, p_location text DEFAULT NULL::text, p_notes text DEFAULT NULL::text, p_season integer DEFAULT 1)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.prospects (
    type, name, surname, email, linkedin, company, 
    company_website, stage, location, notes, season
  ) VALUES (
    p_type, p_name, p_surname, p_email, p_linkedin, p_company,
    p_company_website, p_stage, p_location, p_notes, p_season
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$function$

-- Update the update_prospect_for_crm function to include season
CREATE OR REPLACE FUNCTION public.update_prospect_for_crm(p_id uuid, p_type prospect_type, p_name text, p_surname text, p_email text, p_linkedin text DEFAULT NULL::text, p_company text DEFAULT NULL::text, p_company_website text DEFAULT NULL::text, p_stage prospect_stage DEFAULT 'prospect'::prospect_stage, p_location text DEFAULT NULL::text, p_notes text DEFAULT NULL::text, p_season integer DEFAULT 1)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
    season = p_season,
    updated_at = now()
  WHERE id = p_id;
  
  RETURN FOUND;
END;
$function$