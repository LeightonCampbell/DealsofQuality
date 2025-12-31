-- Secure form_submissions SELECT policy
-- This migration ensures only authenticated admin users can SELECT from form_submissions
-- Anonymous users and non-admin authenticated users are explicitly denied access

-- Drop existing SELECT policy if it exists (to recreate with proper restrictions)
DROP POLICY IF EXISTS "Admins can view all form submissions" ON public.form_submissions;

-- Ensure RLS is enabled (idempotent - safe to run multiple times)
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create SELECT policy with explicit admin-only access
-- This policy ONLY allows SELECT for authenticated users who have the 'admin' role
-- All other users (anonymous, authenticated non-admins) are denied by RLS default behavior
CREATE POLICY "Admins can view all form submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (
  -- Explicitly check that user is authenticated AND has admin role
  auth.uid() IS NOT NULL 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Security Note:
-- With RLS enabled and this policy in place:
-- 1. Anonymous users (anon role) cannot SELECT - denied by default (no matching policy)
-- 2. Authenticated users without admin role cannot SELECT - policy USING clause returns false
-- 3. Only authenticated users with admin role can SELECT - policy USING clause returns true
