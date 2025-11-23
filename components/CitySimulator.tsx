import React, { useState } from 'react';
import { Building2, Pickaxe, RotateCcw, Landmark } from 'lucide-react';

type BuildMode = 'idle' | 'reckless' | 'conscious';
type FossilState = 'buried' | 'rescued' | 'destroyed';

const CitySimulator: React.FC = () => {
  const [mode, setMode] = useState<BuildMode>('idle');
  const [fossilState, setFossilState] = useState<FossilState>('buried');
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackColor, setFeedbackColor] = useState<string>('');

  const buildReckless = () => {
    if (mode !== 'idle') return;
    setMode('reckless');
    
    // Animation timing logic:
    // 1. Piles descend immediately (handled by CSS based on mode)
    // 2. Building appears (handled by CSS)
    // 3. Fossils get destroyed after piles hit (approx 800ms)
    
    setTimeout(() => {
      setFossilState('destroyed');
      setFeedback("⚠️ DESASTRE! A obra foi rápida, mas as fundações perfuraram os fósseis. Perdemos o patrimônio para sempre.");
      setFeedbackColor("text-red-600");
    }, 800);
  };

  const buildConscious = () => {
    if (mode !== 'idle') return;
    setMode('conscious');
    setFeedback("🕵️‍♂️ Escavando... Equipe de paleontologia salvando o material...");
    setFeedbackColor("text-orange-600");

    // 1. Fossils disappear from ground (rescue)
    // 2. Fossils appear in museum
    setTimeout(() => {
      setFossilState('rescued');
    }, 1000);

    // 3. Building starts after rescue
    setTimeout(() => {
      setFeedback("✅ SUCESSO! O prédio foi construído e os fósseis estão seguros no museu. Isso é desenvolvimento sustentável.");
      setFeedbackColor("text-green-600");
    }, 2000);
  };

  const resetCity = () => {
    setMode('idle');
    setFossilState('buried');
    setFeedback('');
    setFeedbackColor('');
  };

  // Helper to determine if building/piles should be visible
  // In reckless mode: immediate.
  // In conscious mode: only after rescue (fossilState === 'rescued').
  const isBuildingVisible = mode === 'reckless' || (mode === 'conscious' && fossilState === 'rescued');

  return (
    <section className="bg-white p-8 rounded-xl shadow-md mb-12 scroll-mt-20 border-t-4 border-slate-600" id="cidade-simulator">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-shale-800 mb-3 flex items-center gap-2">
          <Building2 className="text-slate-600" />
          O Dilema da Cidade: Construir ou Preservar?
        </h2>
        <p className="text-slate-600">
          A cidade está crescendo sobre a Bacia de Tremembé. Você é o engenheiro responsável por uma nova obra. O que acontece no subsolo depende da sua escolha.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        
        {/* Ground View */}
        <div className="relative h-[300px] w-full border-2 border-shale-800 rounded-lg overflow-hidden flex flex-col mb-6 bg-slate-200">
            
            {/* Piles (Foundations) */}
            {/* Using absolute positioning and height transition */}
            <div 
                className={`absolute top-0 w-5 bg-stone-600 border-x-2 border-stone-800 z-30 transition-all duration-1000 ease-in left-[22%] ${isBuildingVisible ? 'h-full' : 'h-0'}`}
            ></div>
            <div 
                className={`absolute top-0 w-5 bg-stone-600 border-x-2 border-stone-800 z-30 transition-all duration-1000 ease-in left-1/2 -ml-2.5 ${isBuildingVisible ? 'h-full' : 'h-0'}`}
            ></div>
            <div 
                className={`absolute top-0 w-5 bg-stone-600 border-x-2 border-stone-800 z-30 transition-all duration-1000 ease-in right-[22%] ${isBuildingVisible ? 'h-full' : 'h-0'}`}
            ></div>

            {/* Sky */}
            <div className="flex-1 bg-sky-300 relative flex items-end justify-center z-10 overflow-hidden">
                <div 
                    className={`text-6xl mb-0 transition-all duration-1000 transform ${isBuildingVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                >
                    🏢
                </div>
            </div>

            {/* Soil Layer */}
            <div className="h-12 bg-amber-800/90 text-white/70 text-xs flex items-center justify-center border-b border-black/20 z-20 relative backdrop-blur-sm shadow-sm">
                Solo Superficial (Aterro)
            </div>

            {/* Fossil Layer */}
            <div className="flex-1 bg-shale-800 relative z-10 p-4">
                <span className="absolute top-2 left-2 text-white/50 text-xs">Camada de Folhelho (Oligoceno)</span>
                
                {/* Fossils */}
                {/* Fossil 1 */}
                <div 
                    className={`absolute bottom-5 left-[20%] text-4xl transition-all duration-500 ${fossilState === 'rescued' ? 'opacity-0 scale-0' : 'opacity-100'}`}
                    style={fossilState === 'destroyed' ? { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)', transform: 'rotate(45deg) scale(0.8)' } : {}}
                >
                    🐟
                </div>

                {/* Fossil 2 */}
                <div 
                    className={`absolute bottom-5 left-1/2 -translate-x-1/2 text-4xl transition-all duration-500 ${fossilState === 'rescued' ? 'opacity-0 scale-0' : 'opacity-100'}`}
                    style={fossilState === 'destroyed' ? { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)', transform: 'rotate(45deg) scale(0.8)' } : {}}
                >
                    🌿
                </div>

                {/* Fossil 3 */}
                <div 
                    className={`absolute bottom-5 right-[20%] text-4xl transition-all duration-500 ${fossilState === 'rescued' ? 'opacity-0 scale-0' : 'opacity-100'}`}
                    style={fossilState === 'destroyed' ? { filter: 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)', transform: 'rotate(45deg) scale(0.8)' } : {}}
                >
                    🐟
                </div>
            </div>
        </div>

        {/* Control Panel */}
        <div className="flex flex-col md:flex-row gap-6">
            
            {/* Museum Box */}
            <div className={`flex-1 min-w-[200px] border-2 rounded-xl p-4 transition-colors ${fossilState === 'rescued' ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-white'}`}>
                <div className="flex items-center gap-2 mb-2 font-bold text-shale-800">
                    <Landmark size={20} className={fossilState === 'rescued' ? 'text-green-600' : 'text-slate-400'} />
                    <span>Museu Municipal</span>
                </div>
                <div className="h-12 flex items-center gap-4 text-3xl overflow-hidden">
                    {fossilState === 'rescued' && (
                        <>
                           <span className="animate-[bounce_0.5s_ease-out]">🐟</span>
                           <span className="animate-[bounce_0.5s_ease-out_0.2s]">🌿</span>
                           <span className="animate-[bounce_0.5s_ease-out_0.4s]">🐟</span>
                        </>
                    )}
                </div>
            </div>

            {/* Buttons Area */}
            <div className="flex-[2] flex flex-col gap-4">
                 <h3 className="font-bold text-shale-800">Como vamos construir?</h3>
                 <div className="flex flex-wrap gap-3">
                    <button 
                        onClick={buildReckless} 
                        disabled={mode !== 'idle'}
                        className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all shadow-sm active:scale-95"
                    >
                        <Building2 size={18} /> Construir sem Estudo
                    </button>
                    
                    <button 
                         onClick={buildConscious}
                         disabled={mode !== 'idle'}
                         className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all shadow-sm active:scale-95"
                    >
                        <Pickaxe size={18} /> Resgate Paleontológico
                    </button>

                    <button 
                         onClick={resetCity}
                         className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-bold transition-all shadow-sm active:scale-95 ml-auto"
                         title="Reiniciar Simulação"
                    >
                        <RotateCcw size={18} />
                    </button>
                 </div>
            </div>
        </div>

        {/* Feedback Message */}
        <div className={`mt-6 text-center font-bold text-lg min-h-[3rem] flex items-center justify-center transition-colors duration-300 ${feedbackColor}`}>
            {feedback && <span className="animate-fade-in">{feedback}</span>}
        </div>

      </div>
    </section>
  );
};

export default CitySimulator;