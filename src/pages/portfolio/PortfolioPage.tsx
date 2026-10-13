import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../home/components/Footer';
import portfolio from '../../data/portfolio.json';

type Item = {
  id: string;
  client: string;
  title: string;
  category: string;
  image: string;
  width: number;
  height: number;
  url?: string;
};

const items = portfolio.items as Item[];

// Traducción de categorías del repo (vienen en español)
const CATEGORY_EN: Record<string, string> = {
  'Identidad': 'Identity',
  'Diseño comercial': 'Commercial design',
  'Menús digitales': 'Digital menus',
  'Imagen de producto': 'Product imagery',
  'Web': 'Web',
};

export default function PortfolioPage() {
  const { t, i18n } = useTranslation('common');
  const isEn = i18n.language?.startsWith('en');
  const [active, setActive] = useState('all');
  const [open, setOpen] = useState<Item | null>(null);

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), []);
  const visible = active === 'all' ? items : items.filter((i) => i.category === active);
  const catLabel = (c: string) => (isEn ? CATEGORY_EN[c] ?? c : c);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t('portfolioPage.title')} — BoxesMedia360`;
  }, [t]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-paper dark:bg-navy transition-colors duration-300">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1A7F88] to-[#26A3AD] dark:from-[#0B1120] dark:to-[#1A7F88]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors">
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="font-medium">{t('services.servicePages.common.backToHome')}</span>
          </Link>
          <span className="block text-sm font-bold tracking-wider uppercase text-[#B8FFF8] mb-3">{t('portfolioPage.badge')}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: '"Syne", sans-serif' }}>
            {t('portfolioPage.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">{t('portfolioPage.subtitle')}</p>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-wrap gap-3 mb-10">
          {['all', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                active === c
                  ? 'bg-[#1A7F88] dark:bg-[#4EFFEF] text-white dark:text-[#0B1120] shadow-md'
                  : 'bg-paper-soft dark:bg-navy-soft text-gray-700 dark:text-gray-300 border border-[#D3C8B5] dark:border-gray-700 hover:border-[#26A3AD]'
              }`}
            >
              {c === 'all' ? t('portfolio.categories.all') : catLabel(c)}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {visible.map((item) => (
            <article
              key={item.id}
              className="mb-6 break-inside-avoid group bg-paper-soft dark:bg-navy-soft rounded-3xl overflow-hidden border border-[#D3C8B5] dark:border-gray-800 shadow-sm hover:shadow-xl transition-shadow"
            >
              <button
                type="button"
                onClick={() => setOpen(item)}
                className="block w-full overflow-hidden cursor-zoom-in"
                aria-label={`${t('portfolioPage.enlarge')}: ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={`${item.client} — ${item.title}`}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
              </button>
              <div className="p-5 sm:p-6">
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-semibold bg-[#26A3AD]/10 text-[#1A7F88] dark:text-[#4EFFEF] border border-[#26A3AD]/25">
                  {catLabel(item.category)}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#2D3232] dark:text-white" style={{ fontFamily: '"Syne", sans-serif' }}>
                  {item.client}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{item.title}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-[#1A7F88] dark:text-[#4EFFEF] hover:gap-3 transition-all"
                  >
                    {t('portfolioPage.visit')} <i className="ri-external-link-line"></i>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3232] dark:text-white mb-4" style={{ fontFamily: '"Syne", sans-serif' }}>
            {t('services.servicePages.common.readyToStart')}
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#1A7F88] to-[#26A3AD] hover:scale-105 hover:shadow-xl transition-all"
          >
            <i className="ri-mail-line text-xl"></i>
            {t('services.servicePages.common.contactNow')}
          </Link>
        </div>
      </main>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
            aria-label={t('close')}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          <figure className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={open.image} alt={`${open.client} — ${open.title}`} className="max-h-[80vh] w-auto mx-auto rounded-2xl shadow-2xl" />
            <figcaption className="mt-4 text-center text-white">
              <span className="font-bold">{open.client}</span> · {open.title}
            </figcaption>
          </figure>
        </div>
      )}

      <Footer />
    </div>
  );
}
