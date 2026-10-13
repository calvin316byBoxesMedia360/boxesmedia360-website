
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const { t, i18n } = useTranslation('common');
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsLanguageOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Altura de la navegación
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentLanguage = i18n.language;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1>
                <a href="/" className="block">
                  <img
                    src="/images/logo-boxes.png"
                    alt="BoxesMedia360"
                    className={`h-12 transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'
                      }`}
                  />
                </a>
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('servicios')}
                className={`font-medium transition-all hover:text-teal-500 cursor-pointer relative group ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                  }`}
              >
                {t('nav.services')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('proceso')}
                className={`font-medium transition-all hover:text-teal-500 cursor-pointer relative group ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                  }`}
              >
                {t('nav.process')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('portafolio')}
                className={`font-medium transition-all hover:text-teal-500 cursor-pointer relative group ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                  }`}
              >
                {t('nav.portfolio')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all hover:scale-110 cursor-pointer ${isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                aria-label="Toggle dark mode"
                title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full transition-all hover:scale-110 cursor-pointer ${isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                aria-label="Toggle menu"
                title="Menú de navegación"
              >
                <i className={`text-xl transition-transform ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
              </button>

              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all cursor-pointer ${isScrolled
                    ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : 'bg-white/20 hover:bg-white/30'
                    }`}
                  aria-label="Select language"
                  title="Cambiar idioma"
                >
                  {/* Flag SVG */}
                  {currentLanguage === 'es' ? (
                    <svg className="w-5 h-4" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                      <rect fill="#c60b1e" width="900" height="600" />
                      <rect fill="#ffc400" y="150" width="900" height="300" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-4" viewBox="0 0 7410 3900" xmlns="http://www.w3.org/2000/svg">
                      <rect fill="#b22234" width="7410" height="3900" />
                      <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" strokeWidth="300" />
                      <rect fill="#3c3b6e" width="2964" height="2100" />
                      <g fill="#fff">
                        <g id="s18">
                          <g id="s9">
                            <g id="s5">
                              <g id="s4">
                                <path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z" />
                                <use xlinkHref="#s" y="420" />
                                <use xlinkHref="#s" y="840" />
                                <use xlinkHref="#s" y="1260" />
                              </g>
                              <use xlinkHref="#s" y="1680" />
                            </g>
                            <use xlinkHref="#s4" x="247" y="210" />
                          </g>
                          <use xlinkHref="#s9" x="494" />
                        </g>
                        <use xlinkHref="#s18" x="988" />
                        <use xlinkHref="#s9" x="1976" />
                        <use xlinkHref="#s5" x="2470" />
                      </g>
                    </svg>
                  )}
                  <span className={`text-sm font-semibold uppercase ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                    }`}>
                    {currentLanguage}
                  </span>
                  <i className={`ri-arrow-down-s-line text-sm transition-transform ${isLanguageOpen ? 'rotate-180' : ''
                    } ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}></i>
                </button>

                {/* Language Dropdown */}
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button
                      onClick={() => changeLanguage('es')}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-4 flex-shrink-0" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="#c60b1e" width="900" height="600" />
                        <rect fill="#ffc400" y="150" width="900" height="300" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Español</span>
                      {currentLanguage === 'es' && (
                        <i className="ri-check-line text-teal-500 ml-auto"></i>
                      )}
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-4 flex-shrink-0" viewBox="0 0 7410 3900" xmlns="http://www.w3.org/2000/svg">
                        <rect fill="#b22234" width="7410" height="3900" />
                        <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" strokeWidth="300" />
                        <rect fill="#3c3b6e" width="2964" height="2100" />
                        <g fill="#fff">
                          <g id="s18-dropdown">
                            <g id="s9-dropdown">
                              <g id="s5-dropdown">
                                <g id="s4-dropdown">
                                  <path id="s-dropdown" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z" />
                                  <use xlinkHref="#s-dropdown" y="420" />
                                  <use xlinkHref="#s-dropdown" y="840" />
                                  <use xlinkHref="#s-dropdown" y="1260" />
                                </g>
                                <use xlinkHref="#s-dropdown" y="1680" />
                              </g>
                              <use xlinkHref="#s4-dropdown" x="247" y="210" />
                            </g>
                            <use xlinkHref="#s9-dropdown" x="494" />
                          </g>
                          <use xlinkHref="#s18-dropdown" x="988" />
                          <use xlinkHref="#s9-dropdown" x="1976" />
                          <use xlinkHref="#s5-dropdown" x="2470" />
                        </g>
                      </svg>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">English</span>
                      {currentLanguage === 'en' && (
                        <i className="ri-check-line text-teal-500 ml-auto"></i>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer"
              >
                <i className="ri-mail-line text-lg"></i>
                <span>{t('nav.contact')}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-white dark:bg-gray-900 shadow-2xl z-40 max-h-[calc(100vh-72px)] overflow-y-auto animate-slideDown">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="space-y-4">
              {/* Services Section */}
              <div>
                <button
                  onClick={() => {
                    scrollToSection('servicios');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left font-semibold text-lg text-gray-900 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer flex items-center justify-between py-2"
                >
                  <span>{t('nav.services')}</span>
                  <i className="ri-arrow-right-s-line"></i>
                </button>
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-teal-500/30">
                  <button
                    onClick={() => {
                      scrollToSection('servicios');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer py-1"
                  >
                    {t('services.items.branding.title')}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('servicios');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer py-1"
                  >
                    {t('services.items.graphic.title')}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('servicios');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer py-1"
                  >
                    {t('services.items.digital.title')}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('servicios');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer py-1"
                  >
                    {t('services.items.audiovisual.title')}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('servicios');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer py-1"
                  >
                    {t('services.items.prepress.title')}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('servicios');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer py-1"
                  >
                    {t('services.items.led.title')}
                  </button>
                </div>
              </div>

              {/* Process Section */}
              <button
                onClick={() => {
                  scrollToSection('proceso');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left font-semibold text-lg text-gray-900 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer flex items-center justify-between py-2"
              >
                <span>{t('nav.process')}</span>
                <i className="ri-arrow-right-s-line"></i>
              </button>

              {/* Portfolio Section */}
              <button
                onClick={() => {
                  scrollToSection('portafolio');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left font-semibold text-lg text-gray-900 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer flex items-center justify-between py-2"
              >
                <span>{t('nav.portfolio')}</span>
                <i className="ri-arrow-right-s-line"></i>
              </button>

              {/* Contact Section */}
              <button
                onClick={() => {
                  scrollToSection('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left font-semibold text-lg text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors cursor-pointer flex items-center justify-between py-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-2"
              >
                <span className="flex items-center gap-2">
                  <i className="ri-mail-line"></i>
                  {t('nav.contact')}
                </span>
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('nav.contact')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('hero.subtitle')}
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder={t('nav.contact')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <textarea
                placeholder={t('hero.subtitle')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {t('nav.contact')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
