-- Add new enum values for prospect stages
ALTER TYPE prospect_stage ADD VALUE 'planning_booked';
ALTER TYPE prospect_stage ADD VALUE 'recording_booked';

-- Update existing 'booked' records to 'planning_booked' to maintain data consistency
UPDATE prospects SET stage = 'planning_booked' WHERE stage = 'booked';