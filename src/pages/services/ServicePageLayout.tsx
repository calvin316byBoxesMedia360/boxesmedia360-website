import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Footer from '../home/components/Footer';

interface ServicePageLayoutProps {
    serviceNumber: string;
    titleKey: string;
    descriptionKey: string;
    heroImage: string;
    features: {
        icon: string;
        title: string;
        description: string;
    }[];
    processSteps: {
        title: string;
        description: string;
    }[];
    detailImage: string;
    children?: ReactNode;
}

// Formas del fondo animado (posiciones fijas para que no cambien entre renders)
type FloatingShape = { type: 'circle' | 'square' | 'ring' | 'triangle' | 'cross'; x: number; y: number; size: number; dur: number; delay: number; dx: number; dy: number; rot: number; dark: boolean };
const SHAPE_TYPES: FloatingShape['type'][] = ['circle', 'square', 'ring', 'triangle', 'cross'];
const FLOATING_SHAPES: FloatingShape[] = Array.from({ length: 34 }, (_, i) => {
    const r = (n: number) => {
        const v = Math.sin((i + 1) * 9301 + n * 49297) * 233280;
        return v - Math.floor(v);
    };
    return {
        type: SHAPE_TYPES[i % SHAPE_TYPES.length],
        x: Math.round(r(1) * 96),
        y: Math.round(r(2) * 92),
        size: 8 + Math.round(r(3) * 16),
        dur: 5 + Math.round(r(4) * 40) / 10,
        delay: -Math.round(r(5) * 90) / 10,
        dx: Math.round((r(6) - 0.5) * 120),
        dy: -40 - Math.round(r(7) * 80),
        rot: Math.round((r(8) - 0.5) * 360),
        dark: i % 4 === 0,
    };
});

export default function ServicePageLayout({
    serviceNumber,
    titleKey,
    descriptionKey,
    heroImage,
    features,
    processSteps,
    detailImage,
    children
}: ServicePageLayoutProps) {
    const { t } = useTranslation('common');
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-paper dark:bg-navy">
            {/* Hero Section with Tech-Feel */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#26A3AD] to-[#4EFFEF] overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        animation: 'gridPulse 4s ease-in-out infinite'
                    }}></div>
                </div>

                {/* Formas geométricas flotantes: aparecen, se desplazan y se desvanecen */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    {FLOATING_SHAPES.map((sh, i) => (
                        <span
                            key={i}
                            className={`floating-shape floating-shape--${sh.type}`}
                            style={{
                                left: `${sh.x}%`,
                                top: `${sh.y}%`,
                                width: sh.size,
                                height: sh.size,
                                animationDuration: `${sh.dur}s`,
                                animationDelay: `${sh.delay}s`,
                                ['--dx' as string]: `${sh.dx}px`,
                                ['--dy' as string]: `${sh.dy}px`,
                                ['--rot' as string]: `${sh.rot}deg`,
                                ['--shape-color' as string]: sh.dark ? 'rgba(14, 52, 66, 0.35)' : 'rgba(255, 255, 255, 0.75)',
                            }}
                        />
                    ))}
                </div>

                {/* Glowing Orbs */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slower"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-2 text-[#0E3442]/85 hover:text-[#0E3442] mb-8 transition-all cursor-pointer hover:gap-3"
                    >
                        <i className="ri-arrow-left-line text-xl group-hover:animate-bounce-horizontal"></i>
                        <span className="font-medium">{t('services.servicePages.common.backToHome')}</span>
                    </button>

                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        {/* Main Content */}
                        <div className="lg:col-span-7">
                            <span className="inline-block px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-[#0E3442] font-semibold mb-6 border border-white/60 shadow-lg animate-fade-in-up">
                                {serviceNumber}
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0E3442] mb-6 animate-fade-in-up animation-delay-100" style={{ fontFamily: '"Syne", sans-serif' }}>
                                {t(titleKey)}
                            </h1>
                            <p className="text-xl md:text-2xl text-[#164B5A] leading-relaxed font-medium animate-fade-in-up animation-delay-200">
                                {t(descriptionKey)}
                            </p>
                        </div>

                        {/* Floating Stats Grid */}
                        <div className="lg:col-span-5 hidden lg:block">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Stat Card 1 */}
                                <div className="group relative bg-white/35 backdrop-blur-md rounded-2xl p-6 border border-white/60 hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <i className="ri-flashlight-line text-3xl text-[#1A7F88] mb-2 block"></i>
                                        <div className="text-2xl font-bold text-[#0E3442]">+50</div>
                                        <div className="text-sm text-[#164B5A]">{t('services.servicePages.common.projects')}</div>
                                    </div>
                                </div>

                                {/* Stat Card 2 */}
                                <div className="group relative bg-white/35 backdrop-blur-md rounded-2xl p-6 border border-white/60 hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-400">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <i className="ri-time-line text-3xl text-[#1A7F88] mb-2 block"></i>
                                        <div className="text-2xl font-bold text-[#0E3442]">24/7</div>
                                        <div className="text-sm text-[#164B5A]">{t('services.servicePages.common.support')}</div>
                                    </div>
                                </div>

                                {/* Stat Card 3 */}
                                <div className="group relative bg-white/35 backdrop-blur-md rounded-2xl p-6 border border-white/60 hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-500">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <i className="ri-star-line text-3xl text-[#1A7F88] mb-2 block"></i>
                                        <div className="text-2xl font-bold text-[#0E3442]">100%</div>
                                        <div className="text-sm text-[#164B5A]">{t('services.servicePages.common.quality')}</div>
                                    </div>
                                </div>

                                {/* Stat Card 4 */}
                                <div className="group relative bg-white/35 backdrop-blur-md rounded-2xl p-6 border border-white/60 hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up animation-delay-600">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <i className="ri-shield-check-line text-3xl text-[#1A7F88] mb-2 block"></i>
                                        <div className="text-2xl font-bold text-[#0E3442]">✓</div>
                                        <div className="text-sm text-[#164B5A]">{t('services.servicePages.common.warranty')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Tech Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </section>

            {/* Content Section */}
            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Syne", sans-serif' }}>
                                {t('services.servicePages.common.whatIncluded')}
                            </h2>
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#26A3AD] to-[#4EFFEF] flex items-center justify-center flex-shrink-0 mt-1">
                                            <i className={`${feature.icon} text-white`}></i>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4EFFEF]/20 to-[#26A3AD]/20 rounded-3xl blur-3xl"></div>
                            <img
                                src={detailImage}
                                alt={t(titleKey)}
                                className="relative rounded-3xl shadow-2xl w-full"
                            />
                        </div>
                    </div>

                    {/* Process Section */}
                    <div className="bg-paper dark:bg-navy-soft rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center" style={{ fontFamily: '"Syne", sans-serif' }}>
                            {t('services.servicePages.common.ourProcess')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {processSteps.map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#26A3AD] to-[#4EFFEF] flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">{index + 1}</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {children}

                    {/* CTA Section */}
                    <div className="mt-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: '"Syne", sans-serif' }}>
                            {t('services.servicePages.common.readyToStart')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                            {t('services.servicePages.common.contactUs')}
                        </p>
                        <button
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF] text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                        >
                            <i className="ri-mail-line text-xl"></i>
                            <span>{t('services.servicePages.common.contactNow')}</span>
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
