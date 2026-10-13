import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_OFFSET = 80; // altura de la barra de navegación

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}

/**
 * Lleva a una sección de la página de inicio desde cualquier página.
 * Si ya estamos en inicio hace scroll; si no, navega a inicio y luego hace scroll.
 */
export function useGoToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string) => {
      if (location.pathname === '/') {
        scrollToId(id);
        return;
      }
      navigate('/');
      // Esperar a que la página de inicio se monte
      let tries = 0;
      const tick = () => {
        if (scrollToId(id) || tries++ > 20) return;
        setTimeout(tick, 50);
      };
      setTimeout(tick, 50);
    },
    [location.pathname, navigate]
  );
}
