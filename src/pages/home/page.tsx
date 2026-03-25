
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import ValueProposition from './components/ValueProposition';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Scheduling from './components/Scheduling';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Hero />
      <Services />
      <ValueProposition />
      <Process />
      <Portfolio />
      <Scheduling />
      <Footer />
    </div>
  );
}
