import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Hero() {
  const { t } = useTranslation('common');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navigation height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const statsData = [
    {
      id: 'faster',
      icon: 'ri-time-line',
      value: '75%',
      label: t('hero.stats.faster'),
      title: 'Velocidad de Entrega',
      description: 'Nuestro proceso optimizado y equipo especializado nos permite entregar proyectos 75% más rápido que el promedio de la industria, sin comprometer la calidad.',
      details: [
        'Metodología ágil probada',
        'Equipo multidisciplinario coordinado',
        'Herramientas de automatización',
        'Comunicación directa y eficiente'
      ]
    },
    {
      id: 'brands',
      icon: 'ri-team-line',
      value: '100+',
      label: t('hero.stats.brands'),
      title: 'Marcas Confiadas',
      description: 'Más de 100 marcas han confiado en nosotros para transformar su presencia digital y alcanzar sus objetivos de negocio.',
      details: [
        'Startups innovadoras',
        'Empresas consolidadas',
        'Emprendedores visionarios',
        'Organizaciones internacionales'
      ]
    },
    {
      id: 'satisfaction',
      icon: 'ri-star-fill',
      value: '5.0',
      label: t('hero.stats.satisfaction'),
      title: 'Satisfacción Garantizada',
      description: 'Mantenemos una calificación perfecta de 5.0 estrellas gracias a nuestro compromiso con la excelencia y atención personalizada.',
      details: [
        'Soporte continuo post-lanzamiento',
        'Revisiones ilimitadas',
        'Garantía de satisfacción',
        'Comunicación transparente'
      ]
    }
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#1a1a1a] transition-colors duration-300"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20creative%20studio%20workspace%20with%20design%20equipment%2C%20computers%2C%20and%20professional%20lighting%20setup%2C%20minimalist%20aesthetic%20with%20turquoise%20and%20teal%20accent%20colors%2C%20bright%20and%20airy%20atmosphere%2C%20clean%20organized%20desk%20with%20creative%20tools%2C%20professional%20photography%20studio%20environment%2C%20high-end%20production%20space&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40 dark:from-[#1a1a1a]/90 dark:via-[#1a1a1a]/80 dark:to-transparent"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 sm:mb-8">
            <span className="text-sm sm:text-base font-medium text-[#4EFFEF] tracking-wide" style={{ fontFamily: '"Syne", sans-serif' }}>
              AI Creative Design Studio
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight" style={{ fontFamily: '"Syne", sans-serif' }}>
            <span className="text-white dark:text-white drop-shadow-lg">{t('hero.title')} </span>
            <span className="text-[#4EFFEF] dark:text-[#4EFFEF] drop-shadow-lg">{t('hero.titleHighlight')}</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-100 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-2xl drop-shadow-md">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button onClick={() => scrollToSection('contact')} className="group relative bg-gradient-to-r from-[#4EFFEF] to-[#26A3AD] text-[#2D3232] dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:scale-105 transition-all cursor-pointer whitespace-nowrap text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,255,239,0.3)] hover:shadow-[0_0_30px_rgba(78,255,239,0.6)]">
              {t('hero.ctaPrimary')}
              <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button onClick={() => scrollToSection('portafolio')} className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm text-[#2D3232] dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:scale-105 hover:shadow-xl transition-all cursor-pointer whitespace-nowrap text-center border-2 border-[#26A3AD] dark:border-[#4EFFEF]">
              {t('hero.ctaSecondary')}
            </button>
          </div>

          <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-6 sm:gap-8">
            {statsData.map((stat) => (
              <button
                key={stat.id}
                onClick={() => setActiveModal(stat.id)}
                className="group flex items-center gap-3 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#4EFFEF] to-[#26A3AD] flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:shadow-[#4EFFEF]/50 transition-all">
                  <i className={`${stat.icon} text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform`}></i>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white dark:text-white drop-shadow-md group-hover:text-[#4EFFEF] transition-colors" style={{ fontFamily: '"Syne", sans-serif' }}>{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-200 dark:text-gray-400 drop-shadow-sm group-hover:text-white transition-colors">{stat.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button onClick={() => scrollToSection('servicios')} className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <i className="ri-arrow-down-line text-xl"></i>
        </button>
      </div>

      {/* Modal de estadísticas */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white dark:bg-[#2D3232] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl transform animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {statsData.map((stat) => {
              if (stat.id !== activeModal) return null;

              return (
                <div key={stat.id}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4EFFEF] to-[#26A3AD] flex items-center justify-center shadow-lg">
                        <i className={`${stat.icon} text-white text-3xl`}></i>
                      </div>
                      <div>
                        <p className="text-4xl font-bold text-[#2D3232] dark:text-white mb-1" style={{ fontFamily: '"Syne", sans-serif' }}>{stat.value}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <i className="ri-close-line text-xl text-gray-600 dark:text-gray-300"></i>
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-[#2D3232] dark:text-white mb-4" style={{ fontFamily: '"Syne", sans-serif' }}>
                    {stat.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {stat.description}
                  </p>

                  <div className="space-y-3">
                    {stat.details.map((detail, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4EFFEF]/20 to-[#26A3AD]/20 flex items-center justify-center group-hover:from-[#4EFFEF]/30 group-hover:to-[#26A3AD]/30 transition-all">
                          <i className="ri-check-line text-[#26A3AD] dark:text-[#4EFFEF] text-lg"></i>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setActiveModal(null);
                        scrollToSection('contact');
                      }}
                      className="w-full bg-gradient-to-r from-[#4EFFEF] to-[#26A3AD] text-white px-6 py-3 rounded-full font-bold hover:scale-105 hover:shadow-xl transition-all cursor-pointer whitespace-nowrap text-center flex items-center justify-center gap-2"
                    >
                      Comienza tu proyecto
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
