import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
  jsonLd?: object;
}

const SITE_NAME = "Deals Of Quality";
const BASE_URL = "https://www.dealsofquality.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * SEO Component - Provides consistent metadata across all pages
 * 
 * @param title - Page title (will be appended with site name if not home)
 * @param description - Meta description (max 160 chars recommended)
 * @param keywords - Optional comma-separated keywords
 * @param canonicalUrl - Override for canonical URL (auto-generated from route if not provided)
 * @param ogImage - Open Graph image URL (defaults to og-image.png)
 * @param ogType - Open Graph type (website, article, product)
 * @param noIndex - Set to true to prevent indexing
 * @param jsonLd - Optional JSON-LD structured data
 */
const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  jsonLd,
}: SEOProps) => {
  const location = useLocation();
  
  // Auto-generate canonical URL from current path if not provided
  const canonical = canonicalUrl || `${BASE_URL}${location.pathname}`;
  
  // Clean trailing slashes for consistency (except root)
  const cleanCanonical = canonical.endsWith("/") && canonical !== `${BASE_URL}/` 
    ? canonical.slice(0, -1) 
    : canonical;

  return (
    <Helmet>
      {/* Favicon: explicit absolute URLs so Google always uses your icon (avoids old/cached third-party icons) */}
      <link rel="icon" type="image/x-icon" href="https://www.dealsofquality.com/favicon.ico" />
      <link rel="icon" type="image/png" sizes="48x48" href="https://www.dealsofquality.com/favicon.png" />
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} 
      />
      
      {/* Canonical */}
      <link rel="canonical" href={cleanCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={cleanCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@doquality" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
