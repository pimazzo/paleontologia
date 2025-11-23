import React, { useState } from 'react';
import { Search, ArrowRight, CheckCircle, XCircle, Leaf, Gem } from 'lucide-react';

type SampleType = 'fossil' | 'mineral';

interface Sample {
  id: number;
  img: string;
  type: SampleType;
  title: string;
  explanation: string;
}

const samples: Sample[] = [
  {
    id: 1,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Dendrites01.jpg/640px-Dendrites01.jpg",
    type: "mineral",
    title: "É um Mineral (Dendrito)!",
    explanation: "Isso é um Dendrito de Manganês. Veja como ele não tem um eixo central e se ramifica aleatoriamente como um fractal, parecendo musgo, mas é puramente químico."
  },
  {
    id: 2,
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Feather_fossil.jpg",
    type: "fossil",
    title: "É uma Pena Fóssil!",
    explanation: "Note a 'Raque' (o eixo duro no meio) e as barbas saindo paralelas e organizadas. Essa simetria e estrutura complexa indicam origem biológica."
  }
];

const FossilDetective: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const currentSample = samples[currentIndex];

  const handleGuess = (guess: SampleType) => {
    if (feedbackState !== 'idle') return; // Prevent double guessing

    if (guess === currentSample.type) {
      setFeedbackState('correct');
    } else {
      setFeedbackState('incorrect');
    }
  };

  const handleNext = () => {
    setFeedbackState('idle');
    setCurrentIndex((prev) => (prev + 1) % samples.length);
  };

  return (
    <section className="bg-shale-800 p-8 rounded-xl shadow-md mb-12 scroll-mt-20 text-white" id="detetive">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-2 text-ochre-500">
          <Search className="text-ochre-500" />
          Desafio do Especialista: Fóssil ou Falso?
        </h2>
        <p className="text-slate-300">
          Nem tudo que parece planta é fóssil. Minerais chamados <strong>Dendritos de Manganês</strong> crescem nas rochas parecendo musgo. Você sabe diferenciar?
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 bg-shale-900/50 p-6 rounded-xl border border-shale-700">
        
        {/* Sample Viewer */}
        <div className="flex-1 min-w-[300px] flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border-4 border-slate-200 shadow-lg mb-4">
             <img 
               src={currentSample.img} 
               alt="Amostra Misteriosa" 
               className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
             />
             <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Search size={12} />
                Amostra #{currentSample.id}
             </div>
          </div>
          <div className="bg-shale-800 px-4 py-2 rounded-full text-sm text-ochre-400 border border-ochre-900/30 flex items-center gap-2">
             <Search size={16} />
             <span>Dica: Observe se há eixo central ou se as linhas se cruzam.</span>
          </div>
        </div>

        {/* Decision Panel */}
        <div className="flex-1 flex flex-col justify-center">
            
            <h3 className="text-xl font-bold mb-4 text-center lg:text-left">O que você está vendo?</h3>
            
            <div className="space-y-3">
                <button 
                    onClick={() => handleGuess('fossil')}
                    disabled={feedbackState !== 'idle'}
                    className={`
                        w-full p-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-sm
                        ${feedbackState === 'idle' 
                            ? 'bg-clay-600 hover:bg-clay-500 text-white hover:scale-[1.02] active:scale-95' 
                            : 'opacity-50 cursor-not-allowed bg-slate-700'
                        }
                    `}
                >
                    <Leaf size={24} />
                    É um Fóssil Biológico
                </button>

                <button 
                    onClick={() => handleGuess('mineral')}
                    disabled={feedbackState !== 'idle'}
                    className={`
                        w-full p-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-sm
                        ${feedbackState === 'idle' 
                            ? 'bg-slate-500 hover:bg-slate-400 text-white hover:scale-[1.02] active:scale-95' 
                            : 'opacity-50 cursor-not-allowed bg-slate-700'
                        }
                    `}
                >
                    <Gem size={24} />
                    É um Mineral (Dendrito)
                </button>
            </div>

            {/* Feedback Area */}
            {feedbackState !== 'idle' && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className={`p-5 rounded-xl border-l-8 ${feedbackState === 'correct' ? 'bg-green-900/40 border-green-500' : 'bg-red-900/40 border-red-500'}`}>
                        <div className="flex items-start gap-3">
                            {feedbackState === 'correct' ? (
                                <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
                            ) : (
                                <XCircle className="text-red-500 shrink-0 mt-1" size={24} />
                            )}
                            <div>
                                <h4 className={`font-bold text-lg mb-1 ${feedbackState === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                                    {feedbackState === 'correct' ? 'Correto!' : 'Ops!'}
                                </h4>
                                <p className="font-bold text-white mb-1">{currentSample.title}</p>
                                <p className="text-slate-300 text-sm leading-relaxed">{currentSample.explanation}</p>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleNext}
                        className="w-full mt-4 bg-ochre-600 hover:bg-ochre-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                        Próxima Amostra <ArrowRight size={20} />
                    </button>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default FossilDetective;
