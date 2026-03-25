import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function SEOHead() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Update title based on language
    const titles = {
      es: 'BoxesMedia360 Hollister CA - Identidad de Marca y Diseño Gráfico Comercial',
      en: 'BoxesMedia360 Hollister CA - Brand Identity & Commercial Graphic Design Studio'
    };

    // Update meta description based on language
    const descriptions = {
      es: 'Estudio creativo en Hollister CA especializado en identidad de marca, diseño gráfico comercial, soluciones digitales y producción audiovisual. Transformamos ideas en negocios operativos con infraestructura instantánea. Servicios 360° para PYMEs.',
      en: 'Professional creative studio in Hollister, California specializing in brand identity, commercial graphic design, digital solutions, and audiovisual production. We transform ideas into operational businesses with instant infrastructure. 360° services for businesses.'
    };

    // Update keywords based on language
    const keywords = {
      es: 'diseño gráfico Hollister, identidad de marca California, estudio creativo Hollister CA, diseño web Hollister, producción audiovisual California, pantallas LED comerciales, wraps vehiculares Hollister',
      en: 'graphic design Hollister, brand identity California, creative studio Hollister CA, web design Hollister, audiovisual production California, commercial LED screens, vehicle wraps Hollister'
    };

    document.title = titles[currentLang as keyof typeof titles] || titles.es;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[currentLang as keyof typeof descriptions] || descriptions.es);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords[currentLang as keyof typeof keywords] || keywords.es);
    }

    // Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      const ogTitles = {
        es: 'BoxesMedia360 - Estudio Creativo en Hollister CA | Identidad de Marca y Diseño Gráfico',
        en: 'BoxesMedia360 - Creative Studio in Hollister CA | Brand Identity & Graphic Design'
      };
      ogTitle.setAttribute('content', ogTitles[currentLang as keyof typeof ogTitles] || ogTitles.es);
    }

    // Update Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', descriptions[currentLang as keyof typeof descriptions] || descriptions.es);
    }

    // Update Open Graph locale
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      const locales = {
        es: 'es_ES',
        en: 'en_US'
      };
      ogLocale.setAttribute('content', locales[currentLang as keyof typeof locales] || locales.es);
    }

  }, [currentLang]);

  return null;
}
