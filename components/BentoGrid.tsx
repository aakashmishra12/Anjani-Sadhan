import React from 'react';
import { JourneyStep } from '../types';
import { 
  Cloud, 
  Ticket, 
  Info, 
  ShieldAlert, 
  Coffee, 
  Banknote, 
  Pill, 
  Search, 
  Zap, 
  Droplets, 
  ShieldCheck, 
  Phone,
  Baby,
  Wifi
} from 'lucide-react';

interface BentoGridProps {
  step: JourneyStep;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ step }) => {
  
  const getContextIcon = () => {
    switch (step.contextEssential.icon) {
      case 'weather': return <Cloud className="text-[#F4A261]" size={24} />;
      case 'ticket': return <Ticket className="text-[#F4A261]" size={24} />;
      case 'gate': return <Info className="text-[#F4A261]" size={24} />;
      default: return <Info className="text-[#F4A261]" size={24} />;
    }
  };

  // Helper to map essential text to icon and search query
  const getEssentialDetails = (item: string) => {
    const lower = item.toLowerCase();
    
    if (lower.includes('atm')) return { icon: <Banknote size={18} />, color: 'text-green-500', query: 'ATM' };
    if (lower.includes('chai') || lower.includes('cafe')) return { icon: <Coffee size={18} />, color: 'text-amber-700', query: 'Cafe' };
    if (lower.includes('medical') || lower.includes('pharmacy')) return { icon: <Pill size={18} />, color: 'text-red-500', query: 'Pharmacy' };
    if (lower.includes('washroom')) return { icon: <Droplets size={18} />, color: 'text-blue-500', query: 'Public Toilet Ladies' };
    if (lower.includes('police') || lower.includes('security')) return { icon: <ShieldCheck size={18} />, color: 'text-indigo-600', query: 'Police Station' };
    if (lower.includes('auto')) return { icon: <Search size={18} />, color: 'text-yellow-600', query: 'Auto Rickshaw Stand' };
    if (lower.includes('sanitary') || lower.includes('pads')) return { icon: <Baby size={18} />, color: 'text-pink-500', query: 'Chemist' };
    if (lower.includes('charging')) return { icon: <Zap size={18} />, color: 'text-yellow-500', query: '' };
    if (lower.includes('wifi')) return { icon: <Wifi size={18} />, color: 'text-sky-500', query: '' }; // Internal facility
    
    return { icon: <Search size={18} />, color: 'text-gray-500', query: item };
  };

  const handleEssentialClick = (item: string) => {
    const details = getEssentialDetails(item);
    if (details.query) {
      // Open Google Maps search near current location
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(details.query + ' near me')}`, '_blank');
    } else {
      alert("This is a facility available inside the station/train.");
    }
  };

  return (
    <div className="px-6">
       <div className="bg-[#FFF3E0] rounded-[28px] p-6 border-2 border-[#FFE0B2] shadow-sm">
          
          {/* Top Row: Context Info */}
          <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-orange-100">
                  {getContextIcon()}
              </div>
              <div className="flex-1">
                  <span className="block text-xs font-bold text-[#8D6E63] uppercase tracking-wide">{step.contextEssential.label}</span>
                  <span className="block text-xl font-black text-[#5D4037]">{step.contextEssential.value}</span>
              </div>
          </div>

          <h3 className="text-sm font-bold text-[#8D6E63] uppercase tracking-wider mb-3">Nearby Essentials</h3>

          {/* Grid of Clickable Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {step.essentials.map((item, idx) => {
              const details = getEssentialDetails(item);
              return (
                <button 
                  key={idx}
                  onClick={() => handleEssentialClick(item)}
                  className="flex flex-col items-center justify-center bg-white p-3 rounded-xl border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all active:scale-95 text-center h-24"
                >
                  <div className={`mb-2 ${details.color} bg-gray-50 p-2 rounded-full`}>
                    {details.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-600 leading-tight">
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* SOS Section */}
          <div className="pt-4 border-t border-[#FFE0B2]">
             <a 
               href="tel:103"
               className="flex items-center justify-between w-full bg-red-50 border border-red-100 hover:bg-red-100 p-4 rounded-xl transition-colors group"
             >
                <div className="flex items-center gap-3">
                   <div className="bg-red-500 text-white p-2 rounded-full animate-pulse">
                      <ShieldAlert size={20} />
                   </div>
                   <div className="text-left">
                      <span className="block text-sm font-black text-red-600 uppercase">Emergency Help</span>
                      <span className="block text-xs font-medium text-red-400">Direct Police Line (103)</span>
                   </div>
                </div>
                <div className="bg-white p-2 rounded-full text-red-500 shadow-sm group-hover:scale-110 transition-transform">
                   <Phone size={18} fill="currentColor" />
                </div>
             </a>
          </div>
       </div>
    </div>
  );
};