import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface SeoHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, ogImage, canonical }) => {
  const { t, i18n } = useTranslation('common');
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = title || t('meta.title');
    const pageDescription = description || t('meta.description');
    const pageCanonical = canonical || `https://josuerocha.dev${pathname === '/' ? '/' : pathname}`;

    // Update document title
    document.title = pageTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }

    // Update canonical
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', pageCanonical);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    if (ogDesc) ogDesc.setAttribute('content', pageDescription);
    if (ogUrl) ogUrl.setAttribute('content', pageCanonical);

    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      const twitterImg = document.querySelector('meta[name="twitter:image"]');
      if (ogImg) ogImg.setAttribute('content', ogImage);
      if (twitterImg) twitterImg.setAttribute('content', ogImage);
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);
    if (twitterDescription) twitterDescription.setAttribute('content', pageDescription);

    // Update html lang attribute
    document.documentElement.lang = i18n.language;

  }, [t, i18n.language, title, description, ogImage, canonical, pathname]);

  return null;
};

export default SeoHead;