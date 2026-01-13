import React, { useState, useRef, useEffect } from 'react';
import { PaymentData } from './types';
import { INITIAL_DATA } from './constants';
import PaymentCard from './components/PaymentCard';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [data, setData] = useState<PaymentData>(INITIAL_DATA);
  const [zoomScale, setZoomScale] = useState(0.55); 
  const [showSidebar, setShowSidebar] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentDocId, setCurrentDocId] = useState('');

  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'GC-';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    result += `-${Date.now().toString().slice(-4)}`;
    return result;
  };

  useEffect(() => {
    setCurrentDocId(generateRandomId());
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleAutoFit = () => {
    if (!containerRef.current) return;
    // Berikan ruang ekstra (200px) untuk elemen UI lain agar tidak tumpang tindih
    const padding = 200;
    const containerWidth = containerRef.current.clientWidth - padding;
    const containerHeight = containerRef.current.clientHeight - padding;
    
    const scaleX = containerWidth / 1338;
    const scaleY = containerHeight / 841;
    const newScale = Math.min(scaleX, scaleY, 0.85); 
    setZoomScale(newScale);
  };

  useEffect(() => {
    handleAutoFit();
    const timeout = setTimeout(handleAutoFit, 600); 
    window.addEventListener('resize', handleAutoFit);
    return () => {
      window.removeEventListener('resize', handleAutoFit);
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
          <button 
            onClick={() => setIsFullScreen(false)}
            className="fixed top-10 right-10 z-[1001] text-white/50 hover:text-white p-4 border border-white/10 rounded-full bg-black/50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div className="scale-[0.8] lg:scale-100 transition-transform duration-700">
            <PaymentCard data={data} docId={currentDocId} />
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="w-full bg-[#111] border-b border-white/5 px-10 py-6 flex items-center justify-between z-[100]">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 overflow-hidden bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <img src="https://i.pinimg.com/474x/e1/0d/ce/e10dceda92f8f59945f6db8dbc8c928b.jpg" alt="G" className="w-full h-full object-cover" />
             </div>
             <div>
               <h1 className="text-[14px] font-heritage font-bold tracking-[0.4em] text-white">GUCCI</h1>
               <p className="text-[8px] text-white/30 tracking-[0.2em] font-black uppercase">Studio Otorisasi v4.0</p>
             </div>
          </div>
          <div className="h-10 w-[1px] bg-white/10"></div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase hover:text-white transition-all">Panel Editor</button>
        </div>

        <div className="flex items-center gap-10 px-10 py-3 bg-white/5 rounded-full border border-white/5">
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Zoom</span>
            <input type="range" min="0.3" max="1.0" step="0.01" value={zoomScale} onChange={(e) => setZoomScale(parseFloat(e.target.value))} className="w-40 accent-[#D4AF37]" />
            <span className="text-[11px] font-mono text-[#D4AF37]">{Math.round(zoomScale * 100)}%</span>
          </div>
          <button onClick={handleAutoFit} className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hover:text-[#D4AF37]">Auto Fit</button>
        </div>

        <button onClick={() => setIsFullScreen(true)} className="px-10 py-3 bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#D4AF37] hover:text-white transition-all">Ekspor Aset</button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        <aside className={`h-full overflow-y-auto bg-[#0a0a0a] transition-all duration-500 flex-shrink-0 z-20 border-r border-white/5 ${showSidebar ? 'w-[450px]' : 'w-0 opacity-0 -translate-x-full'}`}>
          <div className="p-10 w-[450px]">
            <ControlPanel data={data} onChange={handleDataChange} />
          </div>
        </aside>

        {/* WORKSPACE */}
        <main ref={containerRef} className="flex-1 overflow-auto bg-[#060606] relative flex items-center justify-center p-20 custom-scrollbar">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#004526]/5 blur-[300px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-[#A50016]/5 blur-[300px] translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div 
            style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
            className="flex-shrink-0 shadow-2xl transition-transform duration-300"
          >
            <PaymentCard data={data} docId={currentDocId} />
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-8 text-white/30 font-black text-[10px] tracking-[0.8em] uppercase bg-black/40 backdrop-blur-xl px-12 py-5 border border-white/5 rounded-full z-50">
            <div className="flex gap-2">
               <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
            High-Fidelity Render
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;