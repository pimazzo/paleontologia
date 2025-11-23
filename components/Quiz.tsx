import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "1. Você encontrou um peixe fóssil com cor de ferrugem. O que aconteceu quimicamente?",
    options: [
      { id: 'a', text: "O peixe morreu queimado", isCorrect: false },
      { id: 'b', text: "Minerais de ferro oxidaram", isCorrect: true },
      { id: 'c', text: "É mancha de tinta", isCorrect: false }
    ]
  },
  {
    id: 2,
    text: "2. O que a rocha que se abre em folhas finas (\"papirácea\") indica sobre o antigo lago?",
    options: [
      { id: 'a', text: "Águas calmas e profundas", isCorrect: true },
      { id: 'b', text: "Corredeiras de rio rápido", isCorrect: false },
      { id: 'c', text: "Ondas de praia", isCorrect: false }
    ]
  },
  {
    id: 3,
    text: "3. Qual a atitude correta ao achar um fóssil em um barranco?",
    options: [
      { id: 'a', text: "Arrancar e levar para casa", isCorrect: false },
      { id: 'b', text: "Lavar com escova de aço", isCorrect: false },
      { id: 'c', text: "Fotografar e não remover", isCorrect: true }
    ]
  }
];

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, { selectedId: string; isCorrect: boolean }>>({});

  const handleAnswer = (questionId: number, optionId: string, isCorrect: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { selectedId: optionId, isCorrect }
    }));
  };

  return (
    <div className="bg-shale-800 text-white p-8 rounded-xl shadow-xl mb-12 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -right-10 -top-10 opacity-10">
        <HelpCircle size={200} />
      </div>

      <h2 className="text-2xl font-bold mb-2 text-ochre-600">Desafio do Paleontólogo</h2>
      <p className="mb-8 text-slate-300">Teste seus conhecimentos sobre o Oligoceno. Clique na resposta correta:</p>

      <div className="space-y-8 relative z-10">
        {questions.map((q) => (
          <div key={q.id} className="pb-6 border-b border-slate-700 last:border-0">
            <div className="bg-shale-900/50 p-4 rounded-lg border border-slate-700 mb-4">
              <p className="font-medium">{q.text}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt) => {
                const answer = answers[q.id];
                const isSelected = answer?.selectedId === opt.id;
                let btnClass = "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-ochre-600";

                if (isSelected) {
                  if (opt.isCorrect) {
                    btnClass = "bg-green-600 border-green-500 text-white";
                  } else {
                    btnClass = "bg-red-600 border-red-500 text-white";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(q.id, opt.id, opt.isCorrect)}
                    className={`
                      p-3 rounded-lg border transition-all duration-200 flex items-center justify-between text-left
                      ${btnClass}
                    `}
                  >
                    <span className="font-medium">{opt.text}</span>
                    {isSelected && (
                        opt.isCorrect 
                            ? <CheckCircle size={18} className="text-white" />
                            : <XCircle size={18} className="text-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {answers[q.id] && (
              <div className={`mt-3 p-3 rounded-lg animate-fade-in flex items-center gap-2 ${answers[q.id].isCorrect ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {answers[q.id].isCorrect 
                    ? <span>✅ <strong>Correto!</strong> Você tem olho de cientista.</span>
                    : <span>❌ <strong>Tente de novo.</strong> Pense no processo geológico.</span>
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;