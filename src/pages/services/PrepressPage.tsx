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
            heroImage="https://readdy.ai/api/search-image?query=Professional%20pre-press%20production%20workspace%20with%20color%20calibration%20tools%2C%20print%20samples%2C%20technical%20specifications%2C%20modern%20printing%20studio%2C%20clean%20organized%20environment%2C%20professional%20printing%20materials%2C%20contemporary%20production%20facility%20with%20quality%20control%20setup&width=800&height=600&seq=service-005&orientation=landscape"
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
