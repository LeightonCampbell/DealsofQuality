-- Create the leads table for storing form submissions
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  service_type TEXT,
  zip_code TEXT,
  urgency TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  project_details TEXT,
  status TEXT DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for public/anonymous inserts (form submissions from unauthenticated users)
CREATE POLICY "Allow public lead submissions"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy for admins to view all leads
CREATE POLICY "Admins can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create policy for admins to update leads
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create policy for admins to delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));