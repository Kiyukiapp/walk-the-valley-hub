-- Update the create_prospect_for_crm function to include season
DROP FUNCTION public.create_prospect_for_crm(prospect_type, text, text, text, text, text, text, prospect_stage, text, text);

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