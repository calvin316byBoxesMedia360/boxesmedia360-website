import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation('common');

  const services = [
    {
      icon: 'ri-palette-line',
      title: t('services.items.branding.title'),
      description: t('services.items.branding.description'),
      image: 'https://readdy.ai/api/search-image?query=Professional%20brand%20identity%20design%20process%20with%20logo%20sketches%2C%20color%20palettes%2C%20typography%20samples%2C%20and%20brand%20guidelines%20on%20a%20modern%20designer%20desk%2C%20creative%20workspace%20with%20turquoise%20accents%2C%20minimalist%20aesthetic%2C%20high-quality%20professional%20photography&width=600&height=400&seq=service-001&orientation=landscape'
    },
    {
      title: t('services.items.graphic.title'),
      description: t('services.items.graphic.description'),
      image: '/images/graphic-design.jpg',
      featured: true
    },
    {
      title: t('services.items.digital.title'),
      description: t('services.items.digital.description'),
      image: '/images/digital-solutions.jpg'
    },
    {
      title: t('services.items.audiovisual.title'),
      description: t('services.items.audiovisual.description'),
      image: '/images/audiovisual-production.jpg?v=2'
    },
    {
      title: t('services.items.prepress.title'),
      description: t('services.items.prepress.description'),
      image: 'https://readdy.ai/api/search-image?query=Professional%20pre-press%20production%20workspace%20with%20color%20calibration%20tools%2C%20print%20samples%2C%20technical%20specifications%2C%20modern%20printing%20studio%2C%20clean%20organized%20environment%2C%20professional%20printing%20materials%2C%20contemporary%20production%20facility%20with%20quality%20control%20setup&width=800&height=600&seq=service-005&orientation=landscape'
    },
    {
      title: t('services.items.led.title'),
      description: t('services.items.led.description'),
      image: '/images/led-screens.jpg'
    }
  ];

  return (
    <section id="servicios" className="py-20 md:py-32 bg-white dark:bg-[#2D3232] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-20">
          <span className="text-sm font-bold text-[#26A3AD] dark:text-[#4EFFEF] tracking-wider uppercase mb-4 block">
            {t('services.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D3232] dark:text-white mb-4 md:mb-6 px-4" style={{ fontFamily: '"Syne", sans-serif' }}>
            {t('services.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF]">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            {t('services.subtitle')}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <article
              key={index}
              className={`group relative bg-white dark:bg-[#2D3232] rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col ${service.featured
                ? 'border-[#26A3AD]/50 dark:border-[#4EFFEF]/50 ring-2 ring-[#26A3AD]/20 dark:ring-[#4EFFEF]/20'
                : 'border-gray-100 dark:border-gray-800 hover:border-transparent dark:hover:border-transparent'
                }`}
            >
              {service.featured && (
                <div className="absolute top-4 right-4 z-20 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF] rounded-full text-white text-xs md:text-sm font-bold shadow-lg">
                  {t('services.featured')}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-[#4EFFEF] to-[#26A3AD] opacity-0 group-hover:opacity-10 transition-opacity duration-500">
              </div>

              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  title={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="relative p-6 md:p-8 flex flex-col flex-grow">
                <div className="inline-block w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#4EFFEF] to-[#26A3AD] mb-4 md:mb-6 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  <span className="text-white text-lg md:text-xl font-bold">{index + 1}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#2D3232] dark:text-white mb-3 md:mb-4" style={{ fontFamily: '"Syne", sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 md:mt-24 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#26A3AD] to-[#4EFFEF] p-8 md:p-12 lg:p-16">
          <div className="relative z-10 text-center text-white">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4" style={{ fontFamily: '"Syne", sans-serif' }}>
              {t('services.infrastructure.title')}
            </h3>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed opacity-95 px-4">
              {t('services.infrastructure.description')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-6 text-base md:text-lg font-semibold px-4">
              <div className="flex items-center gap-2">
                <i className="ri-check-line text-xl md:text-2xl"></i>
                <span>{t('services.infrastructure.features.provider')}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-check-line text-xl md:text-2xl"></i>
                <span>{t('services.infrastructure.features.coherence')}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-check-line text-xl md:text-2xl"></i>
                <span>{t('services.infrastructure.features.speed')}</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
