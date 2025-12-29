import React from 'react';
import { CatMascot } from './CatMascot';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FFF9E3] overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-12 left-8 animate-pulse-slow">
        <div className="w-20 h-20 rounded-full bg-[#FFE4C4]/60 flex items-center justify-center backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-[#FFD180]"></div>
        </div>
      </div>
      
      {/* Title Area */}
      <div className="mt-40 px-8 text-center z-10">
        <div className="inline-flex items-center gap-2 bg-[#FFF4E0] px-4 py-2 rounded-full mb-6 border border-[#FFE0B2] shadow-sm">
           <Sparkles size={16} className="text-[#F4A261]" />
           <span className="text-xs font-bold text-[#E76F51] uppercase tracking-widest">Safe. Simple. With you.</span>
        </div>
        <h1 className="text-5xl font-black text-[#264653] mb-4 tracking-tight leading-tight">
          Anjani
        </h1>
        <p className="text-[#E76F51] font-bold text-xl tracking-wide mb-2">
          I’m always with you.
        </p>
        <p className="text-[#8D6E63] text-base font-medium leading-relaxed max-w-[260px] mx-auto mt-4">
          A gentle companion, walking with you.
        </p>
      </div>

      {/* Main Illustration Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-8">
        <div className="relative w-full max-w-xs h-64 flex items-end justify-center">
            <div className="z-40 mb-12 animate-float-gentle transform scale-150 relative">
                {/* Micro-copy Bubble */}
                <div className="absolute -top-8 -right-12 animate-pulse z-50">
                     <div className="bg-white px-3 py-1.5 rounded-2xl rounded-bl-none shadow-sm text-[10px] font-bold text-[#8D6E63] border border-[#EFEBE9] whitespace-nowrap">
                        I’m right here.
                     </div>
                </div>
                <CatMascot mood="happy" />
            </div>
        </div>
      </div>

      {/* Bottom Action Area - Increased padding to pb-32 */}
      <div className="p-8 pb-32 w-full">
        <button 
          onClick={onStart}
          className="group w-full bg-gradient-to-r from-[#E76F51] to-[#F4A261] hover:from-[#D84315] hover:to-[#E65100] text-white py-5 rounded-full text-xl font-bold tracking-wide shadow-xl shadow-orange-300/40 flex items-center justify-center gap-3 transform transition-all active:scale-95"
        >
          <span>Start Journey</span>
          <div className="bg-white/20 rounded-full p-1.5 group-hover:translate-x-1 transition-transform">
             <ArrowRight size={24} strokeWidth={3} />
          </div>
        </button>
      </div>
    </div>
  );
};