import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Portfolio() {
  const { t } = useTranslation('common');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: t('portfolio.categories.all') },
    { key: 'branding', label: t('portfolio.categories.branding') },
    { key: 'digital', label: t('portfolio.categories.digital') },
    { key: 'audiovisual', label: t('portfolio.categories.audiovisual') },
    { key: 'spaces', label: t('portfolio.categories.spaces') }
  ];

  const projects = [
    {
      title: t('portfolio.items.project1.title'),
      category: 'branding',
      description: t('portfolio.items.project1.description'),
      image: 'https://readdy.ai/api/search-image?query=Professional%20completed%20brand%20identity%20project%20showing%20custom%20logo%20design%20applied%20across%20multiple%20branded%20materials%2C%20business%20cards%20with%20embossed%20logo%2C%20letterhead%20stationery%2C%20brand%20color%20palette%20swatches%2C%20custom%20icon%20set%20designs%20displayed%20on%20presentation%20boards%2C%20finished%20brand%20style%20guide%20book%2C%20cohesive%20visual%20identity%20system%20photographed%20on%20elegant%20desk%2C%20real%20delivered%20branding%20project%20with%20all%20identity%20elements%20visible%2C%20high%20quality%20photography%20of%20actual%20brand%20identity%20deliverables&width=900&height=700&seq=portfolio-brand-identity-complete-system-001&orientation=landscape',
      tags: ['Logo', 'Paleta Color', 'Iconografía']
    },
    {
      title: t('portfolio.items.project2.title'),
      category: 'digital',
      description: t('portfolio.items.project2.description'),
      image: 'https://readdy.ai/api/search-image?query=Real%20completed%20fashion%20e-commerce%20website%20displayed%20on%20MacBook%20Pro%20screen%20showing%20actual%20live%20website%20with%20product%20listings%20and%20shopping%20cart%2C%20professional%20photography%20of%20finished%20web%20design%20project%2C%20authentic%20user%20interface%20with%20real%20fashion%20products%20and%20working%20checkout%20system%2C%20modern%20workspace%20setting%20with%20natural%20lighting%2C%20high%20quality%20photograph%20of%20actual%20delivered%20digital%20project&width=900&height=700&seq=portfolio-real-002&orientation=landscape',
      tags: ['Web App', 'UX/UI', 'E-commerce']
    },
    {
      title: t('portfolio.items.project3.title'),
      category: 'audiovisual',
      description: t('portfolio.items.project3.description'),
      image: 'https://readdy.ai/api/search-image?query=Real%20finished%20restaurant%20promotional%20video%20displayed%20on%20tablet%20and%20smartphone%20screens%20showing%20actual%20completed%20commercial%20footage%20with%20professional%20food%20cinematography%2C%20authentic%20delivered%20audiovisual%20content%20with%20high%20production%20value%2C%20finished%20video%20campaign%20materials%20photographed%20in%20modern%20setting%2C%20professional%20photography%20of%20actual%20completed%20video%20production%20project%20with%20visible%20playback%20on%20devices&width=900&height=700&seq=portfolio-real-003&orientation=landscape',
      tags: ['Video LED', 'Fotografía', 'Redes']
    },
    {
      title: t('portfolio.items.project4.title'),
      category: 'spaces',
      description: t('portfolio.items.project4.description'),
      image: '/images/illuminated-signage.png',
      tags: ['Rótulos LED', 'Iluminación', 'Fachadas']
    },
    {
      title: t('portfolio.items.project5.title'),
      category: 'branding',
      description: t('portfolio.items.project5.description'),
      image: '/images/branding-pyme.jpg',
      tags: ['Logo', 'Wraps', 'Packaging']
    },
    {
      title: t('portfolio.items.project6.title'),
      category: 'spaces',
      description: t('portfolio.items.project6.description'),
      image: '/images/digital-content-led.jpg',
      tags: ['LED', 'Video', 'Retail']
    }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portafolio" className="py-20 md:py-32 bg-gray-50 dark:bg-[#1a1d1d] transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-sm font-bold text-[#26A3AD] dark:text-[#4EFFEF] tracking-wider uppercase mb-4 block">
            {t('portfolio.badge')}
          </span>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D3232] dark:text-white mb-4 md:mb-6 px-4" style={{ fontFamily: '"Syne", sans-serif' }}>
            {t('portfolio.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF]">{t('portfolio.titleHighlight')}</span>
          </h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-20 px-4">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-5 md:px-8 py-2.5 md:py-3.5 rounded-full text-sm md:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${activeCategory === category.key
                ? 'bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF] text-white shadow-lg shadow-[#26A3AD]/30 scale-105'
                : 'bg-white dark:bg-[#2D3232] text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-[#26A3AD] dark:hover:border-[#4EFFEF] hover:shadow-md'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filteredProjects.map((project, index) => (
            <article
              key={index}
              className="group relative bg-white dark:bg-[#2D3232] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  title={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                <div className="absolute top-4 md:top-6 right-4 md:right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 border border-white/30">
                  <i className="ri-arrow-right-up-line text-xl md:text-2xl text-white"></i>
                </div>
              </div>

              <div className="relative p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 md:px-4 py-1 md:py-1.5 bg-gradient-to-r from-[#26A3AD]/10 to-[#4EFFEF]/10 dark:from-[#26A3AD]/20 dark:to-[#4EFFEF]/20 rounded-full text-xs md:text-sm font-semibold text-[#26A3AD] dark:text-[#4EFFEF] border border-[#26A3AD]/20 dark:border-[#4EFFEF]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="text-xl md:text-2xl font-bold text-[#2D3232] dark:text-white mb-3 group-hover:text-[#26A3AD] dark:group-hover:text-[#4EFFEF] transition-colors duration-300" style={{ fontFamily: '"Syne", sans-serif' }}>
                  {project.title}
                </h4>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}