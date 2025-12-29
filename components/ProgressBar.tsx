import React from 'react';
import { JOURNEY_STEPS } from '../constants';

interface ProgressBarProps {
  currentStepIndex: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStepIndex }) => {
  const progressPercentage = Math.min(
    100,
    (currentStepIndex / (JOURNEY_STEPS.length - 1)) * 100
  );

  return (
    <div className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm sticky top-0 z-20 border-b border-yellow-100">
      <div className="flex justify-between mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
        <span>Start</span>
        <span>Progress</span>
        <span>End</span>
      </div>
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-yellow-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};