-- Remove the public read policy that exposes password hashes
DROP POLICY IF EXISTS "Allow reading page passwords" ON public.page_passwords;

-- Create a secure policy that completely denies public access
CREATE POLICY "No public access to password hashes" 
ON public.page_passwords 
FOR ALL 
USING (false)
WITH CHECK (false);

-- Create a secure function to validate passwords server-side
-- This function takes a plain text password and page name, returns boolean
CREATE OR REPLACE FUNCTION public.validate_page_password(
  p_page_name TEXT,
  p_password TEXT
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  -- Get the stored password hash for the page
  SELECT password_hash INTO stored_hash 
  FROM public.page_passwords 
  WHERE page_name = p_page_name;
  
  -- If no password found for this page, return false
  IF stored_hash IS NULL THEN
    RETURN false;
  END IF;
  
  -- Compare the provided password with the stored hash
  -- Note: This currently does simple comparison, but could be enhanced
  -- with proper password hashing functions like bcrypt in the future
  RETURN (p_password = stored_hash);
END;
$$;