# Deals Of Quality - Premium Home Services Marketplace

## Admin Dashboard Access

### Accessing the Admin Dashboard

1. **Admin Login Page**: Navigate to `/admin` in your browser
   - URL: `https://www.dealsofquality.com/admin`
   - Or locally: `http://localhost:8080/admin`

2. **Admin Dashboard**: After logging in, you'll be redirected to `/admin/dashboard`
   - URL: `https://www.dealsofquality.com/admin/dashboard`

### Authentication

- The admin dashboard requires authentication through Supabase
- You must have an admin role assigned in the `user_roles` table
- Contact your system administrator to set up admin access

### Direct URL Access (Routing)

If you're having trouble accessing pages by typing the URL directly in the address bar:

**For Development:**
- Direct URL access should work automatically with Vite's dev server
- Example: `http://localhost:8080/services` or `http://localhost:8080/plumbing`

**For Production:**
- The `vercel.json` configuration file ensures all routes are properly handled
- All routes should redirect to `index.html` for proper client-side routing
- If you're using a different hosting provider, you may need to configure your server to serve `index.html` for all routes

**If direct URLs still don't work:**
1. Make sure you're using the production build (`npm run build`)
2. Ensure your hosting provider supports SPA routing (most modern hosts do)
3. Check that `vercel.json` is deployed (for Vercel) or configure your server accordingly

### Available Routes

- `/` - Homepage
- `/services` - All services listing
- `/contact` - Contact page
- `/faqs` - FAQs page
- `/join-as-pro` - Join as a professional
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/admin` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/plumbing`, `/electrical`, `/hvac`, etc. - Individual service pages

## SEO Configuration

The website is configured for search engine indexing:

- ✅ `robots.txt` allows all search engines to crawl
- ✅ `sitemap.xml` includes all service pages
- ✅ Meta tags and structured data (JSON-LD) on all pages
- ✅ Canonical URLs for all pages
- ✅ Open Graph tags for social sharing

### Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://www.dealsofquality.com`
3. Submit your sitemap: `https://www.dealsofquality.com/sitemap.xml`
4. Request indexing for important pages

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- Supabase
