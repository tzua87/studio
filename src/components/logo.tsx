import * as React from "react";

export const ShivaAILogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    {...props}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    {/* Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#grad1)" stroke="hsl(var(--border))" strokeWidth="2" />
    
    {/* Abstract 'S' Shape */}
    <path 
      d="M 65,25 C 65,20 55,20 50,25 C 45,30 45,40 50,45 C 55,50 55,60 50,65 C 45,70 35,80 35,75" 
      stroke="hsl(var(--primary-foreground))" 
      strokeWidth="8" 
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Abstract 'AI' dots */}
    <circle cx="38" cy="35" r="4" fill="hsl(var(--primary-foreground))" />
    <circle cx="62" cy="55" r="4" fill="hsl(var(--primary-foreground))" />
    <circle cx="62" cy="65" r="4" fill="hsl(var(--primary-foreground))" />

  </svg>
);
