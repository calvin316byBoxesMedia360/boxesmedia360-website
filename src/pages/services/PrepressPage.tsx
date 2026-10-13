import ServicePageLayout from './ServicePageLayout';
import { useTranslation } from 'react-i18next';

export default function PrepressPage() {
    const { t } = useTranslation('common');

    const features = t('services.servicePages.prepress.features', { returnObjects: true }) as Array<{ title: string, description: string }>;
    const processSteps = t('services.servicePages.prepress.process', { returnObjects: true }) as Array<{ title: string, description: string }>;

    return (
        <ServicePageLayout
            serviceNumber="05"
            titleKey="services.items.prepress.title"
            descriptionKey="services.items.prepress.description"
            heroImage="/images/stock/service-prepress.webp"
            detailImage="/images/prepress-detail.png"
            features={features.map((f, i) => ({ ...f, icon: getIcon(i) }))}
            processSteps={processSteps}
        />
    );
}

function getIcon(index: number): string {
    const icons = [
        'ri-printer-line',
        'ri-file-pdf-line',
        'ri-artboard-line',
        'ri-pantone-line',
        'ri-check-double-line',
        'ri-file-settings-line'
    ];
    return icons[index] || 'ri-check-line';
}
