import { useTranslation } from 'react-i18next';

export default function ValueProposition() {
  const { t } = useTranslation('common');
  
  const benefits = [
    {
      icon: 'ri-flashlight-line',
      title: t('valueProposition.features.speed.title'),
      description: t('valueProposition.features.speed.description'),
      image: 'https://readdy.ai/api/search-image?query=Dynamic%20speed%20motion%20blur%20effect%20with%20rocket%20launching%20upward%2C%20fast%20acceleration%20concept%20with%20vibrant%20energy%20trails%2C%20modern%20minimalist%20design%20with%20turquoise%20and%20teal%20gradient%20colors%2C%20professional%20business%20velocity%20visualization%2C%20clean%20contemporary%20aesthetic%2C%20high%20impact%20visual%20representing%20rapid%20growth%20and%20momentum%2C%20abstract%20speed%20lines%20and%20forward%20movement&width=400&height=400&seq=benefit-speed-radical-001&orientation=squarish'
    },
    {
      icon: 'ri-stack-line',
      title: t('valueProposition.features.contact.title'),
      description: t('valueProposition.features.contact.description'),
      image: 'https://readdy.ai/api/search-image?query=Interconnected%20geometric%20shapes%20forming%20unified%20system%2C%20puzzle%20pieces%20perfectly%20aligned%20in%20turquoise%20gradient%2C%20complete%20integrated%20solution%20visualization%2C%20modern%20minimalist%20design%20with%20clean%20lines%2C%20professional%20business%20unity%20concept%2C%20contemporary%20aesthetic%20showing%20seamless%20connection%20and%20harmony%2C%20abstract%20representation%20of%20all-in-one%20service&width=400&height=400&seq=benefit-integration-unified-002&orientation=squarish'
    },
    {
      icon: 'ri-ai-generate',
      title: 'Flujos Acelerados por IA',
      description: 'Tecnología de vanguardia para producir ediciones profesionales de video y campañas audiovisuales en tiempo récord.',
      image: 'https://readdy.ai/api/search-image?query=Futuristic%20AI%20neural%20network%20visualization%20with%20glowing%20nodes%20and%20connections%2C%20artificial%20intelligence%20brain%20concept%20in%20turquoise%20and%20teal%20colors%2C%20modern%20tech%20innovation%20with%20digital%20particles%2C%20professional%20cutting-edge%20technology%20imagery%2C%20clean%20minimalist%20design%20with%20cyber%20aesthetic%2C%20abstract%20representation%20of%20machine%20learning%20and%20automation%20power&width=400&height=400&seq=benefit-ai-advanced-003&orientation=squarish'
    },
    {
      icon: 'ri-palette-line',
      title: 'Coherencia Estética',
      description: 'Del diseño digital a la implementación física con precisión técnica impecable. Tu marca siempre perfecta en cada medio.',
      image: 'https://readdy.ai/api/search-image?query=Perfect%20color%20palette%20harmony%20with%20gradient%20swatches%20arranged%20in%20elegant%20composition%2C%20brand%20consistency%20visualization%20with%20turquoise%20teal%20and%20complementary%20colors%2C%20modern%20minimalist%20design%20aesthetic%2C%20professional%20design%20coherence%20concept%2C%20clean%20contemporary%20style%20showing%20visual%20unity%20across%20multiple%20formats%2C%20abstract%20representation%20of%20flawless%20brand%20execution&width=400&height=400&seq=benefit-aesthetic-perfect-004&orientation=squarish'
    }
  ];

  return (
    <section id="propuesta" className="py-20 md:py-32 bg-gray-50 dark:bg-[#1a1d1d] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-sm sm:text-base font-bold text-[#26A3AD] dark:text-[#4EFFEF] tracking-wider uppercase mb-4 block">
            {t('valueProposition.badge')}
          </span>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D3232] dark:text-white mb-6 md:mb-8 leading-tight px-4" style={{ fontFamily: '"Syne", sans-serif' }}>
            {t('valueProposition.title')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF]">
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
              className="group relative bg-white dark:bg-[#2D3232] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-[#26A3AD] dark:hover:border-[#4EFFEF] transition-all duration-500 hover:shadow-2xl cursor-pointer"
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
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4EFFEF]/20 to-[#26A3AD]/20 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-h-[400px] sm:max-h-[500px] md:max-h-[600px]">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20creative%20team%20collaborating%20in%20modern%20bright%20design%20studio%2C%20designers%20working%20on%20multiple%20brand%20identity%20projects%20with%20large%20monitors%20showing%20logo%20designs%20and%20color%20palettes%2C%20contemporary%20minimalist%20workspace%20with%20floor-to-ceiling%20windows%20and%20natural%20lighting%2C%20high-end%20creative%20agency%20interior%20with%20collaborative%20atmosphere%2C%20real%20people%20working%20on%20branding%20materials%2C%20clean%20organized%20environment%20with%20design%20samples%20on%20walls&width=900&height=1100&seq=value-prop-team-workspace-001&orientation=portrait"
                alt={t('valueProposition.badge')}
                title="BoxesMedia360"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="absolute -bottom-6 sm:-bottom-8 -right-4 sm:-right-8 bg-white dark:bg-[#2D3232] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 max-w-[200px] sm:max-w-xs">
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