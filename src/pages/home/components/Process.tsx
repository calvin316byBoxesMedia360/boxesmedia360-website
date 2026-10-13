import { useTranslation } from 'react-i18next';

export default function Process() {
  const { t } = useTranslation('common');

  const steps = [
    {
      number: '01',
      title: t('process.steps.discovery.title'),
      description: t('process.steps.discovery.description'),
      icon: 'ri-discuss-line',
      color: 'from-[#4EFFEF] to-[#26A3AD]',
      image: '/images/process-discovery.png'
    },
    {
      number: '02',
      title: t('process.steps.strategy.title'),
      description: t('process.steps.strategy.description'),
      icon: 'ri-file-list-3-line',
      color: 'from-[#26A3AD] to-[#E2B679]',
      image: '/images/process-strategy.png'
    },
    {
      number: '03',
      title: t('process.steps.design.title'),
      description: t('process.steps.design.description'),
      icon: 'ri-palette-line',
      color: 'from-[#E2B679] to-[#4EFFEF]',
      image: '/images/process-design.png'
    },
    {
      number: '04',
      title: t('process.steps.production.title'),
      description: t('process.steps.production.description'),
      icon: 'ri-rocket-line',
      color: 'from-[#4EFFEF] to-[#26A3AD]',
      image: '/images/process-production.png'
    }
  ];

  return (
    <section id="proceso" className="py-20 md:py-32 bg-paper-soft dark:bg-[#2D3232] transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#4EFFEF] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#26A3AD] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-sm font-bold text-[#26A3AD] dark:text-[#4EFFEF] tracking-wider uppercase mb-4 block">
            {t('process.badge')}
          </span>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D3232] dark:text-white mb-4 md:mb-6 px-4" style={{ fontFamily: '"Syne", sans-serif' }}>
            {t('process.title')} <span className="text-brand-gradient">{t('process.titleHighlight')}</span>
          </h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative flex flex-col bg-paper-soft dark:bg-[#252a2a] rounded-3xl overflow-hidden border border-[#E2D9C8] dark:border-gray-800 hover:border-[#26A3AD]/60 dark:hover:border-[#4EFFEF]/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Imagen del paso (siempre visible) */}
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <span
                  className="absolute bottom-3 right-4 text-4xl sm:text-5xl font-bold text-white/90 drop-shadow-lg"
                  style={{ fontFamily: '"Syne", sans-serif' }}
                >
                  {step.number}
                </span>
                <div className={`absolute bottom-3 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} bg-[#26A3AD] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${step.icon} text-2xl text-white`}></i>
                </div>
              </div>

              <div className="relative p-6 sm:p-7 flex-1">
                <h4 className="text-xl sm:text-2xl font-bold text-[#2D3232] dark:text-white mb-3" style={{ fontFamily: '"Syne", sans-serif' }}>
                  {step.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-24 -right-5 z-20 w-8 h-8 rounded-full bg-paper-soft dark:bg-[#252a2a] border border-[#E2D9C8] dark:border-gray-700 items-center justify-center">
                  <i className="ri-arrow-right-line text-lg text-[#26A3AD] dark:text-[#4EFFEF]"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Banner "Proceso probado" con capa de desenfoque para legibilidad */}
        <div className="relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[440px] flex items-center">
          <img
            src="/images/process-proven.png"
            alt={t('process.cta.title')}
            title={t('process.badge')}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 backdrop-blur-[3px] bg-gradient-to-r from-[#1c2121]/90 via-[#1c2121]/70 to-[#1c2121]/30"></div>
          <div className="relative max-w-2xl p-6 sm:p-8 md:p-12 lg:p-16">
            <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg" style={{ fontFamily: '"Syne", sans-serif' }}>
              {t('process.cta.title')}
            </h4>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed mb-4 sm:mb-6 md:mb-8 drop-shadow">
              {t('process.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <i className="ri-check-line text-xl sm:text-2xl text-[#4EFFEF]"></i>
                <span className="text-sm sm:text-base md:text-lg font-semibold">{t('process.steps.launch.title')}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-white">
                <i className="ri-check-line text-xl sm:text-2xl text-[#4EFFEF]"></i>
                <span className="text-sm sm:text-base md:text-lg font-semibold">{t('process.steps.launch.description')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}