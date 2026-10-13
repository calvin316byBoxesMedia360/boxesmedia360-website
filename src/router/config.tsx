import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import BrandingPage from "../pages/services/BrandingPage";
import GraphicDesignPage from "../pages/services/GraphicDesignPage";
import DigitalSolutionsPage from "../pages/services/DigitalSolutionsPage";
import AudiovisualPage from "../pages/services/AudiovisualPage";
import PrepressPage from "../pages/services/PrepressPage";
import LEDScreensPage from "../pages/services/LEDScreensPage";
import LegalPage from "../pages/legal/LegalPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/servicios/identidad-de-marca",
    element: <BrandingPage />,
  },
  {
    path: "/servicios/diseno-grafico",
    element: <GraphicDesignPage />,
  },
  {
    path: "/servicios/soluciones-digitales",
    element: <DigitalSolutionsPage />,
  },
  {
    path: "/servicios/produccion-audiovisual",
    element: <AudiovisualPage />,
  },
  {
    path: "/servicios/pre-prensa",
    element: <PrepressPage />,
  },
  {
    path: "/servicios/pantallas-led",
    element: <LEDScreensPage />,
  },
  {
    path: "/privacidad",
    element: <LegalPage doc="privacy" />,
  },
  {
    path: "/terminos",
    element: <LegalPage doc="terms" />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;

