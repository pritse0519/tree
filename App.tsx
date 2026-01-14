import React, { useState, useEffect, useRef } from 'react';
import { 
  GrowthStage, 
  TreeState, 
  LogEntry, 
  Item 
} from './types';
import { 
  MAX_LEVEL_PER_STAGE, 
  XP_THRESHOLDS, 
  STAGE_NAMES, 
  GAME_ITEMS 
} from './constants';
import TreeVisual from './components/TreeVisual';
import ProgressBar from './components/ProgressBar';
import AdoptionModal from './components/AdoptionModal';
import LogModal from './components/LogModal';
import { 
  Droplets, 
  Sprout, 
  FlaskConical, 
  Sparkles, 
  History, 
  Trophy, 
  Calendar,
  Lock,
  Download,
  Shell,
  Cloud,
  BookOpen
} from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [treeState, setTreeState] = useState<TreeState>({
    stage: GrowthStage.Seedling,
    level: 1,
    experience: 0,
    maxExperience: XP_THRESHOLDS[GrowthStage.Seedling][0],
    name: null,
    adopted: false,
    adoptionDate: null,
    adoptionDuration: null,
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isAdoptionModalOpen, setAdoptionModalOpen] = useState(false);
  const [isLogModalOpen, setLogModalOpen] = useState(false);
  const [lastActionTime, setLastActionTime] = useState<Record<string, number>>({});
  const [animating, setAnimating] = useState(false);

  // --- Helpers ---
  const addLog = (message: string, type: LogEntry['type'] = 'action') => {
    setLogs(prev => [
      ...prev.slice(-49), // Keep last 50
      {
        id: Date.now(),
        message,
        timestamp: new Date(),
        type
      }
    ]);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets size={24} strokeWidth={2.5} />;
      case 'Sprout': return <Sprout size={24} strokeWidth={2.5} />;
      case 'FlaskConical': return <FlaskConical size={24} strokeWidth={2.5} />;
      case 'Sparkles': return <Sparkles size={24} strokeWidth={2.5} />;
      default: return <Droplets size={24} />;
    }
  };

  const handleDownloadCertificate = () => {
    if (!treeState.adopted || !treeState.name) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 600;

    // Background - Light Blue Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#E0F2FE'); // sky-100
    gradient.addColorStop(1, '#BAE6FD'); // sky-200
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Decorative Stars and Shells drawn simply on canvas
    ctx.fillStyle = '#FEF3C7'; // Amber 100
    ctx.beginPath(); ctx.arc(50, 50, 30, 0, 2 * Math.PI); ctx.fill();
    ctx.beginPath(); ctx.arc(750, 550, 40, 0, 2 * Math.PI); ctx.fill();

    // Decorative Border
    ctx.strokeStyle = '#38BDF8'; // sky-400
    ctx.lineWidth = 15;
    ctx.lineJoin = 'round';
    ctx.strokeRect(30, 30, 740, 540);
    
    // Text Content
    ctx.fillStyle = '#0F172A'; // slate-900
    ctx.font = 'bold 48px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ 守护精灵树领养证书 ✨', 400, 120);

    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#475569'; // slate-600
    ctx.fillText('兹证明', 400, 180);

    // Tree Name
    ctx.font = 'bold 72px "Fredoka", sans-serif';
    ctx.fillStyle = '#0284C7'; // sky-600
    ctx.fillText(treeState.name, 400, 270);

    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('已被正式确认为星空森林的守护者', 400, 330);

    // Details Box
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(14, 165, 233, 0.2)';
    ctx.shadowBlur = 20;
    ctx.roundRect(200, 360, 400, 140, 20);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.font = '22px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'left';
    
    const adoptDate = treeState.adoptionDate || '未知日期';
    const adoptDuration = treeState.adoptionDuration || '永久';

    ctx.fillText(`📅 领养日期: ${adoptDate}`, 240, 415);
    ctx.fillText(`⏳ 守护期限: ${adoptDuration}`, 240, 465);

    // Footer
    ctx.font = 'italic 16px sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'center';
    ctx.fillText('Spirit Tree Guardian - Official Certification', 400, 560);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `领养证书_${treeState.name}.png`;
    link.href = dataUrl;
    link.click();
  };

  // --- Core Game Logic ---
  const handleUseItem = (item: Item) => {
    const now = Date.now();
    const lastUsed = lastActionTime[item.id] || 0;
    
    if (now - lastUsed < item.cooldownMs) return; 

    setLastActionTime(prev => ({ ...prev, [item.id]: now }));
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600); // Sync with CSS animation time

    addLog(`使用了 ${item.name}。经验 +${item.xpValue}`);

    setTreeState(prev => {
      let newXp = prev.experience + item.xpValue;
      let newLevel = prev.level;
      let newStage = prev.stage;
      let newMaxXp = prev.maxExperience;
      
      if (newXp >= prev.maxExperience) {
        if (newLevel < MAX_LEVEL_PER_STAGE) {
          newLevel++;
          newXp = newXp - prev.maxExperience;
          newMaxXp = XP_THRESHOLDS[newStage][newLevel - 1];
          addLog(`成长！达到了等级 ${newLevel}！`, 'growth');
        } else {
          if (newStage < GrowthStage.Towering) {
            newStage++;
            newLevel = 1;
            newXp = 0;
            newMaxXp = XP_THRESHOLDS[newStage][0];
            addLog(`进化！你的树现在是 ${STAGE_NAMES[newStage]}！`, 'growth');
          } else {
            newXp = prev.maxExperience;
          }
        }
      }

      return {
        ...prev,
        experience: newXp,
        level: newLevel,
        stage: newStage,
        maxExperience: newMaxXp,
      };
    });
  };

  const handleAdopt = (name: string, duration: string) => {
    setTreeState(prev => ({
      ...prev,
      adopted: true,
      name,
      adoptionDate: new Date().toLocaleDateString(),
      adoptionDuration: duration,
    }));
    setAdoptionModalOpen(false);
    addLog(`成功领养了 ${name}，期限：${duration}！`, 'unlock');
  };

  const isMaxedOut = treeState.stage === GrowthStage.Towering && treeState.level === MAX_LEVEL_PER_STAGE && treeState.experience >= treeState.maxExperience;

  // --- Render ---
  return (
    <div className="min-h-screen bg-sky-50 font-sans text-slate-700 p-4 md:p-8 relative overflow-hidden">
      
      {/* Decorative Background Clouds */}
      <Cloud className="cloud text-white absolute top-10 left-[-100px]" style={{width: '120px', height: '80px', animationDuration: '40s'}} fill="white" stroke="none" />
      <Cloud className="cloud text-white absolute top-32 left-[-200px]" style={{width: '200px', height: '120px', animationDuration: '60s', animationDelay: '5s'}} fill="white" stroke="none" />
      <Cloud className="cloud text-white absolute top-1/2 left-[-150px]" style={{width: '150px', height: '100px', animationDuration: '50s', animationDelay: '15s'}} fill="white" stroke="none" />

      {/* Main Container - Centered */}
      <div className="max-w-3xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Header Section with Log Button */}
        <div className="text-center mb-2 relative">
            <div className="inline-flex items-center justify-center gap-3 bg-white/70 backdrop-blur-sm px-8 py-4 rounded-[2rem] shadow-sm border-2 border-white relative z-20">
                <Shell className="text-sky-400 animate-pulse" size={36} fill="#E0F2FE" />
                <h1 className="text-3xl md:text-4xl font-black text-sky-900 tracking-tight drop-shadow-sm">
                   宋亚轩的守护精灵树
                </h1>
                <Sparkles className="text-yellow-400 animate-spin-slow" size={36} fill="#FEF3C7" />
            </div>
            
            {/* Log Button - Positioned absolutely on desktop, or simply in flow */}
            <button 
                onClick={() => setLogModalOpen(true)}
                className="absolute top-1/2 -translate-y-1/2 right-0 hidden md:flex items-center gap-2 bg-white hover:bg-green-50 text-slate-600 hover:text-green-600 px-4 py-2 rounded-full font-bold shadow-sm border-2 border-white transition-all transform hover:scale-105"
            >
                <BookOpen size={20} />
                <span>森林日记</span>
            </button>
            
            {/* Mobile Log Button (Visible only on small screens) */}
            <div className="md:hidden mt-4 flex justify-center">
                 <button 
                    onClick={() => setLogModalOpen(true)}
                    className="flex items-center gap-2 bg-white/80 hover:bg-white text-slate-600 px-4 py-2 rounded-full font-bold shadow-sm border border-white"
                >
                    <BookOpen size={18} />
                    <span>查看森林日记</span>
                </button>
            </div>

            <div className="mt-4">
                <p className="text-sky-600 font-bold bg-sky-100/50 inline-block px-4 py-1 rounded-full text-sm">
                    ✨ 在海螺岛种下希望，见证星辰的成长 ✨
                </p>
            </div>
        </div>

        {/* Tree Visual Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(14,165,233,0.2)] border-4 border-white overflow-hidden relative group transition-all duration-300 hover:shadow-[0_15px_50px_-10px_rgba(14,165,233,0.3)]">
            
            {/* Top Badges */}
            <div className="absolute top-6 left-6 z-10 flex gap-2">
                <div className="bg-sky-100/90 backdrop-blur rounded-full px-4 py-1.5 text-xs font-black text-sky-600 border-2 border-white shadow-sm">
                阶段 {treeState.stage + 1} / 4
                </div>
            </div>
            
            {treeState.adopted && (
               <div className="absolute top-6 right-6 z-10 bg-yellow-100/90 backdrop-blur rounded-full px-4 py-1.5 text-xs font-black text-yellow-700 border-2 border-white shadow-sm flex items-center gap-1 animate-bounce">
                 <Trophy size={14} fill="#B45309" /> 已领养
               </div>
            )}
            
            {/* Tree Visual Container */}
            <div className="bg-gradient-to-b from-sky-200/30 to-sky-50/30 pt-8 pb-4">
                <TreeVisual 
                stage={treeState.stage} 
                level={treeState.level} 
                isAnimating={animating}
                />
            </div>

            {/* Info Panel */}
            <div className="bg-white p-8 relative">
                {/* Curved separator */}
                <div className="absolute -top-6 left-0 w-full h-8 bg-white rounded-t-[2rem]"></div>
                
               <div className="text-center mb-6">
                   <h2 className="text-4xl font-black text-slate-800 mb-3">
                     {treeState.name ? treeState.name : STAGE_NAMES[treeState.stage]}
                   </h2>
                   <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full">
                     <span className="bg-sky-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">LV.{treeState.level}</span>
                     {treeState.adopted ? <span>守护着这片星空</span> : <span>正在努力吸收阳光...</span>}
                   </div>
               </div>
               
               <ProgressBar 
                  current={treeState.experience} 
                  max={treeState.maxExperience}
                  label="成长能量"
                  subLabel={isMaxedOut ? "能量已满" : "下一级"}
               />
            </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white/80 backdrop-blur rounded-[2rem] shadow-lg border-2 border-white p-8">
            <h3 className="text-xl font-black text-slate-700 mb-6 flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-xl text-purple-500">
                  <FlaskConical size={24} fill="#E9D5FF" /> 
              </div>
              <span>养护工具箱</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GAME_ITEMS.map((item) => {
                const isLocked = treeState.stage < item.unlockStage;
                const lastUsed = lastActionTime[item.id] || 0;
                const timeLeft = Math.max(0, item.cooldownMs - (Date.now() - lastUsed));
                const isCoolingDown = timeLeft > 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleUseItem(item)}
                    disabled={isLocked || isCoolingDown || isMaxedOut}
                    className={`
                      relative overflow-hidden group rounded-3xl p-4 transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-1
                      flex flex-col items-center justify-between min-h-[140px]
                      ${isLocked 
                        ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-60' 
                        : 'bg-white border-slate-100 hover:border-sky-200 hover:bg-sky-50 shadow-sm hover:shadow-md'
                      }
                    `}
                  >
                    {isLocked ? (
                       <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                          <Lock size={28} />
                          <span className="text-xs text-center font-bold">{STAGE_NAMES[item.unlockStage]}<br/>解锁</span>
                       </div>
                    ) : (
                      <>
                        <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                           {getIconComponent(item.icon)}
                        </div>
                        <div className="text-center mt-2">
                            <div className="font-extrabold text-slate-700 text-sm">{item.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 mt-1 inline-block">+{item.xpValue} XP</div>
                        </div>
                        
                        {/* Cooldown Overlay */}
                        {isCoolingDown && (
                          <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px] rounded-3xl z-10">
                             <span className="text-sm font-black text-slate-500 animate-pulse">{(timeLeft / 1000).toFixed(1)}s</span>
                          </div>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Endgame Action */}
            {isMaxedOut && !treeState.adopted && (
               <div className="mt-8 p-6 bg-amber-50 rounded-[2rem] border-2 border-amber-100 flex flex-col md:flex-row items-center justify-between gap-4 animate-bounce">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-100 p-3 rounded-full text-amber-500">
                        <Trophy size={28} fill="#FDE68A" />
                    </div>
                    <div>
                        <h4 className="font-black text-lg text-amber-800">树苗长大了！</h4>
                        <p className="text-sm text-amber-700 font-medium">它可以独当一面了，快来领养它吧。</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setAdoptionModalOpen(true)}
                    className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 text-white px-8 py-3 rounded-xl font-black text-lg shadow-[0_4px_0_rgb(217,119,6)] hover:shadow-[0_2px_0_rgb(217,119,6)] hover:translate-y-[2px] transition-all"
                  >
                    立即领养
                  </button>
               </div>
            )}
        </div>

        {/* Certificate (Only visible if adopted) */}
        {treeState.adopted && (
             <div className="bg-white rounded-[2rem] shadow-xl border-4 border-sky-200 p-8 text-center relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute -top-10 -right-10 text-sky-50 opacity-50 transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                    <Shell size={200} />
                </div>
                
                <div className="relative z-10">
                    <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                        <Trophy className="text-yellow-500" size={40} fill="#FDE68A" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">专属领养证书</h3>
                    <div className="w-16 h-2 bg-sky-200 mx-auto mb-6 rounded-full"></div>
                    
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">守护者</p>
                    <p className="text-4xl font-black text-sky-600 mb-8">{treeState.name}</p>
                    
                    <div className="bg-slate-50 p-6 rounded-3xl mb-6 border border-slate-100 grid grid-cols-2 gap-8">
                        <div className="text-center">
                            <span className="text-xs font-bold text-slate-400 flex items-center justify-center gap-1 mb-1"><Calendar size={14}/> 领养日期</span>
                            <span className="font-black text-slate-700 text-lg">{treeState.adoptionDate}</span>
                        </div>
                        <div className="text-center border-l border-slate-200">
                            <span className="text-xs font-bold text-slate-400 flex items-center justify-center gap-1 mb-1"><History size={14}/> 守护期限</span>
                            <span className="font-black text-slate-700 text-lg">{treeState.adoptionDuration}</span>
                        </div>
                    </div>

                    <button 
                    onClick={handleDownloadCertificate}
                    className="w-full sm:w-auto px-8 bg-sky-400 hover:bg-sky-500 text-white text-base font-bold py-4 rounded-xl inline-flex items-center justify-center gap-3 transition-all shadow-[0_4px_0_rgb(14,165,233)] hover:shadow-[0_2px_0_rgb(14,165,233)] hover:translate-y-[2px] active:scale-95 mx-auto"
                    >
                    <Download size={20} strokeWidth={3} /> 保存我的证书
                    </button>
                </div>
             </div>
        )}

      </div>

      <AdoptionModal 
        isOpen={isAdoptionModalOpen}
        onClose={() => setAdoptionModalOpen(false)}
        onAdopt={handleAdopt}
      />

      <LogModal 
        isOpen={isLogModalOpen}
        onClose={() => setLogModalOpen(false)}
        logs={logs}
      />
    </div>
  );
};

export default App;