import ServicePageLayout from './ServicePageLayout';
import { useTranslation } from 'react-i18next';

export default function DigitalSolutionsPage() {
    const { t } = useTranslation('common');

    const features = t('services.servicePages.digital.features', { returnObjects: true }) as Array<{ title: string, description: string }>;
    const processSteps = t('services.servicePages.digital.process', { returnObjects: true }) as Array<{ title: string, description: string }>;

    return (
        <ServicePageLayout
            serviceNumber="03"
            titleKey="services.items.digital.title"
            descriptionKey="services.items.digital.description"
            heroImage="/images/digital-solutions.jpg"
            detailImage="/images/digital-solutions-detail.png"
            features={features.map((f, i) => ({ ...f, icon: getIcon(i) }))}
            processSteps={processSteps}
        />
    );
}

function getIcon(index: number): string {
    const icons = [
        'ri-code-s-slash-line',
        'ri-smartphone-line',
        'ri-restaurant-2-line',
        'ri-database-2-line',
        'ri-layout-grid-line',
        'ri-dashboard-line'
    ];
    return icons[index] || 'ri-check-line';
}
