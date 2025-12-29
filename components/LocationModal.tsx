import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationModalProps {
  onEnable: () => void;
  onSkip: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ onEnable, onSkip }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/20 backdrop-blur-sm animate-fadeIn overflow-y-auto py-8">
      <div className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-[32px] p-8 text-center relative overflow-hidden transform transition-all shadow-2xl border border-white/50">
        
        {/* Decor */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-30px] right-[-30px] w-32 h-32 bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-md ring-4 ring-yellow-50">
            <MapPin className="text-[#E76F51] w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-black text-[#264653] mb-3">Enable Live Tracking?</h2>
          <p className="text-[#8D6E63] mb-8 leading-relaxed font-medium">
            Anjani uses your GPS to automatically switch cards as you move from Andheri to MIDC.
          </p>
          
          <button 
            onClick={onEnable}
            className="w-full py-4 bg-[#F4A261] hover:bg-[#E76F51] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all mb-4 active:scale-95 text-lg"
          >
            Allow Location Access
          </button>
          
          <button 
            onClick={onSkip}
            className="text-sm font-bold text-[#BCAAA4] hover:text-[#8D6E63] transition-colors py-2 uppercase tracking-wide"
          >
            I'll swipe manually
          </button>
        </div>
      </div>
    </div>
  );
};