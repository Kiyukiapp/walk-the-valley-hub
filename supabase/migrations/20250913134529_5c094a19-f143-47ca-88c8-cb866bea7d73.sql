-- Ensure user_roles table and enum are properly set up
-- Create the enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Now insert the admin role for your user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('bd278100-d5ad-4f68-bd3b-2bed3ef2bc89', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;