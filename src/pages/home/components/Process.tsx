import { useTranslation } from 'react-i18next';

export default function Process() {
  const { t } = useTranslation('common');

  const steps = [
    {
      number: '01',
      title: t('process.steps.discovery.title'),
      description: t('process.steps.discovery.description'),
      icon: 'ri-discuss-line',
      color: 'from-[#4EFFEF] to-[#26A3AD]'
    },
    {
      number: '02',
      title: t('process.steps.strategy.title'),
      description: t('process.steps.strategy.description'),
      icon: 'ri-file-list-3-line',
      color: 'from-[#26A3AD] to-[#E2B679]'
    },
    {
      number: '03',
      title: t('process.steps.design.title'),
      description: t('process.steps.design.description'),
      icon: 'ri-palette-line',
      color: 'from-[#E2B679] to-[#4EFFEF]'
    },
    {
      number: '04',
      title: t('process.steps.production.title'),
      description: t('process.steps.production.description'),
      icon: 'ri-rocket-line',
      color: 'from-[#4EFFEF] to-[#26A3AD]'
    }
  ];

  return (
    <section id="proceso" className="py-20 md:py-32 bg-white dark:bg-[#2D3232] transition-colors duration-300 relative overflow-hidden">
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
            {t('process.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF]">{t('process.titleHighlight')}</span>
          </h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-[#2D3232] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 hover:border-transparent dark:hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>

              <div className="relative">
                <div className={`inline-flex w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${step.color} items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${step.icon} text-2xl sm:text-3xl text-white`}></i>
                </div>

                <div className={`text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20 mb-3 sm:mb-4`} style={{ fontFamily: '"Syne", sans-serif' }}>
                  {step.number}
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-[#2D3232] dark:text-white mb-3 sm:mb-4" style={{ fontFamily: '"Syne", sans-serif' }}>
                  {step.title}
                </h4>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <i className="ri-arrow-right-line text-2xl sm:text-3xl text-[#26A3AD] dark:text-[#4EFFEF]"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden max-h-[300px] sm:max-h-[400px] md:max-h-[500px]">
          <img
            src="/images/process-proven.png"
            alt={t('process.cta.title')}
            title={t('process.badge')}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D3232]/90 via-[#2D3232]/70 to-transparent flex items-center">
            <div className="max-w-2xl p-6 sm:p-8 md:p-12 lg:p-16">
              <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6" style={{ fontFamily: '"Syne", sans-serif' }}>
                {t('process.cta.title')}
              </h4>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-4 sm:mb-6 md:mb-8">
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
      </div>
    </section>
  );
}