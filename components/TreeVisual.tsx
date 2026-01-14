import React from 'react';
import { GrowthStage } from '../types';

interface TreeVisualProps {
  stage: GrowthStage;
  level: number;
  isAnimating: boolean;
}

const TreeVisual: React.FC<TreeVisualProps> = ({ stage, level, isAnimating }) => {
  const scaleClass = isAnimating ? 'animate-grow' : 'animate-float';
  
  // Calculate a slight scale increase based on level (1 or 2)
  const sizeScale = 1 + (level - 1) * 0.15;

  // Custom SVG Illustrations for a "Cute/Concrete" style
  const renderTree = () => {
    switch (stage) {
      case GrowthStage.Seedling:
        return (
          <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-xl" style={{ transform: `scale(${sizeScale})` }}>
            {/* Pot */}
            <path d="M60 140 L 50 110 L 150 110 L 140 140 Q 140 160 100 160 Q 60 160 60 140" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="3"/>
            <path d="M50 110 L 150 110" stroke="#8D6E63" strokeWidth="3" fill="none"/>
            {/* Soil */}
            <ellipse cx="100" cy="110" rx="45" ry="10" fill="#5D4037" />
            {/* Stem */}
            <path d="M100 110 Q 100 90 100 80" stroke="#81C784" strokeWidth="6" fill="none" strokeLinecap="round"/>
            {/* Leaves */}
            <path d="M100 80 Q 80 60 60 70 Q 80 90 100 80" fill="#66BB6A" stroke="#388E3C" strokeWidth="2"/>
            <path d="M100 80 Q 120 60 140 70 Q 120 90 100 80" fill="#66BB6A" stroke="#388E3C" strokeWidth="2"/>
            {/* Cute Face on Pot */}
            <circle cx="85" cy="135" r="4" fill="#5D4037"/>
            <circle cx="115" cy="135" r="4" fill="#5D4037"/>
            <path d="M95 140 Q 100 145 105 140" stroke="#5D4037" strokeWidth="2" fill="none"/>
            {/* Cheeks */}
            <circle cx="75" cy="138" r="5" fill="#FFAB91" opacity="0.6"/>
            <circle cx="125" cy="138" r="5" fill="#FFAB91" opacity="0.6"/>
          </svg>
        );
      
      case GrowthStage.Sapling:
        return (
          <svg viewBox="0 0 200 200" className="w-56 h-56 drop-shadow-2xl" style={{ transform: `scale(${sizeScale})` }}>
            {/* Ground */}
            <ellipse cx="100" cy="170" rx="60" ry="15" fill="#C5E1A5" />
            {/* Trunk */}
            <path d="M90 170 L 95 100 L 105 100 L 110 170 Z" fill="#8D6E63" />
            {/* Foliage - multiple circles for fluffiness */}
            <circle cx="80" cy="90" r="30" fill="#66BB6A" />
            <circle cx="120" cy="90" r="30" fill="#66BB6A" />
            <circle cx="100" cy="60" r="35" fill="#81C784" />
            <circle cx="100" cy="80" r="30" fill="#4CAF50" opacity="0.3" /> {/* Shadow detail */}
            
            {/* Decor: A small shell? */}
            <path d="M70 160 Q 75 155 80 160 L 70 160" fill="#B3E5FC" stroke="#0288D1" strokeWidth="1"/>
            
             {/* Cute Face on Trunk */}
             <circle cx="96" cy="140" r="2" fill="#3E2723"/>
            <circle cx="104" cy="140" r="2" fill="#3E2723"/>
            <path d="M98 143 Q 100 145 102 143" stroke="#3E2723" strokeWidth="1" fill="none"/>
          </svg>
        );

      case GrowthStage.Flowering:
        return (
          <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-2xl" style={{ transform: `scale(${sizeScale})` }}>
            {/* Ground */}
            <ellipse cx="100" cy="180" rx="70" ry="20" fill="#AED581" />
            {/* Trunk */}
            <path d="M85 180 Q 80 140 90 110 L 110 110 Q 120 140 115 180 Z" fill="#795548" />
            {/* Foliage */}
            <circle cx="70" cy="100" r="40" fill="#81C784" />
            <circle cx="130" cy="100" r="40" fill="#81C784" />
            <circle cx="100" cy="60" r="50" fill="#66BB6A" />
            <circle cx="60" cy="70" r="35" fill="#66BB6A" />
            <circle cx="140" cy="70" r="35" fill="#66BB6A" />
            
            {/* Flowers */}
            <g className="animate-pulse">
                <circle cx="70" cy="70" r="8" fill="#F48FB1" />
                <circle cx="70" cy="70" r="3" fill="#FFF" />
                
                <circle cx="130" cy="60" r="10" fill="#F48FB1" />
                <circle cx="130" cy="60" r="4" fill="#FFF" />

                <circle cx="100" cy="40" r="9" fill="#F06292" />
                <circle cx="100" cy="40" r="3" fill="#FFF" />
                
                <circle cx="140" cy="90" r="7" fill="#F8BBD0" />
            </g>
            
            {/* Song Yaxuan Element: Tiny blue stars */}
            <path d="M100 80 L 102 85 L 107 85 L 103 88 L 105 93 L 100 90 L 95 93 L 97 88 L 93 85 L 98 85 Z" fill="#4FC3F7" />
          </svg>
        );

      case GrowthStage.Towering:
        return (
          <svg viewBox="0 0 200 200" className="w-72 h-72 drop-shadow-2xl" style={{ transform: `scale(${sizeScale})` }}>
             {/* Glow */}
             <circle cx="100" cy="90" r="90" fill="url(#blueGlow)" opacity="0.5" />
             <defs>
               <radialGradient id="blueGlow" cx="0.5" cy="0.5" r="0.5">
                 <stop offset="0%" stopColor="#E1F5FE" />
                 <stop offset="100%" stopColor="transparent" />
               </radialGradient>
             </defs>

            {/* Roots/Ground */}
            <path d="M60 180 Q 80 160 100 160 Q 120 160 140 180" fill="#5D4037" />
            
            {/* Trunk */}
            <path d="M75 180 Q 70 120 80 90 L 120 90 Q 130 120 125 180 Z" fill="#5D4037" />
            <path d="M80 90 L 60 70" stroke="#5D4037" strokeWidth="8" strokeLinecap="round"/>
            <path d="M120 90 L 140 70" stroke="#5D4037" strokeWidth="8" strokeLinecap="round"/>

            {/* Canopy - Big and Cloud-like */}
            <path d="M50 80 Q 20 80 20 50 Q 20 20 50 20 Q 80 0 100 10 Q 120 0 150 20 Q 180 20 180 50 Q 180 80 150 80 Q 120 100 80 100 Q 50 100 50 80" fill="#4DB6AC" />
            <path d="M60 70 Q 30 70 30 50 Q 30 30 60 30" fill="#80CBC4" opacity="0.5" /> {/* Highlight */}

            {/* Decorations: Shells and Stars */}
            <g className="animate-bounce">
                {/* Shell */}
                <path d="M60 50 Q 65 40 70 50 L 60 50" fill="#FFF" stroke="#29B6F6" strokeWidth="2" transform="rotate(-20 60 50)"/>
            </g>
            <g className="animate-pulse">
                <path d="M140 40 L 142 45 L 147 45 L 143 48 L 145 53 L 140 50 L 135 53 L 137 48 L 133 45 L 138 45 Z" fill="#FFEB3B" />
                <path d="M100 30 L 103 38 L 111 38 L 105 43 L 108 51 L 100 46 L 92 51 L 95 43 L 89 38 L 97 38 Z" fill="#FFEB3B" />
            </g>
            
            {/* Hanging vines */}
            <path d="M70 90 Q 70 110 60 120" stroke="#80CBC4" strokeWidth="3" fill="none" />
            <path d="M130 90 Q 130 115 140 125" stroke="#80CBC4" strokeWidth="3" fill="none" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`h-80 w-80 flex items-center justify-center relative ${scaleClass} transition-transform duration-700`}>
       {renderTree()}
    </div>
  );
};

export default TreeVisual;