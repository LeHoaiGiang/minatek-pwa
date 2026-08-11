'use client';

import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, History, Power, Signal } from 'lucide-react';

interface ControlBoardViewProps {
  onBack: () => void;
}

export default function ControlBoardView({ onBack }: ControlBoardViewProps) {
  // Switches state for BID 0 to BID 8 matching Screenshot 4
  const [switchesState, setSwitchesState] = useState<{ [key: number]: boolean }>({
    0: false,
    5: false,
    1: false,
    6: false,
    2: false,
    7: false,
    3: false,
    8: false,
  });

  const toggleSwitch = (bid: number) => {
    setSwitchesState((prev) => ({
      ...prev,
      [bid]: !prev[bid],
    }));
  };

  const bidsList = [0, 5, 1, 6, 2, 7, 3, 8];

  return (
    <div className="min-h-screen bg-[#1e386b] text-white pb-24 font-sans select-none">
      {/* Header Bar */}
      <div className="p-4 flex items-center justify-between sticky top-0 bg-[#1e386b] z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white tracking-tight">Bảng điều khiển</h1>
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

        {/* Control Section Header */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-lg font-bold text-white tracking-wide uppercase">ĐIỀU KHIỂN</h2>
          <div className="flex items-center gap-2">
            <button className="bg-[#192e54] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm border border-white/10">
              <History className="w-4 h-4 text-white" />
              <span>Logs 0</span>
            </button>
            <button className="bg-[#192e54] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm border border-white/10">
              <Signal className="w-4 h-4 text-white" />
              <span>Trạng thái</span>
            </button>
          </div>
        </div>

        {/* Grid 2 Columns of Control Cards matching Screenshot 4 */}
        <div className="grid grid-cols-2 gap-3.5">
          {bidsList.map((bid) => {
            const isActive = !!switchesState[bid];
            return (
              <button
                key={bid}
                onClick={() => toggleSwitch(bid)}
                className={`rounded-2xl p-4 flex flex-col justify-between h-36 shadow-md transition-all active:scale-95 text-left border ${
                  isActive
                    ? 'bg-emerald-500 border-emerald-400 text-white'
                    : 'bg-[#38a5d8] border-transparent text-white'
                }`}
              >
                <Power
                  className={`w-7 h-7 transition-colors ${
                    isActive ? 'text-white fill-white' : 'text-[#f45b38]'
                  }`}
                />
                <div>
                  <div className="text-lg font-bold text-white leading-tight">BID {bid}</div>
                  <div className="text-xs text-white/90 font-medium mt-0.5">
                    {isActive ? 'Đang kích hoạt' : 'Ngừng kích hoạt'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
