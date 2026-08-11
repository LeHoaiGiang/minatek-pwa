'use client';

import React from 'react';
import { ArrowLeft, ChevronRight, History, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AlarmBoardViewProps {
  onBack: () => void;
}

export default function AlarmBoardView({ onBack }: AlarmBoardViewProps) {
  const alarms = [
    { id: 0, bid: 'BID 0', status: 'Đang có cảnh báo', isWarning: true },
    { id: 1, bid: 'BID 1', status: 'Hoạt động bình thường', isWarning: false },
    { id: 2, bid: 'BID 2', status: 'Hoạt động bình thường', isWarning: false },
    { id: 3, bid: 'BID 3', status: 'Hoạt động bình thường', isWarning: false },
    { id: 4, bid: 'BID 4', status: 'Hoạt động bình thường', isWarning: false },
    { id: 5, bid: 'BID 5', status: 'Hoạt động bình thường', isWarning: false },
    { id: 6, bid: 'BID 6', status: 'Hoạt động bình thường', isWarning: false },
  ];

  return (
    <div className="min-h-screen bg-[#1e386b] text-white pb-24 font-sans select-none">
      {/* Header Bar */}
      <div className="p-4 flex items-center justify-between sticky top-0 bg-[#1e386b] z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white tracking-tight">Bảng cảnh báo</h1>
        </div>
      </div>

      <main className="px-4 space-y-4 max-w-lg mx-auto">
        {/* Top Strip: History Button (Light Blue) */}
        <div className="bg-[#38a5d8] rounded-2xl p-3.5 flex items-center justify-between shadow-md text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black/10 rounded-xl">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-base font-bold">Lịch sử hoạt động</div>
              <div className="text-xs text-white/90">Dữ liệu ngày: 11/8/2026</div>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white" />
        </div>

        {/* Alarm Section Header */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-lg font-bold text-white tracking-wide uppercase">THIẾT BỊ CẢNH BÁO</h2>
          <button className="bg-[#192e54] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm border border-white/10">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>Cảnh báo 0</span>
          </button>
        </div>

        {/* Alarm List Items matching Screenshot 5 */}
        <div className="space-y-3">
          {alarms.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-4 flex items-center gap-3.5 shadow-md transition-all ${
                item.isWarning
                  ? 'bg-[#ffea3c] text-slate-900 font-bold'
                  : 'bg-[#38a5d8] text-white font-medium'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  item.isWarning ? 'bg-black/10 text-slate-900' : 'bg-black/10 text-white'
                }`}
              >
                {item.isWarning ? (
                  <AlertTriangle className="w-6 h-6 text-slate-900" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <div className="text-base font-bold leading-tight">{item.bid}</div>
                <div className={`text-xs ${item.isWarning ? 'text-slate-800 font-bold' : 'text-white/90'}`}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
