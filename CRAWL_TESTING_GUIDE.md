# How to Test if Search Engines Can Crawl Your Website

## Quick Tests You Can Do Right Now

### 1. Test robots.txt Accessibility
**Test URL:** `https://www.dealsofquality.com/robots.txt`

**How to test:**
- Open your browser
- Navigate to: `https://www.dealsofquality.com/robots.txt`
- You should see the robots.txt content
- Verify it shows: `User-agent: * Allow: /`

**Expected result:** File should be accessible and allow all crawlers

---

### 2. Test Sitemap Accessibility
**Test URL:** `https://www.dealsofquality.com/sitemap.xml`

**How to test:**
- Navigate to: `https://www.dealsofquality.com/sitemap.xml`
- You should see an XML file listing all your pages
- Verify it includes all service pages

**Expected result:** XML sitemap should be readable and contain all URLs

---

### 3. Test Direct URL Access (SPA Routing)
**Test these URLs directly in your browser:**
- `https://www.dealsofquality.com/services`
- `https://www.dealsofquality.com/plumbing`
- `https://www.dealsofquality.com/electrical`
- `https://www.dealsofquality.com/admin`

**Expected result:** All URLs should load correctly (not show 404 errors)

---

### 4. Use Google's Rich Results Test
**Tool:** https://search.google.com/test/rich-results

**Steps:**
1. Go to the tool
2. Enter your homepage URL: `https://www.dealsofquality.com`
3. Click "Test URL"
4. Check if structured data is detected

**What to look for:**
- ✅ Organization schema detected
- ✅ Service schema detected
- ✅ No errors

---

### 5. Use Google's Mobile-Friendly Test
**Tool:** https://search.google.com/test/mobile-friendly

**Steps:**
1. Enter your URL: `https://www.dealsofquality.com`
2. Click "Test URL"
3. Review results

**What to check:**
- ✅ Page is mobile-friendly
- ✅ No blocking resources
- ✅ Text is readable

---

### 6. Use Google Search Console URL Inspection Tool
**Tool:** Available in Google Search Console

**Steps:**
1. Go to: https://search.google.com/search-console
2. Add your property if not already added
3. Use "URL Inspection" tool
4. Enter a page URL (e.g., `https://www.dealsofquality.com/plumbing`)
5. Click "Test Live URL"
6. Click "Request Indexing"

**What to check:**
- ✅ URL is on Google
- ✅ Page is indexable
- ✅ No crawl errors

---

### 7. Test with curl (Command Line)

**Test robots.txt:**
```bash
curl -I https://www.dealsofquality.com/robots.txt
```

**Test sitemap:**
```bash
curl -I https://www.dealsofquality.com/sitemap.xml
```

**Test a service page:**
```bash
curl -I https://www.dealsofquality.com/plumbing
```

**Expected response:** HTTP 200 status code

---

### 8. Simulate Googlebot Crawl

**Using curl to simulate Googlebot:**
```bash
curl -A "Googlebot" https://www.dealsofquality.com/robots.txt
curl -A "Googlebot" https://www.dealsofquality.com/sitemap.xml
curl -A "Googlebot" https://www.dealsofquality.com/plumbing
```

**Check response headers:**
```bash
curl -I -A "Googlebot" https://www.dealsofquality.com/
```

Look for:
- `HTTP/2 200` or `HTTP/1.1 200 OK`
- `Content-Type: text/html`
- No `X-Robots-Tag: noindex`

---

### 9. Check Page Source for Meta Tags

**Steps:**
1. Visit any page (e.g., `https://www.dealsofquality.com/plumbing`)
2. Right-click → "View Page Source" (or Ctrl+U)
3. Search for:
   - `<meta name="robots" content="index, follow">`
   - `<title>` tag with proper content
   - `<meta name="description">` tag
   - `<link rel="canonical">` tag
   - JSON-LD structured data

**Expected:** All meta tags should be present in the HTML source

---

### 10. Use Online SEO Testing Tools

**Screaming Frog SEO Spider (Free version available):**
- Download: https://www.screamingfrog.co.uk/seo-spider/
- Enter your URL
- Crawl the site
- Check for:
  - All pages are crawlable
  - Meta tags present
  - No broken links
  - Sitemap is accessible

**Google PageSpeed Insights:**
- Tool: https://pagespeed.web.dev/
- Enter your URL
- Check mobile and desktop scores
- Review SEO section

---

### 11. Check Server Response Headers

**Using browser DevTools:**
1. Open your website
2. Press F12 (Developer Tools)
3. Go to "Network" tab
4. Reload the page
5. Click on the main document request
6. Check "Response Headers"

**Look for:**
- `X-Robots-Tag` should NOT be `noindex`
- Status code should be `200`
- `Content-Type` should be `text/html`

---

### 12. Test JavaScript Rendering

**Important for React/SPA sites:**
- Search engines need to execute JavaScript to see content
- Test with: https://www.google.com/webmasters/tools/googlebot-fetch

**Or use:**
```bash
# Test if content is in initial HTML or requires JS
curl https://www.dealsofquality.com/ | grep -i "premium home services"
```

---

## Common Issues to Check

### ❌ If robots.txt is blocked:
- Check file permissions
- Verify file exists in `/public/robots.txt`
- Check server configuration

### ❌ If sitemap.xml is blocked:
- Verify file exists in `/public/sitemap.xml`
- Check Content-Type header (should be `application/xml`)
- Ensure `vercel.json` has proper headers

### ❌ If direct URLs return 404:
- Verify `vercel.json` is deployed
- Check that production build includes routing config
- Ensure hosting provider supports SPA routing

### ❌ If pages aren't indexed:
- Check meta robots tag (should be `index, follow`)
- Verify no `noindex` in headers
- Submit sitemap to Google Search Console
- Request indexing for important pages

---

## Quick Verification Checklist

- [ ] robots.txt is accessible at `/robots.txt`
- [ ] sitemap.xml is accessible at `/sitemap.xml`
- [ ] All service pages load when accessed directly
- [ ] Meta tags are present in page source
- [ ] Structured data (JSON-LD) is in HTML
- [ ] No `X-Robots-Tag: noindex` in headers
- [ ] Mobile-friendly test passes
- [ ] Rich results test shows structured data
- [ ] Sitemap submitted to Google Search Console
- [ ] Important pages requested for indexing

---

## Next Steps After Testing

1. **Submit to Google Search Console:**
   - Add property: `https://www.dealsofquality.com`
   - Submit sitemap: `https://www.dealsofquality.com/sitemap.xml`
   - Request indexing for homepage and key pages

2. **Monitor in Search Console:**
   - Check "Coverage" report for indexing status
   - Review "Sitemaps" section
   - Monitor "URL Inspection" for crawl issues

3. **Wait for Indexing:**
   - Initial crawl: 1-3 days
   - Full indexing: 1-4 weeks
   - Check progress in Search Console

---

## Testing Commands Summary

```bash
# Test robots.txt
curl -I https://www.dealsofquality.com/robots.txt

# Test sitemap
curl -I https://www.dealsofquality.com/sitemap.xml

# Test a service page
curl -I https://www.dealsofquality.com/plumbing

# Simulate Googlebot
curl -A "Googlebot" https://www.dealsofquality.com/

# Check if content is accessible
curl https://www.dealsofquality.com/ | grep -i "premium"
```

---

## Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify production build is deployed
3. Check hosting provider logs
4. Review `vercel.json` configuration
5. Test in incognito/private browsing mode
