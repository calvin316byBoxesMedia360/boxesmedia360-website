import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../home/components/Footer';
import { legal } from './legalContent';

export default function LegalPage({ doc }: { doc: 'privacy' | 'terms' }) {
  const { i18n } = useTranslation('common');
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const content = legal[lang][doc];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${content.title} — BoxesMedia360`;
  }, [content.title]);

  return (
    <div className="min-h-screen bg-paper dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-gradient-to-br from-[#26A3AD] to-[#1A7F88] dark:from-[#1c2121] dark:to-[#26A3AD]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors">
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="font-medium">{lang === 'es' ? 'Volver a Inicio' : 'Back to Home'}</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: '"Syne", sans-serif' }}>
            {content.title}
          </h1>
          <p className="text-white/80 text-sm">{content.updated}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10">{content.intro}</p>
        <div className="space-y-8">
          {content.sections.map((section) => (
            <section key={section.heading} className="bg-paper-soft dark:bg-[#252a2a] rounded-2xl p-6 sm:p-8 border border-[#E2D9C8] dark:border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D3232] dark:text-white mb-4" style={{ fontFamily: '"Syne", sans-serif' }}>
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-gray-700 dark:text-gray-400 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
