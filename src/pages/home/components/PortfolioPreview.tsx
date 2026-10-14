import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export type PreviewItem = {
  id: string;
  client: string;
  title: string;
  image: string;
  url?: string;
};

interface PortfolioPreviewProps {
  heading: string;
  items: PreviewItem[];
  onClose: () => void;
}

// Mini ventana de pre-visualización: muestra las fotos del portafolio relacionadas con una tarjeta.
export default function PortfolioPreview({ heading, items, onClose }: PortfolioPreviewProps) {
  const { t } = useTranslation('common');
  const [index, setIndex] = useState(0);
  const total = items.length;
  const go = (d: number) => setIndex((i) => (i + d + total) % total);
  const current = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={heading}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-paper-soft dark:bg-navy-soft rounded-3xl shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-lg sm:text-xl font-bold text-[#2D3232] dark:text-white" style={{ fontFamily: '"Syne", sans-serif' }}>
            {heading}
          </h4>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="w-10 h-10 shrink-0 rounded-full bg-paper-deep dark:bg-[#24304A] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-600 dark:text-gray-300"></i>
          </button>
        </div>

        <div className="relative flex-1 min-h-0 bg-black/5 dark:bg-black/30 flex items-center justify-center p-3 sm:p-4">
          <img
            src={current.image}
            alt={`${current.client} — ${current.title}`}
            className="max-h-[52vh] w-auto max-w-full object-contain rounded-xl"
          />
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t('portfolioPage.prev')}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
              >
                <i className="ri-arrow-left-s-line text-2xl"></i>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t('portfolioPage.next')}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
              >
                <i className="ri-arrow-right-s-line text-2xl"></i>
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="flex gap-2 overflow-x-auto px-4 sm:px-5 py-3 border-t border-gray-200 dark:border-gray-700">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${item.client} — ${item.title}`}
                aria-current={i === index}
                className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${i === index ? 'border-[#26A3AD] dark:border-[#4EFFEF] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={item.image} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#2D3232] dark:text-white truncate">{current.client}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {current.title}
              {total > 1 && <span className="ml-2 text-xs text-gray-500">{index + 1}/{total}</span>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {current.url && (
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-[#1A7F88] dark:text-[#4EFFEF] border-2 border-[#26A3AD] hover:bg-[#26A3AD]/10 transition-colors"
              >
                {t('portfolioPage.visit')} <i className="ri-external-link-line"></i>
              </a>
            )}
            <Link
              to="/portafolio"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1A7F88] to-[#26A3AD] hover:scale-105 transition-transform"
            >
              {t('portfolioPage.cta')} <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
