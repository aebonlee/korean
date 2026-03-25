import { useEffect } from 'react';

const DEFAULT_TITLE = 'Korean Pro';
const DEFAULT_DESCRIPTION = '베트남, 인도, 일본, 영어권 학생을 위한 체계적 한국어 학습. 한글, 회화, 문법, TOPIK까지.';
const DEFAULT_IMAGE = 'https://korean.dreamitbiz.com/og-image.png';
const SITE_URL = 'https://korean.dreamitbiz.com';

function setMetaTag(property, content) {
  if (!content) return;

  const attr = property.startsWith('og:') ? 'property' : 'name';
  let element = document.querySelector(`meta[${attr}="${property}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, property);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export default function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
}) {
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaImage = image || DEFAULT_IMAGE;
  const metaUrl = url || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = fullTitle;

    setMetaTag('description', metaDescription);
    setMetaTag('og:title', fullTitle);
    setMetaTag('og:description', metaDescription);
    setMetaTag('og:image', metaImage);
    setMetaTag('og:url', metaUrl);
    setMetaTag('og:type', type);
    setMetaTag('og:site_name', DEFAULT_TITLE);

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', metaDescription);
    setMetaTag('twitter:image', metaImage);

    return () => {
      document.title = previousTitle;
    };
  }, [fullTitle, metaDescription, metaImage, metaUrl, type]);

  return null;
}
