import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEO({
  title,
  description,
  keywords = 'AI optimization, GPU acceleration, machine learning, artificial intelligence, AI consulting, MLOps, data engineering',
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website'
}: SEOProps) {
  const location = useLocation();
  const baseUrl = (import.meta.env.VITE_SITE_URL ?? (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/$/, '');

  // Ensure pathname has trailing slash (except for root)
  let pathname = location.pathname;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    pathname = `${pathname}/`;
  }

  // Self-referencing canonical URL for this page (used when canonical prop is not provided)
  const currentUrl = `${baseUrl}${pathname}`;
  // Convert relative ogImage path to absolute URL
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);

    // Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:image', ogImageUrl);
    updateMetaTag('property', 'og:site_name', 'Jashom. AI');

    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImageUrl);
    updateMetaTag('name', 'twitter:site', '@neoteq');

    // Self-referencing canonical on every page (canonical prop overrides when provided, e.g. from blog API)
    const canonicalHref = (typeof canonical === 'string' && canonical.trim() !== '') ? canonical : currentUrl;
    updateLinkTag('canonical', canonicalHref);

    // Structured Data - Organization
    updateStructuredData('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Jashom',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: 'Leading AI and GPU optimization company',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'Customer Service',
        email: 'contact@neoteq.ai',
        availableLanguage: ['English']
      },
      sameAs: [
        'https://linkedin.com/company/neoteq'
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Silicon Valley',
        addressRegion: 'CA',
        addressCountry: 'US'
      }
    });

    // Structured Data - Website
    updateStructuredData('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Jashom',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });
  }, [title, description, keywords, canonical, currentUrl, ogImageUrl, ogType, baseUrl]);

  return null;
}

function updateMetaTag(attribute: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function updateStructuredData(id: string, data: object) {
  let script = document.getElementById(`structured-data-${id}`) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script') as HTMLScriptElement;
    script.id = `structured-data-${id}`;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  if (script) {
    script.textContent = JSON.stringify(data);
  }
}
