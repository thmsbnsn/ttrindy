import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedDate?: string;
  author?: string;
  keywords?: string;
  noindex?: boolean;
}

export const MetaTags = ({
  title,
  description,
  canonical,
  ogImage = 'https://ttrindy.com/og-image.webp',
  ogType = 'website',
  publishedDate,
  author = 'Top Tier Restoration',
  keywords,
  noindex = false,
}: MetaTagsProps) => {
  const location = useLocation();
  const siteUrl = 'https://ttrindy.com';
  const fullTitle = `${title} | Top Tier Restoration`;
  const url = canonical || `${siteUrl}${location.pathname}`;
  const fullImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Default keywords if not provided
  const defaultKeywords = 'water damage restoration, fire damage restoration, storm damage repair, home remodeling, Indianapolis restoration, restoration services';
  const metaKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:site_name" content="Top Tier Restoration" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article specific */}
      {ogType === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
};

