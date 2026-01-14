import React, { useState } from 'react';
import { X, Award } from 'lucide-react';

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdopt: (name: string, duration: string) => void;
}

const AdoptionModal: React.FC<AdoptionModalProps> = ({ isOpen, onClose, onAdopt }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('永远');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdopt(name, duration);
    }
  };

  return (
    <div className="fixed inset-0 bg-sky-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-fredoka">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden animate-grow border-4 border-white">
        <div className="bg-sky-400 p-6 flex justify-between items-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white/20 p-2 rounded-xl">
                <Award size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-black text-white tracking-wide">领养你的守护树</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors text-white relative z-10">
            <X size={20} strokeWidth={3} />
          </button>
        </div>
        
        <div className="p-8">
          <p className="text-slate-600 mb-6 font-medium leading-relaxed bg-sky-50 p-4 rounded-2xl text-sm">
            哇！你的小树已经长成了宏伟的参天守护神！<br/>
            现在，给它起个好听的名字，让它成为你的专属守护者吧！✨
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">给小树起个名字</label>
              <input
                type="text"
                required
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-100 focus:border-sky-400 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium"
                placeholder="例如：轩轩小树..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">领养期限</label>
              <div className="relative">
                <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-5 py-3 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-100 focus:border-sky-400 outline-none bg-white font-bold text-slate-700 appearance-none"
                >
                    <option value="1 年">1 年</option>
                    <option value="10 年">10 年</option>
                    <option value="1 世纪">1 世纪</option>
                    <option value="永远">永远 & 守护</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-sky-400 hover:bg-sky-500 text-white font-black py-4 rounded-2xl shadow-[0_4px_0_rgb(14,165,233)] hover:shadow-[0_2px_0_rgb(14,165,233)] hover:translate-y-[2px] active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <Award size={24} strokeWidth={3} />
              确认领养
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionModal;