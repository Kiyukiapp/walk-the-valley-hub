-- Add name column to subscriptions table
ALTER TABLE public.subscriptions 
ADD COLUMN name text;