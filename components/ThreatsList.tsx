import React from 'react';
import { AlertTriangle, Construction, Hammer, CloudRain } from 'lucide-react';

const ThreatsList: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md mb-12">
      <h2 className="text-2xl font-bold text-shale-800 mb-6 flex items-center gap-2">
        <AlertTriangle className="text-red-600" />
        Ameaças ao Patrimônio
      </h2>
      
      <div className="space-y-4">
        {/* Threat 1 */}
        <div className="flex items-start p-4 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
          <div className="p-2 bg-white rounded-full text-red-600 mr-4 shadow-sm">
             <Construction size={20} />
          </div>
          <div>
            <h4 className="font-bold text-red-800 mb-1">Urbanização Desordenada</h4>
            <p className="text-red-700 text-sm">
              Construções sobre áreas fossilíferas selam o solo para sempre, impedindo estudos futuros e destruindo camadas geológicas vitais.
            </p>
          </div>
        </div>

        {/* Threat 2 */}
        <div className="flex items-start p-4 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
          <div className="p-2 bg-white rounded-full text-red-600 mr-4 shadow-sm">
             <Hammer size={20} />
          </div>
          <div>
            <h4 className="font-bold text-red-800 mb-1">Coleta Irregular</h4>
            <p className="text-red-700 text-sm">
              Retirar fósseis sem método científico destrói a informação geológica. Um fóssil na estante sem etiqueta de proveniência perde quase todo seu valor científico.
            </p>
          </div>
        </div>

         {/* Threat 3 */}
         <div className="flex items-start p-4 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
          <div className="p-2 bg-white rounded-full text-red-600 mr-4 shadow-sm">
             <CloudRain size={20} />
          </div>
          <div>
            <h4 className="font-bold text-red-800 mb-1">Erosão e Oxidação</h4>
            <p className="text-red-700 text-sm">
              Fósseis expostos ao ar (pirita) oxidam e "enferrujam" rapidamente se não forem tratados adequadamente em laboratório, transformando-se em pó.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatsList;