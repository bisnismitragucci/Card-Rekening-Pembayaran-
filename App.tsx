
import React, { useState, useRef, useEffect } from 'react';
import { PaymentData } from './types';
import { INITIAL_DATA } from './constants';
import PaymentCard from './components/PaymentCard';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [data, setData] = useState<PaymentData>(INITIAL_DATA);
  const [zoomScale, setZoomScale] = useState(0.58); 
  const [showSidebar, setShowSidebar] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentDocId, setCurrentDocId] = useState('');

  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'GC-';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    result += `-${Date.now().toString().slice(-4)}`;
    return result;
  };

  useEffect(() => {
    setCurrentDocId(generateRandomId());
  }, []);

  const handleOpenRender = () => {
    setCurrentDocId(generateRandomId());
    setIsFullScreen(true);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleAutoFit = () => {
    if (!containerRef.current || isFullScreen) return;
    const padding = 120;
    const containerWidth = containerRef.current.clientWidth - padding;
    const containerHeight = containerRef.current.clientHeight - padding;
    
    const scaleX = containerWidth / 1338;
    const scaleY = containerHeight / 841;
    const newScale = Math.min(scaleX, scaleY, 0.9); 
    setZoomScale(newScale);
  };

  useEffect(() => {
    handleAutoFit();
    const timeout = setTimeout(handleAutoFit, 600); 
    window.addEventListener('resize', handleAutoFit);
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('resize', handleAutoFit);
      window.removeEventListener('keydown', handleEsc);
      clearTimeout(timeout);
    };
  }, [showSidebar, isFullScreen]);

  const handleDataChange = (field: keyof PaymentData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#080808] overflow-hidden text-white/80">
      
      {/* FULL RENDER OVERLAY */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-10 overflow-auto custom-scrollbar">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-10 pointer-events-none"></div>
          
          <button 
            onClick={() => setIsFullScreen(false)}
            className="fixed top-12 right-12 z-[1001] text-white/30 hover:text-white transition-all transform hover:rotate-90 p-5 border border-white/10 rounded-full bg-black/40 backdrop-blur-3xl"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="scale-[0.85] lg:scale-100 shadow-[0_0_200px_rgba(212,175,55,0.15)] transform transition-transform duration-700">
            <PaymentCard data={data} docId={currentDocId} />
          </div>
        </div>
      )}

      {/* LUXURY EDITOR HEADER */}
      <header className="w-full bg-[#111] border-b border-white/5 px-14 py-7 flex items-center justify-between z-[100] shadow-2xl">
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 overflow-hidden bg-gradient-to-br from-[#004526] to-[#A50016] rounded-full flex items-center justify-center border-2 border-white/10 shadow-lg">
                <img 
                  src="https://i.pinimg.com/474x/e1/0d/ce/e10dceda92f8f59945f6db8dbc8c928b.jpg" 
                  alt="G" 
                  className="w-full h-full object-cover"
                />
             </div>
             <div>
               <h1 className="text-[16px] font-heritage font-bold tracking-[0.5em] text-white">GUCCI</h1>
               <p className="text-[9px] text-white/30 tracking-[0.3em] font-black uppercase">Studio Otorisasi v4.0</p>
             </div>
          </div>
          
          <div className="h-12 w-[1px] bg-white/10"></div>

          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center gap-5 text-[11px] font-black tracking-[0.4em] text-white/50 uppercase hover:text-white transition-all group"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 transition-all ${showSidebar ? 'bg-white/10' : 'group-hover:bg-white/5'}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </div>
            Panel Editor
          </button>
        </div>

        {/* WORKSPACE CONTROLS */}
        <div className="flex items-center gap-14 px-12 py-4 bg-white/5 rounded-full border border-white/5 shadow-inner">
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Zoom Level</span>
            <input 
              type="range" min="0.3" max="1.0" step="0.01" 
              value={zoomScale} 
              onChange={(e) => setZoomScale(parseFloat(e.target.value))}
              className="w-56 accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-[12px] font-mono font-bold text-[#D4AF37] w-14 text-center">{Math.round(zoomScale * 100)}%</span>
          </div>
          <button onClick={handleAutoFit} className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] hover:text-[#D4AF37] transition-all border-b border-transparent hover:border-[#D4AF37] pb-1">Auto Fit</button>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={handleOpenRender}
            className="group px-14 py-4 bg-white text-black text-[12px] font-black uppercase tracking-[0.6em] transition-all hover:bg-[#D4AF37] hover:text-white shadow-2xl flex items-center gap-5"
          >
            Ekspor Aset Final
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR EDITOR */}
        <aside 
          className={`h-full overflow-y-auto bg-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] flex-shrink-0 z-20 border-r border-white/5 shadow-3xl ${showSidebar ? 'w-[480px] opacity-100' : 'w-0 opacity-0 -translate-x-full'}`}
        >
          <div className="p-14 w-[480px]">
            <ControlPanel data={data} onChange={handleDataChange} />
            
            <div className="mt-20 p-12 bg-white/[0.03] border-l-4 border-[#D4AF37] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="flex items-center gap-5 mb-6">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
                   <p className="text-[12px] text-[#D4AF37] uppercase tracking-[0.5em] font-black">Validasi Integritas</p>
                </div>
                <p className="text-[14px] text-white/40 leading-relaxed font-medium italic">
                  "Desain ini mematuhi standar identitas visual korporat Gucci dan regulasi pelaporan transaksi keuangan Bank Indonesia. Pastikan seluruh data akurat sebelum ekspor."
                </p>
            </div>
            
            <div className="mt-16 opacity-10 flex flex-col items-center">
               <div className="w-20 h-20 rounded-full overflow-hidden mb-4 grayscale">
                  <img src="https://i.pinimg.com/474x/e1/0d/ce/e10dceda92f8f59945f6db8dbc8c928b.jpg" alt="Logo" className="w-full h-full object-cover" />
               </div>
               <p className="text-[10px] tracking-[1.2em] uppercase text-white">Private Studio</p>
            </div>
          </div>
        </aside>

        {/* WORKSPACE CANVAS */}
        <main 
          ref={containerRef}
          className="flex-1 overflow-auto bg-[#060606] relative flex items-center justify-center p-24 custom-scrollbar transition-all duration-500"
        >
          {/* Ambient Lighting */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[1200px] h-[1200px] rounded-full bg-[#004526]/10 blur-[400px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] rounded-full bg-[#A50016]/5 blur-[400px] translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div 
            style={{ 
              transform: `scale(${zoomScale})`,
              transformOrigin: 'center center',
              transition: 'transform 0.9s cubic-bezier(0.2, 1, 0.2, 1)'
            }}
            className="flex-shrink-0"
          >
            <PaymentCard data={data} docId={currentDocId} />
          </div>
          
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-10 text-white/20 font-black text-[11px] tracking-[1em] uppercase bg-white/5 backdrop-blur-3xl px-16 py-6 border border-white/10 rounded-full shadow-2xl">
            <div className="flex gap-3">
               <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
            High-Fidelity Render: Gucci Heritage
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
