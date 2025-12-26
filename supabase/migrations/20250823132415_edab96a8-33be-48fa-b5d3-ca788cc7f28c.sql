-- Remove the overly permissive public read policy for subscriptions
DROP POLICY IF EXISTS "Anyone can read subscriptions" ON public.subscriptions;

-- Create a more secure policy that denies public read access
-- Since this is a password-protected CRM system, we'll restrict read access entirely
-- Only allow INSERT for public subscription sign-ups
CREATE POLICY "No public read access to subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (false);

-- Keep the existing insert policy for public subscription functionality
-- The "Anyone can subscribe" policy remains unchanged