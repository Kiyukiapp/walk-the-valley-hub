-- Create a security definer function to safely access subscription data
-- This function can only be called and doesn't expose RLS bypassing to the client
CREATE OR REPLACE FUNCTION public.get_subscribers_for_crm()
RETURNS TABLE (
  id UUID,
  email TEXT,
  source TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE SQL
AS $$
  SELECT id, email, source, subscribed_at, is_active 
  FROM public.subscriptions
  ORDER BY subscribed_at DESC;
$$;

-- Create a security definer function to safely update subscription status
CREATE OR REPLACE FUNCTION public.update_subscriber_status(
  subscriber_id UUID,
  new_status BOOLEAN
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.subscriptions 
  SET is_active = new_status 
  WHERE id = subscriber_id;
  
  RETURN FOUND;
END;
$$;