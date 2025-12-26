-- Add season column to prospects table
ALTER TABLE public.prospects 
ADD COLUMN season integer DEFAULT 1 NOT NULL;

-- Add index for better performance on season filtering
CREATE INDEX idx_prospects_season ON public.prospects(season);