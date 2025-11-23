import React, { useState } from 'react';

const VolcanoTimeline: React.FC = () => {
  const [phase, setPhase] = useState(1);

  const getTitle = () => {
    switch(phase) {
      case 1: return "Fase 1: Oligoceno (23 Ma)";
      case 2: return "Fase 2: A Catástrofe (Tafonomia)";
      case 3: return "Fase 3: O Presente (Recurso Mineral)";
      default: return "";
    }
  };

  const getDescription = () => {
    switch(phase) {
      case 1: return "O lago Tremembé é calmo e cheio de vida. Porém, na região vizinha (como no Complexo de Poços de Caldas), a atividade vulcânica alcalina está prestes a explodir.";
      case 2: return <><strong>Cinzas no Ar:</strong> A erupção lança toneladas de material piroclástico. Ao cair na água, a cinza altera o pH e entope as brânquias dos peixes, causando morte em massa.</>;
      case 3: return "Milhões de anos depois, a cinza vulcânica se transformou em Bentonita (argila verde), preservando os fósseis entre suas camadas e criando riqueza econômica.";
      default: return "";
    }
  };

  return (
    <section className="bg-white p-8 rounded-xl shadow-md mb-12 scroll-mt-20 border-t-4 border-emerald-600" id="vulcao">
      <style>{`
        .volcano-timeline-container {
            border: 1px solid #bdc3c7;
            border-radius: 12px;
            overflow: hidden;
            background: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .vt-scene-container {
            position: relative;
            height: 350px;
            width: 100%;
            overflow: hidden;
        }

        /* --- CENÁRIO --- */
        .vt-sky-gradient {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 70%;
            background: linear-gradient(to bottom, #87CEEB, #E0F6FF);
            transition: background 2s;
        }

        .vt-mountain-range {
            position: absolute;
            bottom: 30%; /* Linha do horizonte */
            left: 0; width: 100%;
            display: flex;
            align-items: flex-end;
            z-index: 1;
        }

        .vt-mountain {
            width: 0; height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 80px solid #7f8c8d;
            margin-right: -20px;
        }
        .vt-mountain.small { border-bottom: 50px solid #95a5a6; }

        .vt-volcano {
            width: 0; height: 0;
            border-left: 70px solid transparent;
            border-right: 70px solid transparent;
            border-bottom: 120px solid #555;
            position: relative;
            margin-left: 20px;
        }
        /* O topo cortado do vulcão */
        .vt-volcano::after {
            content: '';
            position: absolute;
            top: 120px; left: -70px;
            width: 140px; height: 10px;
            background: #555;
        }

        /* Erupção */
        .vt-lava-plume {
            position: absolute;
            top: 5px; left: -10px;
            width: 20px; height: 0px;
            background: #e74c3c;
            border-radius: 10px;
            box-shadow: 0 0 20px #c0392b;
            transition: height 0.5s;
            opacity: 0;
        }

        /* Lago */
        .vt-lake-body {
            position: absolute;
            bottom: 10%; /* Logo acima do fundo */
            height: 20%;
            width: 100%;
            background: rgba(52, 152, 219, 0.8);
            z-index: 5;
            backdrop-filter: blur(2px);
            transition: background 2s;
        }

        /* Fundo do Lago (Sedimento) */
        .vt-lake-bed {
            position: absolute;
            bottom: 0;
            height: 10%;
            width: 100%;
            background: #34495e; /* Cor original escura */
            z-index: 6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 0.8rem;
            transition: height 1s, background-color 2s;
        }

        /* --- EFEITOS ESPECIAIS --- */
        .vt-ash-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to bottom, rgba(100,100,100,0.8), rgba(50,50,50,0.5));
            opacity: 0;
            z-index: 4;
            pointer-events: none;
            transition: opacity 2s;
        }

        /* Peixes */
        .vt-fish {
            position: absolute;
            font-size: 1.5rem;
            transition: all 2s;
        }
        .f1 { left: 20%; top: 30%; animation: swim 5s infinite; }
        .f2 { left: 50%; top: 50%; animation: swim 7s infinite reverse; }
        .f3 { left: 70%; top: 20%; animation: swim 6s infinite; }
        .f4 { left: 30%; top: 60%; animation: swim 8s infinite reverse; }

        @keyframes swim {
            0% { transform: translateX(0); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(0); }
        }

        /* ESTADOS DA ANIMAÇÃO (CLASSES) */
        
        /* FASE 2: Erupção */
        .erupting .vt-lava-plume { height: 100px; opacity: 1; }
        .erupting .vt-sky-gradient { background: #555; } /* Céu escurece */
        .erupting .vt-ash-overlay { opacity: 1; }
        
        /* Peixes Morrendo */
        .erupting .vt-fish {
            top: 80% !important; /* Caem no fundo */
            transform: rotate(180deg) !important; /* Barriga pra cima */
            filter: grayscale(100%);
        }

        /* FASE 3: Diagênese */
        .diagenesis .vt-lake-bed {
            height: 25%; /* Camada cresce */
            background-color: #27ae60; /* Vira Verde (Bentonita) */
        }
        .diagenesis .vt-bed-label::after { content: " + Bentonita"; }
        .diagenesis .vt-fish { opacity: 0; } /* Somem (soterrados) */
        .diagenesis .vt-sky-gradient { background: #87CEEB; } /* Céu limpa */
        .diagenesis .vt-ash-overlay { opacity: 0; }
        .diagenesis .vt-lava-plume { height: 0; opacity: 0; }
        
        .btn-timeline {
            transition: all 0.2s;
        }
        .btn-timeline:active {
            transform: scale(0.95);
        }
      `}</style>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-shale-800 mb-3">O Mistério da Argila Verde: Uma História Explosiva</h2>
        <p className="text-slate-600">Como cinzas de vulcões distantes criaram a riqueza mineral (e os cemitérios de peixes) de Tremembé. Acompanhe a linha do tempo:</p>
      </div>

      <div className="volcano-timeline-container">
          
          <div className={`vt-scene-container ${phase === 2 ? 'erupting' : ''} ${phase === 3 ? 'diagenesis' : ''}`} id="geo-scene">
              <div className="vt-sky-gradient"></div>
              
              <div className="vt-mountain-range">
                  <div className="vt-volcano">
                      <div className="vt-lava-plume"></div>
                  </div>
                  <div className="vt-mountain"></div>
                  <div className="vt-mountain small"></div>
              </div>

              <div className="vt-ash-overlay" id="ash-layer"></div>

              <div className="vt-lake-body">
                  <div className="vt-fish f1">🐟</div>
                  <div className="vt-fish f2">🐟</div>
                  <div className="vt-fish f3">🐟</div>
                  <div className="vt-fish f4">🐟</div>
              </div>

              <div className="vt-lake-bed" id="sediment-layer">
                  <span className="vt-bed-label text-xs md:text-sm font-bold tracking-wide">Lama Orgânica (Folhelho)</span>
              </div>
          </div>

          <div className="p-6 bg-slate-50">
              <div className="flex gap-4 mb-4 border-b border-slate-200 pb-4 overflow-x-auto">
                  <button onClick={() => setPhase(1)} className={`text-sm font-bold cursor-pointer whitespace-nowrap px-2 pb-2 transition-colors ${phase === 1 ? 'text-ochre-600 border-b-2 border-ochre-600' : 'text-slate-400 hover:text-slate-600'}`}>1. O Vizinho Explosivo</button>
                  <button onClick={() => setPhase(2)} className={`text-sm font-bold cursor-pointer whitespace-nowrap px-2 pb-2 transition-colors ${phase === 2 ? 'text-ochre-600 border-b-2 border-ochre-600' : 'text-slate-400 hover:text-slate-600'}`}>2. A Chuva Mortal</button>
                  <button onClick={() => setPhase(3)} className={`text-sm font-bold cursor-pointer whitespace-nowrap px-2 pb-2 transition-colors ${phase === 3 ? 'text-ochre-600 border-b-2 border-ochre-600' : 'text-slate-400 hover:text-slate-600'}`}>3. O Legado Verde</button>
              </div>
              
              <div className="min-h-[100px] mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300" key={phase}>
                  <h3 className="font-bold text-lg text-shale-800 mb-2">{getTitle()}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">{getDescription()}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setPhase(1)} 
                    disabled={phase === 1}
                    className="btn-timeline px-5 py-2 bg-shale-800 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-shale-900 shadow-sm flex items-center gap-2"
                  >
                    ⏮️ Início
                  </button>
                  
                  {phase === 1 && (
                    <button 
                        onClick={() => setPhase(2)} 
                        className="btn-timeline px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-md animate-pulse flex items-center gap-2"
                    >
                        🌋 Explodir Vulcão
                    </button>
                  )}

                  {phase === 2 && (
                    <button 
                        onClick={() => setPhase(3)} 
                        className="btn-timeline px-5 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 shadow-md flex items-center gap-2"
                    >
                        ⏳ Avançar Milhões de Anos
                    </button>
                  )}
                  
                  {phase === 3 && (
                     <button 
                        onClick={() => setPhase(1)} 
                        className="btn-timeline px-5 py-2 bg-slate-500 text-white rounded-lg font-medium hover:bg-slate-600 flex items-center gap-2"
                    >
                        🔄 Reiniciar Ciclo
                    </button>
                  )}
              </div>
          </div>
      </div>
    </section>
  );
};

export default VolcanoTimeline;