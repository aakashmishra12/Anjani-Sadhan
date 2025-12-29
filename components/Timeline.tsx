import React, { useRef, useEffect } from 'react';
import { JourneyStep } from '../types';
import { PawPrint } from 'lucide-react';

interface TimelineProps {
  steps: JourneyStep[];
  currentStepIndex: number;
  onStepSelect: (index: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, currentStepIndex, onStepSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.children[currentStepIndex] as HTMLElement;
      if (activeElement) {
        const container = containerRef.current;
        const scrollLeft = activeElement.offsetLeft - (container.clientWidth / 2) + (activeElement.clientWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [currentStepIndex]);

  return (
    <div className="px-6 pb-2 pt-2">
      <div className="flex justify-between items-end mb-4 px-1">
        <div>
          <h3 className="font-extrabold text-[#5D4037] text-xl tracking-tight leading-none">Your usual way, just a little safer.</h3>
          <p className="text-xs font-semibold text-[#A1887F] mt-1">
            Andheri to MIDC
          </p>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="flex space-x-3 overflow-x-auto no-scrollbar pt-12 pb-6 px-1 snap-x scroll-smooth"
      >
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isPast = index < currentStepIndex;
          
          return (
            <button
              key={step.id}
              onClick={() => onStepSelect(index)}
              className={`
                relative flex flex-col items-start justify-end min-w-[9rem] h-32 transition-all duration-300 snap-center pb-5 flex-shrink-0
                ${isActive ? 'transform -translate-y-2 z-10' : 'z-0'}
              `}
            >
              {/* Background Container */}
              <div className={`
                absolute inset-0 rounded-[28px] overflow-hidden transition-all duration-300 shadow-sm border
                ${isActive 
                  ? 'bg-[#FFCC80] shadow-xl shadow-orange-200/60 border-transparent' 
                  : isPast
                    ? 'bg-[#F1F8E9] opacity-80 border-transparent'
                    : 'bg-white hover:bg-[#FAF9F6] border-gray-100'
                }
              `}>
                  {/* Full Height Faded Number */}
                  <div className={`absolute top-0 right-0 h-full w-full flex items-center justify-end pr-2 text-[7rem] font-black leading-none select-none z-0 transition-colors duration-300 overflow-hidden ${
                      isActive ? 'text-white opacity-25' : 'text-[#8D6E63] opacity-[0.05]'
                  }`}>
                    {index + 1}
                  </div>
              </div>

              {/* Active Indicator Paw */}
              {isActive && (
                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white border-2 border-[#FFB74D] rounded-full p-2 shadow-md z-30 animate-bounce">
                    <PawPrint size={20} className="text-[#FF9800]" fill="currentColor" />
                 </div>
              )}
              
              {/* Text Content */}
              <div className="relative z-10 px-4 w-full text-left">
                  <span className={`text-2xl font-black leading-none block break-words tracking-tight ${isActive ? 'text-white' : 'text-[#5D4037]'}`}>
                    {step.shortTitle}
                  </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};