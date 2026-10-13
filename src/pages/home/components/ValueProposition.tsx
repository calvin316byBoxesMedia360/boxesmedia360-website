import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Modal from '../../../components/Modal';

export default function ValueProposition() {
  const { t } = useTranslation('common');
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);

  const benefits = [
    {
      icon: 'ri-flashlight-line',
      title: t('valueProposition.features.speed.title'),
      description: t('valueProposition.features.speed.description'),
      image: '/images/stock/benefit-speed.webp',
      modalKey: 'speed'
    },
    {
      icon: 'ri-stack-line',
      title: t('valueProposition.features.contact.title'),
      description: t('valueProposition.features.contact.description'),
      image: '/images/stock/benefit-integration.webp',
      modalKey: 'contact'
    },
    {
      icon: 'ri-ai-generate',
      title: t('valueProposition.features.ai.title'),
      description: t('valueProposition.features.ai.description'),
      image: '/images/stock/benefit-ai.webp',
      modalKey: 'ai'
    },
    {
      icon: 'ri-palette-line',
      title: t('valueProposition.features.aesthetic.title'),
      description: t('valueProposition.features.aesthetic.description'),
      image: '/images/stock/benefit-aesthetic.webp',
      modalKey: 'aesthetic'
    }
  ];

  const getModalContent = (modalKey: string) => {
    const feature = (t as any)(`valueProposition.features.${modalKey}.modalContent`, { returnObjects: true });
    return feature;
  };

  return (
    <section id="propuesta" className="py-20 md:py-32 bg-paper dark:bg-[#1a1d1d] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-sm sm:text-base font-bold text-[#26A3AD] dark:text-[#4EFFEF] tracking-wider uppercase mb-4 block">
            {t('valueProposition.badge')}
          </span>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D3232] dark:text-white mb-6 md:mb-8 leading-tight px-4" style={{ fontFamily: '"Syne", sans-serif' }}>
            {t('valueProposition.title')}
            <br />
            <span className="text-brand-gradient">
              {t('valueProposition.titleHighlight')}
            </span>
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 md:mb-12 leading-relaxed max-w-4xl mx-auto px-4">
            {t('valueProposition.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onClick={() => setSelectedBenefit(index)}
              className="group relative bg-paper-soft dark:bg-[#2D3232] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-[#26A3AD] dark:hover:border-[#4EFFEF] transition-all duration-500 hover:shadow-2xl cursor-pointer hover:scale-[1.02]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  title={benefit.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative p-6 sm:p-8 md:p-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#26A3AD] to-[#4EFFEF] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${benefit.icon} text-2xl sm:text-3xl text-white`}></i>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-[#2D3232] dark:text-white mb-3 sm:mb-4" style={{ fontFamily: '"Syne", sans-serif' }}>
                  {benefit.title}
                </h4>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {benefit.description}
                </p>

                <div className="flex items-center gap-2 text-[#26A3AD] dark:text-[#4EFFEF] font-semibold group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm">{t('learnMore')}</span>
                  <i className="ri-arrow-right-line text-lg"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedBenefit !== null && (
          <Modal
            isOpen={true}
            onClose={() => setSelectedBenefit(null)}
            title={benefits[selectedBenefit].title}
            icon={benefits[selectedBenefit].icon}
          >
            {(() => {
              const modalContent = getModalContent(benefits[selectedBenefit].modalKey);
              return (
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    {modalContent.subtitle}
                  </p>

                  <div className="space-y-4">
                    {modalContent.benefits.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-paper dark:bg-[#1a1d1d] rounded-2xl p-5 border border-gray-200 dark:border-gray-700"
                      >
                        <h5 className="text-lg font-bold text-[#2D3232] dark:text-white mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF]"></div>
                          {item.title}
                        </h5>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Stats Card */}
                  <div className="bg-gradient-to-br from-[#26A3AD] to-[#4EFFEF] rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90 mb-1">{modalContent.stats.label}</p>
                        <p className="text-4xl font-bold" style={{ fontFamily: '"Syne", sans-serif' }}>
                          {modalContent.stats.value}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-90">{modalContent.stats.comparison}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Modal>
        )}

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4EFFEF]/20 to-[#26A3AD]/20 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-h-[400px] sm:max-h-[500px] md:max-h-[600px]">
              <img
                src="/images/stock/team-workspace.webp"
                alt={t('valueProposition.badge')}
                title="BoxesMedia360"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="absolute -bottom-6 sm:-bottom-8 -right-4 sm:-right-8 bg-paper-soft dark:bg-[#2D3232] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 max-w-[200px] sm:max-w-xs">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#4EFFEF] to-[#26A3AD] flex items-center justify-center">
                  <i className="ri-rocket-line text-lg sm:text-xl text-white"></i>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#26A3AD] dark:text-[#4EFFEF]" style={{ fontFamily: '"Syne", sans-serif' }}>75%</div>
                  <div className="text-xs sm:text-base text-gray-600 dark:text-gray-400 font-medium">{t('valueProposition.badge75')}</div>
                </div>
              </div>
              <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400">
                {t('valueProposition.features.revenue.description')}
              </p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div className="bg-gradient-to-br from-[#26A3AD] to-[#4EFFEF] rounded-3xl p-6 sm:p-8 md:p-10 text-white">
              <h4 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ fontFamily: '"Syne", sans-serif' }}>
                {t('valueProposition.badge')}
              </h4>
              <p className="text-base sm:text-lg leading-relaxed opacity-95 mb-4 sm:mb-6">
                {t('valueProposition.description')}
              </p>
              <div className="space-y-3 sm:space-y-4 bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <i className="ri-time-line text-2xl sm:text-3xl flex-shrink-0 mt-1"></i>
                  <div>
                    <span className="text-base sm:text-lg font-bold block mb-1">{t('valueProposition.features.speed.title')}</span>
                    <span className="text-sm sm:text-base opacity-90">{t('valueProposition.features.speed.description')}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-team-line text-2xl sm:text-3xl flex-shrink-0 mt-1"></i>
                  <div>
                    <span className="text-base sm:text-lg font-bold block mb-1">{t('valueProposition.features.contact.title')}</span>
                    <span className="text-sm sm:text-base opacity-90">{t('valueProposition.features.contact.description')}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-money-dollar-circle-line text-2xl sm:text-3xl flex-shrink-0 mt-1"></i>
                  <div>
                    <span className="text-base sm:text-lg font-bold block mb-1">{t('valueProposition.features.revenue.title')}</span>
                    <span className="text-sm sm:text-base opacity-90">{t('valueProposition.features.revenue.description')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}