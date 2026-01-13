import React, { useState } from 'react';
import { PaymentData } from '../types';
import { BANK_FULL_NAMES } from '../constants';

interface PaymentCardProps {
  data: PaymentData;
  docId: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ data, docId }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (val: string) => {
    if (!val) return "0";
    const num = val.replace(/\D/g, "");
    return new Intl.NumberFormat('id-ID').format(parseInt(num || "0"));
  };

  const bankFullName = BANK_FULL_NAMES[data.bankName] || data.bankName;
  const biLogo = "https://images.seeklogo.com/logo-png/62/2/bank-indonesia-logo-png_seeklogo-622136.png";
  const gucciCircleLogo = "https://i.pinimg.com/474x/e1/0d/ce/e10dceda92f8f59945f6db8dbc8c928b.jpg";

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.bi.go.id`;

  return (
    <div 
      style={{ width: '1338px', height: '841px' }}
      className="luxury-card flex relative mx-auto select-none rounded-none border-[14px] border-[#111] shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)] overflow-hidden bg-white ring-[3px] ring-[#C0C0C0]"
    >
      <div className="absolute inset-0 border-[2px] border-[#C0C0C0]/50 pointer-events-none z-[100]"></div>
      
      <div className="absolute inset-0 gucci-pattern pointer-events-none"></div>
      <div className="gold-shimmer"></div>
      
      <div className="absolute left-0 top-0 bottom-0 w-2 gucci-stripe z-20"></div>

      <div className="w-[75%] flex flex-col p-8 relative z-10 pl-16">
        
        <div className="flex justify-between items-start mb-6 border-b border-[#D4AF37]/20 pb-6">
          <div className="flex flex-col">
            <h1 className="font-luxury text-[48px] font-black tracking-[0.45em] leading-none text-[#1a1a1a]">GUCCI</h1>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="h-[2px] w-10 bg-[#D4AF37]"></span>
              <p className="text-[10px] font-bold text-[#1a1a1a] tracking-[0.6em] uppercase opacity-70 font-heritage">PT. GRAHA CITRA PRIMA</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="h-12 w-[1px] bg-[#1a1a1a]/10"></div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="text-right">
                  <p className="text-[7px] font-black text-[#1a1a1a]/50 tracking-[0.3em] uppercase mb-0">ENCRYPTION</p>
                  <p className="text-[11px] font-bold text-[#004526] tracking-[0.15em] uppercase">SECURED PROTOCOL v4.0</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-white shadow-md">
                   <svg className="w-6 h-6 text-[#A50016]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                   </svg>
                </div>
              </div>
              <p className="text-[8px] font-mono font-bold text-[#1a1a1a]/40 uppercase tracking-[0.2em]">{docId}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-4 space-y-10">
          
          <div className="bg-[#fcfaf5] border border-[#D4AF37]/20 p-6 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-black text-[#D4AF37] tracking-[0.6em] uppercase block">Nama Bank</span>
                <div className="flex items-center gap-5">
                  <div className="h-10 w-1.5 bg-[#A50016]"></div>
                  <h4 className="text-[32px] font-heritage font-bold text-[#1a1a1a] tracking-tight leading-none uppercase">{bankFullName}</h4>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[9px] font-black text-[#1a1a1a]/50 tracking-[0.4em] uppercase block mb-2">Transaction Status</span>
                <div className="flex items-center gap-3 bg-[#1a1a1a] px-6 py-2.5 shadow-xl border border-[#D4AF37]/50">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004526] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#004526]"></span>
                  </span>
                  <span className="text-[#D4AF37] text-[12px] font-black tracking-[0.5em] uppercase">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="text-center mb-3">
              <span className="text-[10px] font-black text-[#A50016] tracking-[0.8em] uppercase italic opacity-60">NOMOR REKENING PEMBAYARAN</span>
            </div>
            
            <div 
              onClick={() => copyToClipboard(data.accountNumber)}
              className="cursor-pointer bg-[#0c0c0c] py-12 px-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all hover:bg-black active:scale-[0.99] relative overflow-hidden border-y-[2px] border-[#D4AF37]/60"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D4AF37]/40"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]/40"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4AF37]/40"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4AF37]/40"></div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] translate-x-[-120%] group-hover:translate-x-[250%] transition-transform duration-[1.5s]"></div>
              
              <h2 className="text-[38px] font-bold tracking-[0.2em] text-white leading-none tabular-nums text-center relative z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] font-heritage break-all">
                 {data.accountNumber.match(/.{1,4}/g)?.join(' ') || data.accountNumber}
              </h2>
              
              <div className={`absolute inset-0 bg-[#004526] flex items-center justify-center transition-all duration-400 z-20 ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <span className="text-white font-heritage text-2xl tracking-[0.6em] font-bold uppercase">Copied Successfully</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
             <div className="border border-[#1a1a1a]/10 p-6 bg-[#f9f9f9] shadow-inner relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#A50016]"></div>
               <span className="text-[10px] font-black text-[#1a1a1a]/50 tracking-[0.5em] uppercase block mb-3">Nama Penerima</span>
               <h3 className="text-[32px] font-bold text-[#1a1a1a] uppercase tracking-tighter leading-none truncate font-luxury">{data.accountName || 'UNDEFINED'}</h3>
             </div>
             <div className="border border-[#D4AF37]/20 p-6 bg-[#fcfaf5] shadow-inner relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37]"></div>
               <span className="text-[10px] font-black text-[#1a1a1a]/50 tracking-[0.5em] uppercase block mb-3">Jumlah Pembayaran</span>
               <div className="flex items-baseline gap-4">
                 <span className="text-[18px] font-heritage text-[#D4AF37] font-bold">IDR</span>
                 <h3 className="text-[52px] font-black text-[#1a1a1a] tracking-tighter leading-none tabular-nums">{formatCurrency(data.amount)}</h3>
               </div>
             </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-8 bg-[#fdfbf7] border border-[#D4AF37]/30 p-5 relative overflow-hidden shadow-xl ring-1 ring-black/5">
          <div className="flex-shrink-0 flex flex-col items-center relative z-10">
             <div className="bi-seal w-28 h-28 rounded-full flex items-center justify-center border-[4px] border-[#D4AF37] p-5 mb-2 shadow-lg bg-white overflow-hidden transition-transform duration-700 hover:rotate-12">
                <img 
                  src={biLogo} 
                  alt="Bank Indonesia Seal" 
                  className="w-20 object-contain" 
                />
             </div>
             <div className="bg-[#A50016] px-5 py-2 shadow-md border border-white/20">
               <span className="text-[8px] font-black text-white uppercase tracking-[0.5em]">RESMI & DIAWASI</span>
             </div>
          </div>

          <div className="flex-1 border-l border-[#D4AF37]/30 pl-8 py-2 relative z-10">
            <h5 className="text-[14px] font-black text-[#1a1a1a] tracking-[0.5em] uppercase mb-2 flex items-center gap-3">
              <span className="w-3 h-3 bg-[#004526] rounded-full ring-4 ring-[#004526]/10"></span>
              PENGAWASAN BANK INDONESIA
            </h5>
            <p className="text-[13px] text-[#111] leading-relaxed font-bold italic text-justify opacity-95 font-luxury">
              "Seluruh rangkaian transaksi keuangan melalui kanal pembayaran <span className="text-[#004526] font-extrabold underline decoration-[#D4AF37] decoration-2 underline-offset-4">GUCCI Heritage Private</span> telah melalui otentikasi standar Indonesia dan secara resmi berada di bawah pengawasan ketat <span className="text-[#A50016] font-extrabold border-b-2 border-[#A50016] pb-0.5">Bank Indonesia</span> guna menjamin keamanan aset serta integritas transaksi bagi nasabah eksklusif."
            </p>
          </div>

          <div className="flex-shrink-0 bg-white p-3 border-2 border-[#D4AF37]/30 shadow-lg relative overflow-hidden flex items-center justify-center min-w-[110px] min-h-[110px] group transition-all hover:border-[#D4AF37] z-10">
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#D4AF37] rotate-45 flex items-center justify-center text-white text-[9px] font-black z-20 shadow-md">BI</div>
            <img 
              src={qrCodeUrl}
              alt="Payment Barcode"
              className="w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-700 relative z-10"
            />
          </div>
        </div>
      </div>

      <div className="w-[25%] h-full relative overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center p-6 border-l border-[#D4AF37]/30 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0">
           <img 
            src="https://spyro-soft.com/wp-content/uploads/2023/11/image-woman-call-to-bank-1.jpg" 
            className="w-full h-full object-cover brightness-[0.8] contrast-[1.1] saturate-[1.2]"
            alt="Banking Customer Service Visual"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center w-full">
          <div className="w-48 h-48 border-[6px] border-[#D4AF37]/50 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#AA771C] via-[#D4AF37] to-[#AA771C] mb-8 shadow-[0_0_120px_rgba(212,175,55,0.4)] relative p-1.5 group">
             <div className="absolute inset-0 rounded-full bg-[#1a1a1a] z-0"></div>
             <img 
               src={gucciCircleLogo} 
               alt="Gucci Emblem" 
               className="w-full h-full object-cover rounded-full z-10"
             />
          </div>
          
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8 opacity-60"></div>
          
          <div className="space-y-4 w-full px-2">
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#D4AF37] text-[16px] font-heritage tracking-[0.4em] uppercase font-bold drop-shadow-lg">Authentic</p>
              <div className="flex items-center justify-center gap-4">
                <span className="w-8 h-[1px] bg-white/30"></span>
                <p className="text-white text-[22px] font-bold tracking-[0.1em] uppercase font-luxury leading-none drop-shadow-2xl">Settlement</p>
                <span className="w-8 h-[1px] bg-white/30"></span>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/20 mx-auto max-w-[200px]">
              <p className="text-white/60 text-[10px] font-black tracking-[0.15em] uppercase leading-tight italic drop-shadow-md">
                SECURED ACCESS PROTOCOLS INITIATED.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-8 text-center opacity-50">
           <div className="flex justify-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
           </div>
           <p className="text-white text-[9px] font-medium tracking-[0.25em] leading-relaxed uppercase">
             © 2025 Guccio Gucci S.p.A.
           </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;