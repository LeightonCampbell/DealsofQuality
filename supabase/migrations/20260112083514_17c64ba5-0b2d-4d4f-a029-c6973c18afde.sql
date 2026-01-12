-- This migration formalizes the UPDATE policy on user_roles that exists in schema
-- but was not tracked in migrations. This ensures consistent deployment across environments.

-- First drop if exists to avoid conflicts
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;

-- Create the UPDATE policy for admins on user_roles
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));