import React, { useState } from 'react';
import { Ruler, ExternalLink } from 'lucide-react';

type CreatureType = 'human' | 'bird' | 'catfish' | 'croc';

const ScaleComparator: React.FC = () => {
  const [selected, setSelected] = useState<CreatureType | null>(null);

  const getInfo = (type: CreatureType) => {
    switch (type) {
      case 'bird':
        return {
          title: 'Paraphysornis brasiliensis',
          emoji: '🦖',
          text: "Uma 'Ave do Terror' de 2 metros de altura! Não voava, mas corria muito rápido para caçar pequenos mamíferos. Topo da cadeia alimentar.",
          colorClass: 'border-l-4 border-red-500 text-red-100',
          url: 'https://www.cnnbrasil.com.br/tecnologia/fossil-da-maior-ave-do-terror-ja-registrada-e-encontrado-na-colombia/'
        };
      case 'human':
        return {
            title: 'Homo sapiens (Você)',
            emoji: '🧍',
            text: "Apenas para comparação. Nós só aparecemos 23 milhões de anos depois desses animais!",
            colorClass: 'border-l-4 border-blue-500 text-blue-100'
        };
      case 'catfish':
        return {
            title: 'Taubateia paraiba',
            emoji: '🐟',
            text: "Um ancestral dos 'cascudos'. Tinha cabeça blindada e vivia no fundo do lago.",
            colorClass: 'border-l-4 border-yellow-500 text-yellow-100'
        };
      case 'croc':
        return {
            title: 'Caiman tremembensis',
            emoji: '🐊',
            text: "Um jacaré primitivo. Diferente dos atuais, seus dentes indicam que comia moluscos duros (caramujos).",
            colorClass: 'border-l-4 border-green-500 text-green-100'
        };
      default:
        return null;
    }
  };

  const currentInfo = selected ? getInfo(selected) : null;

  return (
    <section className="bg-white p-8 rounded-xl shadow-md mb-12 scroll-mt-20 border-t-4 border-sky-600" id="escala">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-shale-800 mb-3 flex items-center gap-2">
          <Ruler className="text-sky-600" />
          Quem mandava no pedaço?
        </h2>
        <p className="text-slate-600">
          O Lago Tremembé parecia calmo, mas suas margens eram habitadas por gigantes. Passe o mouse ou clique sobre as silhuetas para descobrir quem é quem.
        </p>
      </div>

      <div className="relative w-full rounded-xl overflow-hidden shadow-inner border-2 border-slate-300">
        {/* Background Layer: Sky and Ground */}
        <div className="absolute inset-0 z-0 flex flex-col">
            <div className="h-[70%] bg-sky-300 w-full"></div> {/* Sky */}
            <div className="h-[30%] bg-amber-800 w-full border-t border-amber-900/30"></div> {/* Ground */}
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-[350px] flex items-end px-6 pb-[30px]"> {/* pb matches somewhat with ground height visually */}
            
            {/* Ruler */}
            <div className="flex flex-col justify-between h-[80%] mb-12 mr-8 border-r-2 border-dashed border-white/50 pr-4 text-white font-bold text-sm select-none">
                <span>2.0m</span>
                <span>1.5m</span>
                <span>1.0m</span>
                <span>0.5m</span>
                <span>0m</span>
            </div>

            {/* Creatures Wrapper */}
            <div className="flex items-end justify-around flex-1 pb-4"> {/* pb-4 aligns items on "ground" */}
                
                {/* Human */}
                <div 
                    onClick={() => setSelected('human')}
                    className="group cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2"
                >
                    <div className="text-[7rem] leading-none drop-shadow-lg filter pb-2">🧍</div>
                    <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-blue-600 transition-colors">
                        Você (1.75m)
                    </div>
                </div>

                {/* Terror Bird */}
                <div 
                    onClick={() => setSelected('bird')}
                    className="group cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2"
                >
                    {/* Size adjusted relative to human */}
                    <div className="text-[8.5rem] leading-none drop-shadow-lg filter pb-2 transform -scale-x-100">🦤</div>
                    <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-red-600 transition-colors">
                        Ave do Terror
                    </div>
                </div>

                {/* Catfish */}
                <div 
                    onClick={() => setSelected('catfish')}
                    className="group cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-110 hover:-translate-y-2 mb-2"
                >
                    <div className="text-4xl leading-none drop-shadow-lg filter pb-1">🐟</div>
                    <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-yellow-600 transition-colors">
                        Taubateia
                    </div>
                </div>

                {/* Croc */}
                <div 
                    onClick={() => setSelected('croc')}
                    className="group cursor-pointer flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2 mb-1"
                >
                     <div className="text-5xl leading-none drop-shadow-lg filter pb-1 transform scale-x-125">🐊</div>
                    <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-green-600 transition-colors">
                        Caiman
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* Info Display Box */}
      <div className={`mt-0 p-6 rounded-b-xl min-h-[100px] flex items-center justify-center text-center transition-colors duration-300 ${currentInfo ? 'bg-shale-800' : 'bg-shale-900'}`}>
        {currentInfo ? (
            <div className={`animate-fade-in ${currentInfo.colorClass} pl-4 text-left w-full`}>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <span className="text-2xl">{currentInfo.emoji}</span> 
                    {currentInfo.title}
                </h3>
                <p className="text-slate-300 text-lg mb-2">{currentInfo.text}</p>
                
                {/* Render External Link if available */}
                {currentInfo.url && (
                    <a 
                        href={currentInfo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors mt-1"
                    >
                        Saiba mais <ExternalLink size={14} />
                    </a>
                )}
            </div>
        ) : (
            <p className="text-slate-400 italic flex items-center gap-2">
                <span className="animate-bounce">👆</span> 
                Clique em uma silhueta acima para ver os dados.
            </p>
        )}
      </div>
    </section>
  );
};

export default ScaleComparator;