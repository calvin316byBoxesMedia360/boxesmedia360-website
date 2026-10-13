import ServicePageLayout from './ServicePageLayout';
import { useTranslation } from 'react-i18next';

export default function GraphicDesignPage() {
    const { t } = useTranslation('common');

    const features = t('services.servicePages.graphic.features', { returnObjects: true }) as Array<{ title: string, description: string }>;
    const processSteps = t('services.servicePages.graphic.process', { returnObjects: true }) as Array<{ title: string, description: string }>;

    return (
        <ServicePageLayout
            serviceNumber="02"
            titleKey="services.items.graphic.title"
            descriptionKey="services.items.graphic.description"
            heroImage="/images/graphic-design.jpg"
            detailImage="/images/graphic-design-detail.png"
            features={features.map((f, i) => ({ ...f, icon: getIcon(i) }))}
            processSteps={processSteps}
        />
    );
}

function getIcon(index: number): string {
    const icons = [
        'ri-truck-line',
        'ri-file-list-3-line',
        'ri-book-open-line',
        'ri-box-3-line',
        'ri-user-smile-line',
        'ri-megaphone-line'
    ];
    return icons[index] || 'ri-check-line';
}
