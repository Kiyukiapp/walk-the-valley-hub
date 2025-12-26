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