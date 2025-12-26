-- Security enhancement: Update RLS policies to work with authenticated users
-- and remove the vulnerable password system

-- First, let's create a user_roles table for proper access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::app_role)
$$;

-- Update RLS policies for prospects table
DROP POLICY IF EXISTS "No public access to prospects" ON public.prospects;

CREATE POLICY "Admin users can manage all prospects" 
ON public.prospects 
FOR ALL 
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

-- Update RLS policies for subscriptions table
DROP POLICY IF EXISTS "No public read access to subscriptions" ON public.subscriptions;

CREATE POLICY "Admin users can read all subscriptions" 
ON public.subscriptions 
FOR SELECT 
TO authenticated
USING (public.is_current_user_admin());

-- Update RLS policies for contact_messages table
DROP POLICY IF EXISTS "No public read access to contact messages" ON public.contact_messages;

CREATE POLICY "Admin users can manage all contact messages" 
ON public.contact_messages 
FOR ALL 
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

-- Keep the existing insert policy for public contact form submissions
-- The "Anyone can send contact messages" policy remains unchanged

-- Keep the existing insert policy for public newsletter subscriptions
-- The "Anyone can subscribe" policy remains unchanged

-- Update CRM functions to require authentication and admin role
CREATE OR REPLACE FUNCTION public.get_prospects_for_crm()
RETURNS TABLE(
  id uuid, 
  type prospect_type, 
  name text, 
  surname text, 
  email text, 
  linkedin text, 
  company text, 
  company_website text, 
  stage prospect_stage, 
  location text, 
  notes text, 
  season integer, 
  publish_date date,
  created_at timestamp with time zone, 
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Check if user is authenticated and has admin role
  SELECT id, type, name, surname, email, linkedin, company, company_website, 
         stage, location, notes, season, publish_date, created_at, updated_at 
  FROM public.prospects
  WHERE public.is_current_user_admin()
  ORDER BY created_at DESC;
$function$;

CREATE OR REPLACE FUNCTION public.get_subscribers_for_crm()
RETURNS TABLE(id uuid, name text, email text, source text, subscribed_at timestamp with time zone, is_active boolean)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Check if user is authenticated and has admin role
  SELECT id, name, email, source, subscribed_at, is_active 
  FROM public.subscriptions
  WHERE public.is_current_user_admin()
  ORDER BY subscribed_at DESC;
$function$;

CREATE OR REPLACE FUNCTION public.get_contact_messages_for_crm()
RETURNS TABLE(id uuid, created_at timestamp with time zone, is_read boolean, name text, email text, subject text, message text, type integer)
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
  -- Check if user is authenticated and has admin role
  SELECT id, created_at, is_read, name, email, subject, message, type
  FROM public.contact_messages
  WHERE public.is_current_user_admin()
  ORDER BY created_at DESC;
$function$;

-- Update other CRM functions to require admin role
CREATE OR REPLACE FUNCTION public.create_prospect_for_crm(
  p_type prospect_type, 
  p_name text, 
  p_surname text, 
  p_email text, 
  p_linkedin text DEFAULT NULL::text, 
  p_company text DEFAULT NULL::text, 
  p_company_website text DEFAULT NULL::text, 
  p_stage prospect_stage DEFAULT 'prospect'::prospect_stage, 
  p_location text DEFAULT NULL::text, 
  p_notes text DEFAULT NULL::text, 
  p_season integer DEFAULT 1,
  p_publish_date date DEFAULT NULL::date
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  new_id UUID;
BEGIN
  -- Check if user is authenticated and has admin role
  IF NOT public.is_current_user_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  INSERT INTO public.prospects (
    type, name, surname, email, linkedin, company, 
    company_website, stage, location, notes, season, publish_date
  ) VALUES (
    p_type, p_name, p_surname, p_email, p_linkedin, p_company,
    p_company_website, p_stage, p_location, p_notes, p_season, p_publish_date
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_prospect_for_crm(
  p_id uuid, 
  p_type prospect_type, 
  p_name text, 
  p_surname text, 
  p_email text, 
  p_linkedin text DEFAULT NULL::text, 
  p_company text DEFAULT NULL::text, 
  p_company_website text DEFAULT NULL::text, 
  p_stage prospect_stage DEFAULT 'prospect'::prospect_stage, 
  p_location text DEFAULT NULL::text, 
  p_notes text DEFAULT NULL::text, 
  p_season integer DEFAULT 1,
  p_publish_date date DEFAULT NULL::date
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Check if user is authenticated and has admin role
  IF NOT public.is_current_user_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

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
    publish_date = p_publish_date,
    updated_at = now()
  WHERE id = p_id;
  
  RETURN FOUND;
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_prospect_for_crm(p_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Check if user is authenticated and has admin role
  IF NOT public.is_current_user_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  DELETE FROM public.prospects WHERE id = p_id;
  RETURN FOUND;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_subscriber_status(subscriber_id uuid, new_status boolean)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Check if user is authenticated and has admin role
  IF NOT public.is_current_user_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  UPDATE public.subscriptions 
  SET is_active = new_status 
  WHERE id = subscriber_id;
  
  RETURN FOUND;
END;
$function$;

CREATE OR REPLACE FUNCTION public.mark_contact_message_read_for_crm(message_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Check if user is authenticated and has admin role
  IF NOT public.is_current_user_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  UPDATE public.contact_messages 
  SET is_read = true 
  WHERE id = message_id;
  
  RETURN FOUND;
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_contact_message_for_crm(message_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Check if user is authenticated and has admin role
  IF NOT public.is_current_user_admin() THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  DELETE FROM public.contact_messages WHERE id = message_id;
  RETURN FOUND;
END;
$function$;

-- Note: We're keeping the page_passwords table for now but it's no longer used
-- You can manually drop it later if desired: DROP TABLE public.page_passwords;