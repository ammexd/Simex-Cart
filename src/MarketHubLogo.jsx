import React from 'react';

export const MarketHubLogo = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://w3.org"
  >
    {/* Rounded Shopping Bag Body */}
    <path 
      d="M5 8.5C5 7.67157 5.67157 7 6.5 7H17.5C18.3284 7 19 7.67157 19 8.5V18.5C19 19.8807 17.8807 21 16.5 21H7.5C6.11929 21 5 19.8807 5 18.5V8.5Z" 
      fill="currentColor"
    />
    {/* Clean Curved Handle */}
    <path 
      d="M9 7V5.5C9 3.84315 10.3431 2.5 12 2.5C13.6569 2.5 15 3.84315 15 5.5V7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    {/* High-fidelity Checkmark */}
    <path 
      d="M9.5 14L11.25 15.75L14.75 11.25" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);
