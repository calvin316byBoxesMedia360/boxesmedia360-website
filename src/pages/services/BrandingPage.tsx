import ServicePageLayout from './ServicePageLayout';
import { useTranslation } from 'react-i18next';

export default function BrandingPage() {
    const { t } = useTranslation('common');

    const features = t('services.servicePages.branding.features', { returnObjects: true }) as Array<{ title: string, description: string }>;
    const processSteps = t('services.servicePages.branding.process', { returnObjects: true }) as Array<{ title: string, description: string }>;

    return (
        <ServicePageLayout
            serviceNumber="01"
            titleKey="services.items.branding.title"
            descriptionKey="services.items.branding.description"
            heroImage="/images/stock/service-branding.webp"
            detailImage="/images/branding-detail.png"
            features={features.map((f) => ({ ...f, icon: 'ri-check-line' }))}
            processSteps={processSteps}
        />
    );
}
