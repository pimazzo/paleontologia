import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Peixes (Actinopterygii)', value: 45 },
  { name: 'Insetos', value: 25 },
  { name: 'Plantas (Folhas/Frutos)', value: 20 },
  { name: 'Répteis/Aves/Mamíferos', value: 10 },
];

const COLORS = ['#27ae60', '#d35400', '#2c3e50', '#f39c12'];

const FossilChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-12 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-8">
        <h3 className="text-2xl font-bold text-shale-800 mb-4 border-l-4 border-ochre-600 pl-3">
            Biodiversidade do Passado
        </h3>
        <p className="text-slate-600 mb-4">
            A Formação Tremembé é famosa pela diversidade. Embora os peixes sejam os achados mais comuns, a preservação de insetos e plantas delicadas torna este local único no mundo.
        </p>
        <div className="text-sm bg-slate-100 p-4 rounded-lg text-slate-700">
            <strong>Nota:</strong> Dados aproximados baseados na frequência de achados em coleções museológicas.
        </div>
      </div>
      
      <div className="w-full md:w-1/2 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#333' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FossilChart;