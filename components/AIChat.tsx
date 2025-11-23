import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, X, MessageCircleQuestion } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const SUGGESTED_QUESTIONS = [
  "O que são varvitos?",
  "Quais animais viviam aqui?",
  "Por que não posso vender fósseis?",
  "Como era o clima há 23 milhões de anos?"
];

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou seu guia virtual pela Bacia de Tremembé. Posso responder dúvidas sobre os fósseis, a geologia e a história deste lugar incrível. O que gostaria de saber?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      // Focus input on open
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um problema ao consultar os estratos geológicos de dados. Tente novamente.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Collapsed State
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-shale-900 hover:bg-ochre-600 text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all z-50 group flex items-center gap-3 pr-6"
        aria-label="Abrir chat com especialista"
      >
        <div className="relative">
          <Bot size={24} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-shale-900"></span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold text-sm">Dúvidas sobre Fósseis?</span>
          <span className="text-xs text-slate-300 group-hover:text-white">Fale com a IA</span>
        </div>
      </button>
    );
  }

  // Expanded State
  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-96 h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 font-sans">
      {/* Chat Header */}
      <div className="bg-shale-900 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-ochre-600 p-2 rounded-lg">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Paleo-Guia Tremembé</h3>
            <p className="text-xs text-slate-300 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 scrollbar-thin scrollbar-thumb-slate-300">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`
                max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-ochre-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }
                ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions (Only show if not loading) */}
      {!isLoading && messages.length < 4 && (
        <div className="px-4 pb-2 bg-slate-50 overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="flex gap-2 pb-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-xs bg-white text-ochre-700 border border-ochre-200 px-3 py-1.5 rounded-full hover:bg-ochre-50 hover:border-ochre-400 transition-colors flex items-center gap-1 shadow-sm"
              >
                <MessageCircleQuestion size={12} />
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 rounded-b-2xl">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua dúvida..."
            className="w-full pl-4 pr-12 py-3 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:border-ochre-600 focus:ring-2 focus:ring-ochre-100 transition-all text-sm outline-none"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 p-2 bg-ochre-600 text-white rounded-lg hover:bg-ochre-700 disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-center mt-2">
           <p className="text-[10px] text-slate-400">IA pode cometer erros. Verifique informações importantes.</p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;