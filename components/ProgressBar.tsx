import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  colorClass?: string;
  label?: string;
  subLabel?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  max, 
  colorClass = "bg-sky-400",
  label,
  subLabel
}) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className="w-full mb-4 font-fredoka">
      {(label || subLabel) && (
        <div className="flex justify-between mb-2 px-1">
          {label && <span className="text-base font-bold text-slate-600 tracking-wide">{label}</span>}
          {subLabel && <span className="text-sm font-semibold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full">{subLabel}</span>}
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-6 p-1 box-border shadow-inner border border-slate-200">
        <div
          className={`${colorClass} h-full rounded-full transition-all duration-500 ease-out bg-stripe relative overflow-hidden flex items-center justify-end pr-2`}
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-20 rounded-t-full"></div>
        </div>
      </div>
      <div className="text-xs font-bold text-right text-slate-400 mt-1.5 px-1">
        {Math.floor(current)} / {max} XP
      </div>
    </div>
  );
};

export default ProgressBar;