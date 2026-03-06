import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CANONICAL_LINK_ID = 'canonical-url';

/**
 * Sets a self-referencing <link rel="canonical" href="CURRENT_PAGE_URL" /> in the document head
 * on every route. Use at app root so all pages get a canonical tag for SEO.
 * - Prefers https and VITE_SITE_URL when set (e.g. production).
 * - Pathname gets a trailing slash except for root.
 */
export function CanonicalTag() {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = (
      import.meta.env.VITE_SITE_URL ??
      (typeof window !== 'undefined' ? window.location.origin : '')
    )
      .toString()
      .replace(/\/$/, '');

    let pathname = location.pathname;
    if (pathname !== '/' && !pathname.endsWith('/')) {
      pathname = `${pathname}/`;
    }

    const canonicalHref = `${baseUrl}${pathname}`;

    let link = document.getElementById(CANONICAL_LINK_ID) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = CANONICAL_LINK_ID;
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalHref;
  }, [location.pathname]);

  return null;
}
