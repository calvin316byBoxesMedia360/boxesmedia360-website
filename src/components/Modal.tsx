import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, icon, children }: ModalProps) {
    const { t } = useTranslation('common');

    // Close modal on ESC key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Modal Content */}
            <div
                className="relative bg-paper-soft dark:bg-[#2D3232] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp border border-gray-200 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-br from-[#26A3AD] to-[#4EFFEF] p-6 sm:p-8 rounded-t-3xl">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                <i className={`${icon} text-3xl sm:text-4xl text-white`}></i>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: '"Syne", sans-serif' }}>
                                {title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0"
                            aria-label={t('close')}
                        >
                            <i className="ri-close-line text-2xl text-white"></i>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8">
                    {children}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-paper dark:bg-[#1a1d1d] p-6 rounded-b-3xl border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-6 bg-gradient-to-r from-[#26A3AD] to-[#4EFFEF] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        {t('gotIt')}
                    </button>
                </div>
            </div>
        </div>
    );
}
