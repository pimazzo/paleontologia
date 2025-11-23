import React from 'react';
import Header from './components/Header';
import ValueCards from './components/ValueCards';
import ThreatsList from './components/ThreatsList';
import Quiz from './components/Quiz';
import FossilChart from './components/FossilChart';
import AIChat from './components/AIChat';
import CuratorSimulator from './components/CuratorSimulator';
import CitySimulator from './components/CitySimulator';
import ScaleComparator from './components/ScaleComparator';
import VolcanoTimeline from './components/VolcanoTimeline';
import { BookOpen, HeartHandshake } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans text-shale-800">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-5xl flex-grow">
        
        <section id="explorar" className="mb-12 scroll-mt-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-shale-800 inline-block border-b-4 border-ochre-600 pb-2">
              Por que este local é um tesouro?
            </h2>
          </div>
          <ValueCards />
        </section>

        <FossilChart />
        <ScaleComparator />
        <VolcanoTimeline />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ThreatsList />
          <Quiz />
        </div>

        <CuratorSimulator />
        <CitySimulator />

        <section className="bg-gradient-to-r from-clay-600 to-clay-500 rounded-xl p-8 text-white shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <HeartHandshake size={48} className="text-white/80" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Como Ajudar?</h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg font-light">
            A melhor forma de proteção é o conhecimento. Visite museus locais (como o MHNT), apoie geoparques e denuncie coletas ilegais. 
            Transforme-se em um guardião da nossa pré-história.
          </p>
          <a 
            href="https://tremembe.sp.gov.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-white text-clay-600 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-md"
          >
            <BookOpen size={20} />
            Saiba mais sobre Geoturismo
          </a>
        </section>
      </main>

      <footer className="bg-shale-900 text-slate-400 py-12 text-center border-t border-shale-800">
        <div className="container mx-auto px-4">
          <p className="text-sm font-light tracking-wide">
            © {new Date().getFullYear()} Guardiões do Oligoceno. Desenvolvido para fins educativos.
          </p>
          <p className="text-xs mt-3 opacity-60 font-serif italic">Inspirado na riqueza da Formação Tremembé.</p>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;