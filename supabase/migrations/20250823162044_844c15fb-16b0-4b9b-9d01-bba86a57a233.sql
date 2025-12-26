-- Update get_contact_messages_for_crm function to include type field
DROP FUNCTION public.get_contact_messages_for_crm();

CREATE OR REPLACE FUNCTION public.get_contact_messages_for_crm()
 RETURNS TABLE(id uuid, created_at timestamp with time zone, is_read boolean, name text, email text, subject text, message text, type integer)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT id, created_at, is_read, name, email, subject, message, type
  FROM public.contact_messages
  ORDER BY created_at DESC;
$function$