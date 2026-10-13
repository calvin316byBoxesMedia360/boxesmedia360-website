import ServicePageLayout from './ServicePageLayout';
import { useTranslation } from 'react-i18next';

export default function LEDScreensPage() {
    const { t } = useTranslation('common');

    const features = t('services.servicePages.led.features', { returnObjects: true }) as Array<{ title: string, description: string }>;
    const processSteps = t('services.servicePages.led.process', { returnObjects: true }) as Array<{ title: string, description: string }>;

    return (
        <ServicePageLayout
            serviceNumber="06"
            titleKey="services.items.led.title"
            descriptionKey="services.items.led.description"
            heroImage="/images/led-screens.jpg"
            detailImage="/images/led-screens-detail.png"
            features={features.map((f, i) => ({ ...f, icon: getIcon(i) }))}
            processSteps={processSteps}
        />
    );
}

function getIcon(index: number): string {
    const icons = [
        'ri-tv-line',
        'ri-image-2-line',
        'ri-store-2-line',
        'ri-building-line',
        'ri-refresh-line',
        'ri-aspect-ratio-line'
    ];
    return icons[index] || 'ri-check-line';
}
