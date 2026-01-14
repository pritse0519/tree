import React, { useRef, useEffect } from 'react';
import { X, History, Sprout } from 'lucide-react';
import { LogEntry } from '../types';

interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: LogEntry[];
}

const LogModal: React.FC<LogModalProps> = ({ isOpen, onClose, logs }) => {
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when opened or logs change
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, logs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-sky-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-fredoka">
       <div className="bg-white/95 backdrop-blur rounded-[2rem] shadow-2xl border-4 border-white w-full max-w-lg h-[600px] flex flex-col animate-grow relative overflow-hidden">
          
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full z-0"></div>

          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 relative z-10">
            <h3 className="font-black text-slate-700 flex items-center gap-3 text-xl">
                <div className="bg-green-100 p-2.5 rounded-xl text-green-600 shadow-sm">
                    <History size={24} />
                </div> 
                森林日记
            </h3>
            <button 
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-500 transition-colors"
            >
                <X size={24} strokeWidth={3} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar relative z-10 bg-slate-50/50">
                {logs.length === 0 && (
                   <div className="text-center mt-20 opacity-50 flex flex-col items-center">
                       <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                          <Sprout size={48} className="text-slate-300"/>
                       </div>
                       <p className="text-slate-400 text-lg font-bold">日记本还空空的...</p>
                       <p className="text-slate-300 text-sm mt-1">快去照顾小树苗吧！</p>
                   </div>
                 )}
                 {logs.map((log) => (
                   <div key={log.id} className="text-sm animate-fade-in group">
                      <div className="flex gap-4">
                          <div className="flex flex-col items-center pt-2">
                              <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 ${log.type === 'growth' ? 'bg-yellow-400' : 'bg-slate-300'}`}></div>
                              <div className="w-0.5 h-full bg-slate-200 -mt-1 group-last:hidden rounded-full"></div>
                          </div>
                          <div className="pb-4 flex-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1.5 ml-1">
                                {log.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                            <div className={`
                                px-5 py-3 rounded-2xl rounded-tl-sm text-sm font-bold shadow-sm transition-transform hover:scale-[1.01]
                                ${log.type === 'growth' ? 'bg-yellow-50 text-yellow-700 border-2 border-yellow-100' : 
                                log.type === 'unlock' ? 'bg-purple-50 text-purple-700 border-2 border-purple-100' :
                                'bg-white text-slate-600 border-2 border-slate-100'}
                            `}>
                                {log.message}
                            </div>
                          </div>
                      </div>
                   </div>
                 ))}
                 <div ref={logsEndRef} />
          </div>
       </div>
    </div>
  );
};

export default LogModal;