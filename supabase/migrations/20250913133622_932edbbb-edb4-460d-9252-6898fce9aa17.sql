-- Fix RLS policy issue for user_roles table
-- Add proper RLS policies for the user_roles table

-- Policy to allow users to view their own roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

-- Policy to allow admins to manage all user roles
CREATE POLICY "Admins can manage all user roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));