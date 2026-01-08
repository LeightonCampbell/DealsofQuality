-- Add urgency column to form_submissions table
-- This column stores the user's urgency preference: "As soon as possible", "Within a week", or "Flexible timing"
ALTER TABLE public.form_submissions
ADD COLUMN urgency TEXT;
