
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const { t, i18n } = useTranslation('common');
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
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
              >
                <i className={`${isDark ? 'ri-sun-line' : 'ri-moon-line'} text-xl`}></i>
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
                >
                  <i className={`ri-global-line text-lg ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                    }`}></i>
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
                      <span className="text-xl">🇪🇸</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Español</span>
                      {currentLanguage === 'es' && (
                        <i className="ri-check-line text-teal-500 ml-auto"></i>
                      )}
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <span className="text-xl">🇺🇸</span>
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
