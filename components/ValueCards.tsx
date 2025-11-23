import React from 'react';
import { Microscope, Globe, Factory } from 'lucide-react';

const ValueCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Card 1 */}
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-clay-500 hover:-translate-y-1 transition-transform duration-300 group">
        <div className="bg-clay-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-clay-100 transition-colors">
           <Microscope className="text-clay-600" size={24} />
        </div>
        <h3 className="text-xl font-bold text-shale-800 mb-2">Valor Científico</h3>
        <p className="text-slate-600 text-sm leading-relaxed relative z-20">
          Um verdadeiro{' '}
          <span className="group relative cursor-help border-b border-dashed border-clay-500 inline-block">
            <strong className="text-clay-700">Lagerstätte</strong>
            {/* Tooltip Container */}
            <span className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-shale-900 text-white text-xs p-3 rounded-lg shadow-xl transition-all duration-300 z-50 pointer-events-none text-center leading-snug">
              No contexto da paleontologia, o termo é usado especificamente para designar depósitos sedimentares com fósseis de preservação excepcional, muitas vezes incluindo tecidos moles, como músculos, órgãos e coberturas.
              {/* Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-shale-900"></span>
            </span>
          </span>
          . Local de preservação excepcional com peixes com pele, insetos com asas e tecidos moles preservados, revelando a evolução na América do Sul.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-ochre-600 hover:-translate-y-1 transition-transform duration-300 group">
        <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
            <Globe className="text-ochre-600" size={24} />
        </div>
        <h3 className="text-xl font-bold text-shale-800 mb-2">Arquivo Climático</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          As rochas formadas no fundo do lago antigo (varvitos) registram ciclos climáticos anuais de milhões de anos, essenciais para entender mudanças climáticas globais.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-slate-600 hover:-translate-y-1 transition-transform duration-300 group">
         <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
            <Factory className="text-slate-600" size={24} />
         </div>
        <h3 className="text-xl font-bold text-shale-800 mb-2">Riqueza Econômica</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Além dos fósseis, a bacia fornece <strong>Bentonita</strong> (argila industrial), folhelho betuminoso e água mineral, sendo um motor econômico vital para o Vale do Paraíba.
        </p>
      </div>
    </div>
  );
};

export default ValueCards;