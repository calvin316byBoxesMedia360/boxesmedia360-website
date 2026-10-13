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
            heroImage="https://readdy.ai/api/search-image?query=Professional%20brand%20identity%20design%20process%20with%20logo%20sketches%2C%20color%20palettes%2C%20typography%20samples%2C%20and%20brand%20guidelines%20on%20a%20modern%20designer%20desk%2C%20creative%20workspace%20with%20turquoise%20accents%2C%20minimalist%20aesthetic%2C%20high-quality%20professional%20photography&width=600&height=400&seq=service-001&orientation=landscape"
            detailImage="/images/branding-detail.png"
            features={features.map((f) => ({ ...f, icon: 'ri-check-line' }))}
            processSteps={processSteps}
        />
    );
}
