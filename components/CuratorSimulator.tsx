import React, { useState, useEffect } from 'react';
import { MapPin, Layers, Calendar, Gem, AlertCircle, CheckCircle2 } from 'lucide-react';

const CuratorSimulator: React.FC = () => {
  const [checks, setChecks] = useState({
    location: false,
    layer: false,
    date: false,
    integrity: false
  });

  const [result, setResult] = useState({
    score: 0,
    color: 'bg-red-500',
    textColor: 'text-red-600',
    title: 'Lixo Científico',
    description: 'Sem informações confiáveis, o fóssil perde seu contexto. É apenas uma pedra bonita sem valor para a ciência.'
  });

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    let score = 0;
    
    // Lógica simplificada: Soma direta dos itens selecionados (25 pontos cada)
    // Independente da ordem ou da presença da localização
    if (checks.location) score += 25;
    if (checks.layer) score += 25;
    if (checks.date) score += 25;
    if (checks.integrity) score += 25;

    let color = 'bg-red-500';
    let textColor = 'text-red-600';
    let title = 'Lixo Científico';
    let description = 'Sem informações confiáveis, o fóssil perde seu contexto. A ciência precisa de dados, não apenas do objeto.';

    if (score === 0) {
      color = 'bg-red-500';
      textColor = 'text-red-600';
      title = 'Lixo Científico';
      description = 'Sem informações confiáveis, o fóssil perde seu contexto. A ciência precisa de dados, não apenas do objeto.';
    } else if (score < 50) {
      color = 'bg-orange-500';
      textColor = 'text-orange-600';
      title = 'Dado Incompleto';
      description = 'Temos algumas informações, mas faltam dados cruciais. Útil, mas limitado para estudos detalhados.';
    } else if (score < 100) {
      color = 'bg-blue-500';
      textColor = 'text-blue-600';
      title = 'Bom Registro';
      description = 'Possui um bom conjunto de dados. O museu aceitaria esta peça para estudos comparativos.';
    } else {
      color = 'bg-green-500';
      textColor = 'text-green-600';
      title = 'Tesouro Científico';
      description = 'Dados completos! Isso permite reconstruir o ambiente, o clima e a datação precisa. O padrão ouro da curadoria.';
    }

    setResult({ score, color, textColor, title, description });
  }, [checks]);

  return (
    <section className="bg-white p-8 rounded-xl shadow-md mb-12 scroll-mt-20 border-t-4 border-ochre-600" id="simulador">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-shale-800 mb-3 flex items-center gap-2">
          <Gem className="text-ochre-600" />
          Simulador de Curadoria
        </h2>
        <p className="text-slate-600">
          Você é o curador de um museu. Avalie se o fóssil abaixo tem valor para a ciência baseando-se nas informações que chegaram com ele.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
        {/* Coluna Esquerda: Representação Visual do Fóssil */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 rounded-lg border border-slate-200 shadow-sm min-h-[300px]">
             <div className="relative w-56 h-56 bg-stone-200 rounded-full flex items-center justify-center overflow-hidden mb-6 shadow-inner group">
                <img 
                  src="https://super.abril.com.br/wp-content/uploads/2022/07/Mais-de-180-fosseis-de-peixes-jurassicos-sao-encontrados-no-Reino-Unido.jpg?quality=70&strip=info&w=1024&h=682&crop=1" 
                  alt="Fóssil de Peixe" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-mono border border-slate-200 rounded shadow-sm text-slate-600">
                    #T-402
                </div>
             </div>
             <div className="text-center">
                 <h3 className="font-bold text-shale-800 text-lg">Espécime #T-402</h3>
                 <p className="text-sm text-slate-500">Peixe</p>
             </div>
        </div>

        {/* Coluna Direita: Controles e Painel de Dados */}
        <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
                <h3 className="font-bold text-lg text-shale-800 mb-4 border-b border-slate-200 pb-2 flex justify-between items-center">
                    <span>Ficha de Coleta</span>
                    <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded">Marque o que sabemos</span>
                </h3>
                <div className="space-y-3">
                    
                    <button 
                        onClick={() => toggleCheck('location')}
                        className={`w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200 text-left group active:scale-[0.98] ${checks.location ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-transparent hover:bg-white hover:border-slate-300 hover:shadow-md'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-300 shrink-0 ${checks.location ? 'bg-blue-500 text-white scale-110' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'}`}>
                            <MapPin size={16} />
                        </div>
                        <div>
                             <span className={`block font-bold ${checks.location ? 'text-blue-900' : 'text-slate-600'}`}>Localização Exata (GPS)</span>
                             <span className="text-xs text-slate-400">Sabemos exatamente onde foi achado</span>
                        </div>
                    </button>

                    <button 
                        onClick={() => toggleCheck('layer')}
                        className={`w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200 text-left group active:scale-[0.98] ${checks.layer ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-transparent hover:bg-white hover:border-slate-300 hover:shadow-md'}`}
                    >
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-300 shrink-0 ${checks.layer ? 'bg-blue-500 text-white scale-110' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'}`}>
                            <Layers size={16} />
                        </div>
                        <div>
                             <span className={`block font-bold ${checks.layer ? 'text-blue-900' : 'text-slate-600'}`}>Camada Estratigráfica</span>
                             <span className="text-xs text-slate-400">Altura exata no barranco sedimentar</span>
                        </div>
                    </button>

                    <button 
                        onClick={() => toggleCheck('date')}
                        className={`w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200 text-left group active:scale-[0.98] ${checks.date ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-transparent hover:bg-white hover:border-slate-300 hover:shadow-md'}`}
                    >
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-300 shrink-0 ${checks.date ? 'bg-blue-500 text-white scale-110' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'}`}>
                            <Calendar size={16} />
                        </div>
                        <div>
                             <span className={`block font-bold ${checks.date ? 'text-blue-900' : 'text-slate-600'}`}>Data da Coleta</span>
                             <span className="text-xs text-slate-400">Registro temporal do achado</span>
                        </div>
                    </button>

                    <button 
                        onClick={() => toggleCheck('integrity')}
                        className={`w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200 text-left group active:scale-[0.98] ${checks.integrity ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-transparent hover:bg-white hover:border-slate-300 hover:shadow-md'}`}
                    >
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-all duration-300 shrink-0 ${checks.integrity ? 'bg-blue-500 text-white scale-110' : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300'}`}>
                            <Gem size={16} />
                        </div>
                        <div>
                             <span className={`block font-bold ${checks.integrity ? 'text-blue-900' : 'text-slate-600'}`}>Integridade (Original)</span>
                             <span className="text-xs text-slate-400">Não foi lavado, lixado ou colado</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Painel de Resultado (Meter) */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-lg relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${result.color}`}></div>
                
                <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Valor Científico Calculado</span>
                    <span className={`font-black text-2xl ${result.textColor}`}>{result.score}%</span>
                </div>
                
                <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden mb-4 shadow-inner border border-slate-100">
                    <div 
                        className={`h-full transition-all duration-700 ease-out ${result.color} relative`} 
                        style={{ width: `${result.score}%` }}
                    >
                         <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>

                <div>
                     <h4 className={`font-bold text-xl flex items-center gap-2 mb-2 ${result.textColor}`}>
                        {result.score === 0 ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
                        {result.title}
                     </h4>
                     <p className="text-sm text-slate-600 leading-relaxed">
                        {result.description}
                     </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CuratorSimulator;