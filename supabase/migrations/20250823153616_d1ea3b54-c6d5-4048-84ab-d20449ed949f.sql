-- Update the update_prospect_for_crm function to include season
DROP FUNCTION public.update_prospect_for_crm(uuid, prospect_type, text, text, text, text, text, text, prospect_stage, text, text);

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