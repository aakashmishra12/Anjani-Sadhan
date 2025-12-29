import React from 'react';

export const AnjaniLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft Pastel Peach Background */}
      <circle cx="50" cy="50" r="48" fill="#FFE0B2" stroke="#FFF3E0" strokeWidth="2" />

      {/* Ears - Soft Brown/Pink */}
      <path d="M28 38L28 28C28 28 38 28 38 38" stroke="#8D6E63" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M72 38L72 28C72 28 62 28 62 38" stroke="#8D6E63" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Face Base - White for contrast and cleanliness */}
      <rect x="25" y="38" width="50" height="42" rx="20" fill="#FFFFFF" />

      {/* Cheeks - Soft Pink */}
      <circle cx="35" cy="62" r="5" fill="#FFCDD2" opacity="0.8" />
      <circle cx="65" cy="62" r="5" fill="#FFCDD2" opacity="0.8" />

      {/* Eyes - Friendly Dark Brown */}
      <circle cx="40" cy="54" r="3.5" fill="#5D4037" />
      <circle cx="60" cy="54" r="3.5" fill="#5D4037" />

      {/* Nose/Mouth - Cute Pink */}
      <path d="M47 65Q50 68 53 65" stroke="#E57373" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 62L50 65" stroke="#E57373" strokeWidth="2.5" strokeLinecap="round" />

      {/* Whiskers - Light Grey/Brown */}
      <path d="M28 58L18 56" stroke="#BCAAA4" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 64L18 66" stroke="#BCAAA4" strokeWidth="2" strokeLinecap="round" />
      <path d="M72 58L82 56" stroke="#BCAAA4" strokeWidth="2" strokeLinecap="round" />
      <path d="M72 64L82 66" stroke="#BCAAA4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};