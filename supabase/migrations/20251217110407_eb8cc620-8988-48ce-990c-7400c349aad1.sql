-- Add UPDATE policy for admins on form_submissions
CREATE POLICY "Admins can update form submissions"
ON public.form_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Add DELETE policy for admins on form_submissions
CREATE POLICY "Admins can delete form submissions"
ON public.form_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));