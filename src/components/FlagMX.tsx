// Bandera de México (verde, blanco y rojo con escudo simplificado) para el selector de idioma.
export default function FlagMX({ className = 'w-5 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 7 4" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="México">
      <rect width="7" height="4" fill="#ffffff" />
      <rect width="2.333" height="4" fill="#006847" />
      <rect x="4.667" width="2.333" height="4" fill="#ce1126" />
      <circle cx="3.5" cy="2" r="0.62" fill="#a9824a" />
      <circle cx="3.5" cy="2.05" r="0.34" fill="#7a5a2b" />
      <path d="M2.95 2.55 Q3.5 3 4.05 2.55" stroke="#006847" strokeWidth="0.12" fill="none" strokeLinecap="round" />
    </svg>
  );
}
