-- Add CRM specific fields to form_submissions
ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New',
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS deal_value DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS follow_up_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_contacted_at TIMESTAMP WITH TIME ZONE;