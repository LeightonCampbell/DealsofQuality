-- Ensure form_submissions SELECT policy is properly secured
-- This migration verifies and enforces admin-only SELECT access
-- Addresses security concern: form_submissions should not be publicly readable

-- Ensure RLS is enabled (idempotent - safe to run multiple times)
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Drop any existing SELECT policies to ensure clean state
DROP POLICY IF EXISTS "Admins can view all form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Only admins can view submissions" ON public.form_submissions;

-- Create explicit admin-only SELECT policy
-- This policy ensures ONLY authenticated users with admin role can SELECT
-- Anonymous users and non-admin authenticated users are denied by default (RLS behavior)
CREATE POLICY "Only admins can view submissions"
ON public.form_submissions
FOR SELECT
USING (
  -- Explicit check: user must be authenticated AND have admin role
  auth.uid() IS NOT NULL 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Security Verification:
-- With RLS enabled and this policy:
-- ✅ Anonymous users (anon role) cannot SELECT - no matching policy (denied by default)
-- ✅ Authenticated users without admin role cannot SELECT - USING clause returns false
-- ✅ Only authenticated users with admin role can SELECT - USING clause returns true
-- ✅ All INSERT operations remain public (for form submissions)
-- ✅ UPDATE/DELETE operations require admin role (existing policies)

