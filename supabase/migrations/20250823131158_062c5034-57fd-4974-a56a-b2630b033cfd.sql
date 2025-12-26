-- Update the page password entry to use 'accounts' instead of 'contacts'
UPDATE public.page_passwords 
SET page_name = 'accounts' 
WHERE page_name = 'contacts';