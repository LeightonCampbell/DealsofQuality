-- Drop any existing SELECT policies on leads table
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Only admins can view leads" ON public.leads;

-- Create a PERMISSIVE SELECT policy that only allows admins to view leads
CREATE POLICY "Only admins can view leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));