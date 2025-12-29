import React from 'react';
import { Timer } from 'lucide-react';

interface FooterProps {
  minutesRemaining: number;
}

export const Footer: React.FC<FooterProps> = ({ minutesRemaining }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-6 py-4 z-30 pb-safe">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Current Status</p>
          <div className="flex items-center gap-2 text-gray-800">
            <Timer className="text-yellow-500" size={20} />
            <h2 className="text-xl font-bold">
              {minutesRemaining > 0 ? `${minutesRemaining} mins to go` : "You've arrived!"}
            </h2>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-xl">🚀</span>
        </div>
      </div>
    </div>
  );
};