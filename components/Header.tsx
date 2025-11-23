import React from 'react';

const Header: React.FC = () => {
  return (
    <header 
      className="relative py-24 text-center border-b-[5px] border-ochre-600 shadow-2xl bg-fixed bg-cover bg-center bg-no-repeat text-white overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1546519638-68e109498ee3?q=80&w=2000')"
      }}
    >
      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        
        {/* Main Title Section */}
        <h1 className="font-serif text-5xl md:text-7xl mb-4 text-gold drop-shadow-lg tracking-tight">
          Bacia de Tremembé
        </h1>
        
        <p className="font-sans text-xl md:text-2xl font-light max-w-3xl mx-auto mb-10 tracking-wide text-slate-100 leading-relaxed">
          Guardiões do Oligoceno: Um portal de <strong className="font-bold text-white">23 milhões de anos</strong> sob nossos pés.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4">
           <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 px-6 py-2 rounded-full text-slate-100 text-sm md:text-base shadow-lg hover:bg-white/20 transition-colors cursor-default">
              📍 Vale do Paraíba, SP
           </span>
           <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 px-6 py-2 rounded-full text-slate-100 text-sm md:text-base shadow-lg hover:bg-white/20 transition-colors cursor-default">
              ⛏️ Formação Tremembé
           </span>
        </div>

      </div>
    </header>
  );
};

export default Header;