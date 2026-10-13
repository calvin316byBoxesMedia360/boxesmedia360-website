import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGoToSection } from '../../../hooks/useGoToSection';

export default function Footer() {
  const { t } = useTranslation('common');
  const goToSection = useGoToSection();
  const linkClass = 'text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer text-left';

  const serviceLinks = [
    { label: t('services.items.branding.title'), to: '/servicios/identidad-de-marca' },
    { label: t('services.items.graphic.title'), to: '/servicios/diseno-grafico' },
    { label: t('services.items.digital.title'), to: '/servicios/soluciones-digitales' },
    { label: t('services.items.audiovisual.title'), to: '/servicios/produccion-audiovisual' },
    { label: t('services.items.prepress.title'), to: '/servicios/pre-prensa' },
    { label: t('services.items.led.title'), to: '/servicios/pantallas-led' },
  ];

  const quickLinks = [
    { label: t('nav.proposition'), id: 'propuesta' },
    { label: t('nav.process'), id: 'proceso' },
    { label: t('nav.portfolio'), id: 'portafolio' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <footer className="bg-[#2D3232] dark:bg-navy-deep text-white py-12 md:py-16 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <img
                src="/images/logo-boxes.png"
                alt="BoxesMedia360"
                className="h-10 sm:h-12"
              />
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h5 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ fontFamily: '"Syne", sans-serif' }}>{t('footer.services')}</h5>
            <ul className="space-y-2 sm:space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ fontFamily: '"Syne", sans-serif' }}>{t('footer.quickLinks')}</h5>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => goToSection(link.id)} className={linkClass}>{link.label}</button>
                </li>
              ))}
              <li>
                <Link to="/portafolio" className={linkClass}>{t('portfolioPage.navLabel')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ fontFamily: '"Syne", sans-serif' }}>{t('footer.contact')}</h5>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-400">
                <i className="ri-mail-line text-[#4EFFEF] text-lg sm:text-xl mt-0.5"></i>
                <a href="mailto:boxesmedia360@gmail.com" className="hover:text-[#4EFFEF] transition-colors break-all">
                  boxesmedia360@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-400">
                <i className="ri-phone-line text-[#4EFFEF] text-lg sm:text-xl mt-0.5"></i>
                <a href="tel:+18316732181" className="hover:text-[#4EFFEF] transition-colors">
                  +1 (831) 673-2181
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-400">
                <i className="ri-map-pin-line text-[#4EFFEF] text-lg sm:text-xl mt-0.5"></i>
                <span>Hollister, CA 95023 USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} BoxesMedia360. {t('footer.rights')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link to="/privacidad" className="text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('footer.privacy')}</Link>
              <Link to="/terminos" className="text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('footer.terms')}</Link>
              <span className="text-gray-400">{t('footer.poweredBy')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}