import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-[#2D3232] dark:bg-black text-white py-12 md:py-16 transition-colors duration-300">
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
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-[#4EFFEF] hover:to-[#26A3AD] flex items-center justify-center transition-all cursor-pointer">
                <i className="ri-instagram-line text-base sm:text-lg"></i>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-[#4EFFEF] hover:to-[#26A3AD] flex items-center justify-center transition-all cursor-pointer">
                <i className="ri-facebook-fill text-base sm:text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ fontFamily: '"Syne", sans-serif' }}>{t('footer.services')}</h5>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#servicios" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('services.items.branding.title')}</a></li>
              <li><a href="#servicios" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('services.items.graphic.title')}</a></li>
              <li><a href="#servicios" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('services.items.digital.title')}</a></li>
              <li><a href="#servicios" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('services.items.audiovisual.title')}</a></li>
              <li><a href="#servicios" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('services.items.led.title')}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-base sm:text-lg font-bold mb-4 sm:mb-6" style={{ fontFamily: '"Syne", sans-serif' }}>{t('footer.quickLinks')}</h5>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#propuesta" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('nav.proposition')}</a></li>
              <li><a href="#proceso" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('nav.process')}</a></li>
              <li><a href="#portafolio" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('nav.portfolio')}</a></li>
              <li><a href="#contacto" className="text-sm sm:text-base text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('nav.contact')}</a></li>
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
              © 2024 BoxesMedia360. {t('footer.rights')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">Términos</a>
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="nofollow" className="text-gray-400 hover:text-[#4EFFEF] transition-colors cursor-pointer">{t('footer.poweredBy')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}