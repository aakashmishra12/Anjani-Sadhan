import React from 'react';
import { Cat, Sparkles, Moon, Music } from 'lucide-react';

interface CatMascotProps {
  mood: 'sleeping' | 'walking' | 'waiting' | 'happy';
  className?: string;
}

export const CatMascot: React.FC<CatMascotProps> = ({ mood, className }) => {
  
  const getVisuals = () => {
    switch (mood) {
      case 'walking':
        return (
          <div className="relative">
            <div className="absolute -top-4 right-0 animate-bounce">
                <Sparkles className="text-[#FFCC80] w-6 h-6" fill="currentColor" />
            </div>
            <div className="bg-[#FFF8E1] p-6 rounded-full ring-4 ring-[#FFECB3]/30 shadow-sm">
               <Cat className="w-20 h-20 text-[#FFB74D]" strokeWidth={2} />
            </div>
          </div>
        );
      case 'waiting':
        return (
           <div className="relative">
             <div className="absolute -top-4 -left-4 animate-pulse z-10">
                 <div className="bg-white px-4 py-2 rounded-2xl shadow-sm text-xs font-bold text-[#A1887F] border border-[#D7CCC8]">
                    Meow?
                 </div>
             </div>
             <div className="bg-[#F1F8E9] p-6 rounded-full ring-4 ring-[#DCEDC8]/30 shadow-sm">
                <Cat className="w-20 h-20 text-[#AED581]" strokeWidth={2} />
             </div>
           </div>
        );
      case 'happy':
        return (
            <div className="relative">
                <div className="absolute -top-4 left-0 animate-bounce">
                    <Music className="text-[#F48FB1] w-5 h-5" />
                </div>
                <div className="bg-[#FCE4EC] p-6 rounded-full ring-4 ring-[#F8BBD0]/30 shadow-sm">
                    <Cat className="w-20 h-20 text-[#F06292]" strokeWidth={2} />
                </div>
            </div>
        );
      case 'sleeping':
      default:
        return (
            <div className="relative">
                <div className="absolute -top-5 right-2 text-[#90CAF9] animate-pulse">
                    <Moon size={24} fill="currentColor" />
                </div>
                <div className="bg-[#E1F5FE] p-6 rounded-full ring-4 ring-[#B3E5FC]/30 shadow-sm">
                    <Cat className="w-20 h-20 text-[#64B5F6]" strokeWidth={2} />
                </div>
            </div>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center transition-all duration-500 ${className}`}>
      {getVisuals()}
    </div>
  );
};