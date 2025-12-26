-- Critical Security Fix: Ensure all sensitive tables are properly protected with RLS policies

-- First, ensure RLS is enabled on all sensitive tables
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that might be conflicting and recreate them properly
DROP POLICY IF EXISTS "Admin users can read all subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscriptions;
DROP POLICY IF EXISTS "Admin users can manage all prospects" ON public.prospects;
DROP POLICY IF EXISTS "Admin users can manage all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can send contact messages" ON public.contact_messages;

-- SUBSCRIPTIONS TABLE - Critical fix for email harvesting
-- Deny all public access first
CREATE POLICY "Deny all public access to subscriptions" 
ON public.subscriptions 
FOR ALL 
TO anon, authenticated 
USING (false) 
WITH CHECK (false);

-- Allow admin users to read all subscriptions
CREATE POLICY "Admin users can read all subscriptions" 
ON public.subscriptions 
FOR SELECT 
TO authenticated 
USING (public.is_current_user_admin());

-- Allow admin users to manage subscriptions
CREATE POLICY "Admin users can manage subscriptions" 
ON public.subscriptions 
FOR ALL 
TO authenticated 
USING (public.is_current_user_admin()) 
WITH CHECK (public.is_current_user_admin());

-- Allow anyone to insert new subscriptions (public subscription form)
CREATE POLICY "Anyone can subscribe" 
ON public.subscriptions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- PROSPECTS TABLE - Critical fix for business data exposure
-- Deny all public access first
CREATE POLICY "Deny all public access to prospects" 
ON public.prospects 
FOR ALL 
TO anon, authenticated 
USING (false) 
WITH CHECK (false);

-- Allow admin users full access to prospects
CREATE POLICY "Admin users can manage all prospects" 
ON public.prospects 
FOR ALL 
TO authenticated 
USING (public.is_current_user_admin()) 
WITH CHECK (public.is_current_user_admin());

-- CONTACT MESSAGES TABLE - Critical fix for customer data exposure
-- Deny all public access first
CREATE POLICY "Deny all public access to contact messages" 
ON public.contact_messages 
FOR ALL 
TO anon, authenticated 
USING (false) 
WITH CHECK (false);

-- Allow admin users full access to contact messages
CREATE POLICY "Admin users can manage all contact messages" 
ON public.contact_messages 
FOR ALL 
TO authenticated 
USING (public.is_current_user_admin()) 
WITH CHECK (public.is_current_user_admin());

-- Allow anyone to insert new contact messages (public contact form)
CREATE POLICY "Anyone can send contact messages" 
ON public.contact_messages 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);