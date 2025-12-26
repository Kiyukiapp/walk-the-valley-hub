-- Update get_subscribers_for_crm function to include name field
CREATE OR REPLACE FUNCTION public.get_subscribers_for_crm()
 RETURNS TABLE(id uuid, name text, email text, source text, subscribed_at timestamp with time zone, is_active boolean)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT id, name, email, source, subscribed_at, is_active 
  FROM public.subscriptions
  ORDER BY subscribed_at DESC;
$function$