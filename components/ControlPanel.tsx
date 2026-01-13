
import React from 'react';
import { PaymentData } from '../types';

interface ControlPanelProps {
  data: PaymentData;
  onChange: (field: keyof PaymentData, value: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white p-12 border border-[#f0f0f0] shadow-2xl rounded-none">
      <div className="flex items-center gap-5 mb-14">
        <div className="w-2.5 h-10 bg-[#004526]"></div>
        <h2 className="text-[14px] font-black text-[#1a1a1a] uppercase tracking-[0.5em]">
          Settlement Editor
        </h2>
      </div>
      
      <div className="space-y-10">
        <div className="group">
          <label className="block text-[10px] font-black text-[#999] uppercase tracking-[0.3em] mb-4 group-focus-within:text-[#D4AF37] transition-colors">Pilih Institusi Perbankan</label>
          <div className="relative">
            <select 
              value={data.bankName}
              onChange={(e) => onChange('bankName', e.target.value)}
              className="w-full p-5 border-b-2 border-[#eee] bg-transparent text-[15px] font-bold text-[#1a1a1a] focus:border-[#D4AF37] outline-none transition-all appearance-none rounded-none cursor-pointer"
            >
              <option value="BNI">BANK NEGARA INDONESIA (BNI)</option>
              <option value="BRI">BANK RAKYAT INDONESIA (BRI)</option>
              <option value="BCA">BANK CENTRAL ASIA (BCA)</option>
              <option value="MANDIRI">BANK MANDIRI (MANDIRI)</option>
              <option value="DANAMON">BANK DANAMON INDONESIA (DANAMON)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="group">
          <label className="block text-[10px] font-black text-[#999] uppercase tracking-[0.3em] mb-4 group-focus-within:text-[#D4AF37] transition-colors">Nama Pemegang Rekening</label>
          <input 
            type="text"
            value={data.accountName}
            onChange={(e) => onChange('accountName', e.target.value)}
            className="w-full p-5 border-b-2 border-[#eee] bg-transparent text-[15px] font-bold text-[#1a1a1a] focus:border-[#D4AF37] outline-none transition-all rounded-none placeholder:text-[#ccc] uppercase"
            placeholder="NAMA LENGKAP"
          />
        </div>

        <div className="group">
          <label className="block text-[10px] font-black text-[#999] uppercase tracking-[0.3em] mb-4 group-focus-within:text-[#D4AF37] transition-colors">Nomor Virtual Account</label>
          <input 
            type="text"
            value={data.accountNumber}
            onChange={(e) => onChange('accountNumber', e.target.value)}
            className="w-full p-5 border-b-2 border-[#eee] bg-transparent text-[15px] font-bold text-[#1a1a1a] focus:border-[#D4AF37] outline-none transition-all rounded-none tabular-nums"
            placeholder="0000 0000 0000"
          />
        </div>

        <div className="group">
          <label className="block text-[10px] font-black text-[#999] uppercase tracking-[0.3em] mb-4 group-focus-within:text-[#D4AF37] transition-colors">Nominal Transaksi (IDR)</label>
          <div className="relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#D4AF37]">Rp</span>
            <input 
              type="text"
              value={data.amount}
              onChange={(e) => onChange('amount', e.target.value)}
              className="w-full py-5 pl-10 border-b-2 border-[#eee] bg-transparent text-[15px] font-bold text-[#1a1a1a] focus:border-[#D4AF37] outline-none transition-all rounded-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-[#f5f5f5] text-center">
        <p className="text-[10px] text-[#ccc] font-black uppercase tracking-[0.5em] mb-4">Secured by BI OVERSIGHT</p>
        <div className="flex justify-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-[#004526]"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-[#A50016]"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-[#004526]"></div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
