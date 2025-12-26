-- Create explicit policy to deny public SELECT access to contact messages
CREATE POLICY "No public read access to contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (false);

-- Create a security definer function to safely access contact messages for the CRM
CREATE OR REPLACE FUNCTION public.get_contact_messages_for_crm()
RETURNS TABLE (
  id UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  is_read BOOLEAN,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE SQL
AS $$
  SELECT id, created_at, is_read, name, email, subject, message
  FROM public.contact_messages
  ORDER BY created_at DESC;
$$;

-- Create a function to mark contact messages as read
CREATE OR REPLACE FUNCTION public.mark_contact_message_read_for_crm(
  message_id UUID
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.contact_messages 
  SET is_read = true 
  WHERE id = message_id;
  
  RETURN FOUND;
END;
$$;

-- Create a function to delete contact messages
CREATE OR REPLACE FUNCTION public.delete_contact_message_for_crm(
  message_id UUID
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.contact_messages WHERE id = message_id;
  RETURN FOUND;
END;
$$;