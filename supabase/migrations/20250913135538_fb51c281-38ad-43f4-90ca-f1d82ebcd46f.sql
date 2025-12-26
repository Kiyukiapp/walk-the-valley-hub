-- Critical Security Fix: Ensure all sensitive tables are properly protected with RLS policies
-- Use unique policy names to avoid conflicts

-- First, ensure RLS is enabled on all sensitive tables
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- SUBSCRIPTIONS TABLE - Critical fix for email harvesting
-- Create explicit deny policy for non-admin users
CREATE POLICY "subscriptions_deny_public_access_2025" 
ON public.subscriptions 
FOR SELECT 
TO anon, authenticated 
USING (public.is_current_user_admin());

-- Ensure only admins can update/delete subscriptions
CREATE POLICY "subscriptions_admin_only_modify_2025" 
ON public.subscriptions 
FOR UPDATE 
TO authenticated 
USING (public.is_current_user_admin()) 
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "subscriptions_admin_only_delete_2025" 
ON public.subscriptions 
FOR DELETE 
TO authenticated 
USING (public.is_current_user_admin());

-- PROSPECTS TABLE - Critical fix for business data exposure  
-- Create explicit policy to ensure only admins can read prospects
CREATE POLICY "prospects_admin_only_select_2025" 
ON public.prospects 
FOR SELECT 
TO authenticated 
USING (public.is_current_user_admin());

-- CONTACT MESSAGES TABLE - Critical fix for customer data exposure
-- Create explicit policy to ensure only admins can read contact messages
CREATE POLICY "contact_messages_admin_only_select_2025" 
ON public.contact_messages 
FOR SELECT 
TO authenticated 
USING (public.is_current_user_admin());

-- Ensure only admins can update/delete contact messages
CREATE POLICY "contact_messages_admin_only_modify_2025" 
ON public.contact_messages 
FOR UPDATE 
TO authenticated 
USING (public.is_current_user_admin()) 
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "contact_messages_admin_only_delete_2025" 
ON public.contact_messages 
FOR DELETE 
TO authenticated 
USING (public.is_current_user_admin());