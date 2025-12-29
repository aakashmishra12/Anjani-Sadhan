import React, { useState } from 'react';
import { JourneyStep } from '../types';
import { getIcon } from '../constants';
import { CheckCircle2, ChevronDown, ChevronUp, Banknote, Pill, Coffee, Lightbulb } from 'lucide-react';

interface JourneyCardProps {
  step: JourneyStep;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: (id: number) => void;
  isLast: boolean;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({
  step,
  isActive,
  isCompleted,
  onSelect,
  isLast
}) => {
  const [showEssentials, setShowEssentials] = useState(false);

  const getEssentialIcon = (type: string) => {
    switch (type) {
      case 'ATM': return <Banknote size={16} />;
      case 'Medical': return <Pill size={16} />;
      case 'Chai': return <Coffee size={16} />;
      default: return null;
    }
  };

  return (
    <div className="relative mb-6">
       {/* Connector Line */}
      {!isLast && (
        <div className={`absolute left-8 top-16 bottom-[-24px] w-1 z-0 ${isCompleted ? 'bg-yellow-400' : 'bg-gray-200'}`} />
      )}

      <div
        onClick={() => onSelect(step.id)}
        className={`relative z-10 flex flex-col p-5 rounded-[20px] cursor-pointer transition-all duration-300 shadow-sm border-2
          ${isActive 
            ? 'bg-white border-yellow-400 scale-[1.02] shadow-md' 
            : isCompleted 
              ? 'bg-yellow-50 border-yellow-200 opacity-90' 
              : 'bg-white border-transparent'
          }
        `}
      >
        <div className="flex items-start gap-4">
          {/* Icon Circle */}
          <div className={`
            flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
            ${isActive ? 'bg-yellow-500 text-white' : isCompleted ? 'bg-yellow-200 text-yellow-700' : 'bg-gray-100 text-gray-400'}
          `}>
            {isCompleted && !isActive ? <CheckCircle2 size={24} /> : getIcon(step.iconType, "w-6 h-6")}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className={`text-lg font-bold mb-1 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{step.description}</p>
            
            {/* Active State Details */}
            {isActive && (
              <div className="mt-3 animate-fadeIn">
                <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 mb-3">
                  <div className="flex items-start gap-2 text-yellow-800">
                    <Lightbulb size={18} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium italic">"{step.proTip}"</p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEssentials(!showEssentials);
                  }}
                  className="flex items-center justify-between w-full p-2 text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span>Essentials Nearby</span>
                  {showEssentials ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showEssentials && (
                  <div className="flex gap-3 mt-3 ml-1 animate-slideDown">
                    {step.essentials.map((ess) => (
                      <div key={ess} className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-500 shadow-sm">
                          {getEssentialIcon(ess)}
                        </div>
                        <span className="text-[10px] font-medium text-gray-500">{ess}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};