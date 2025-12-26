-- Add publish_date column to prospects table
ALTER TABLE public.prospects 
ADD COLUMN publish_date DATE;

-- Add comment to describe the field
COMMENT ON COLUMN public.prospects.publish_date IS 'The date when the prospect content is scheduled to be published';