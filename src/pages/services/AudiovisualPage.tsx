import ServicePageLayout from './ServicePageLayout';
import { useTranslation } from 'react-i18next';

export default function AudiovisualPage() {
    const { t } = useTranslation('common');

    const features = t('services.servicePages.audiovisual.features', { returnObjects: true }) as Array<{ title: string, description: string }>;
    const processSteps = t('services.servicePages.audiovisual.process', { returnObjects: true }) as Array<{ title: string, description: string }>;

    return (
        <ServicePageLayout
            serviceNumber="04"
            titleKey="services.items.audiovisual.title"
            descriptionKey="services.items.audiovisual.description"
            heroImage="/images/audiovisual-production.jpg"
            detailImage="/images/audiovisual-detail.png"
            features={features.map((f, i) => ({ ...f, icon: getIcon(i) }))}
            processSteps={processSteps}
        />
    );
}

function getIcon(index: number): string {
    const icons = [
        'ri-tv-2-line',
        'ri-image-edit-line',
        'ri-movie-2-line',
        'ri-camera-3-line',
        'ri-scissors-cut-line',
        'ri-play-circle-line'
    ];
    return icons[index] || 'ri-check-line';
}
