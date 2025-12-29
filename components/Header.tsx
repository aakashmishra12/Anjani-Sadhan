import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-6 pt-12">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 lowercase">anjani sadhan</h1>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live</span>
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFD700]"></span>
        </div>
      </div>
    </header>
  );
};