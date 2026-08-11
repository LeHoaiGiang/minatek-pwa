'use client';

import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Snowflake, History, Layers } from 'lucide-react';

interface SensorBoardViewProps {
  onBack: () => void;
}

export default function SensorBoardView({ onBack }: SensorBoardViewProps) {
  const [devMode, setDevMode] = useState(true);

  // Mock sensor items matching Screenshot 3
  const sensors = [
    { id: 0, bid: 'BID 0', type: 'Loại: Chưa phân loại', status: 'Đang hoạt động', value: 0.0, isWhite: true },
    { id: 1, bid: 'BID 1', type: 'Loại: Chưa phân loại', status: 'Đang hoạt động', value: 0.0, isWhite: false },
    { id: 2, bid: 'BID 2', type: 'Loại: Chưa phân loại', status: 'Đang hoạt động', value: 0.0, isWhite: false },
    { id: 3, bid: 'BID 3', type: 'Loại: Chưa phân loại', status: 'Đang hoạt động', value: 0.0, isWhite: false },
  ];

  return (
    <div className="min-h-screen bg-[#1e386b] text-white pb-24 font-sans select-none">
      {/* Header Bar */}
      <div className="p-4 flex items-center justify-between sticky top-0 bg-[#1e386b] z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white tracking-tight">Bảng cảm biến</h1>
        </div>
        <button
          onClick={() => setDevMode(!devMode)}
          className="bg-[#38a5d8] hover:bg-[#2d92c2] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-sm"
        >
          <span>Dev mode</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <main className="px-4 space-y-3.5 max-w-lg mx-auto">
        {/* Graph Card matching Screenshot 3 */}
        <div className="bg-[#16294a] rounded-2xl p-4 shadow-lg border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs text-white/90">
            <div>
              <div className="text-xs font-medium text-white/80">Giá trị hiện tại</div>
              <div className="text-xl font-extrabold text-white">0</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-white/80">Ngày hiện tại:</div>
            </div>
          </div>

          {/* Dotted Line Graph Simulation */}
          <div className="relative h-32 w-full border-l border-b border-white/30 my-2 flex items-end justify-between px-2 pb-1">
            {/* Horizontal Dotted Lines */}
            <div className="absolute inset-x-0 top-0 border-b border-dashed border-white/20"></div>
            <div className="absolute inset-x-0 top-1/3 border-b border-dashed border-white/20"></div>
            <div className="absolute inset-x-0 top-2/3 border-b border-dashed border-white/20"></div>

            {/* Y-Axis Labels */}
            <span className="absolute left-[-22px] top-0 text-[10px] text-white/60">1.5</span>
            <span className="absolute left-[-16px] top-1/3 text-[10px] text-white/60">1</span>
            <span className="absolute left-[-22px] top-2/3 text-[10px] text-white/60">0.5</span>
            <span className="absolute left-[-16px] bottom-0 text-[10px] text-white/60">0</span>

            {/* Point Dot */}
            <div className="absolute right-0 bottom-0 w-3 h-3 bg-white rounded-full shadow-md border-2 border-[#38a5d8] translate-x-1/2 translate-y-1/2"></div>
          </div>

          {/* X-Axis Time Labels */}
          <div className="flex justify-between text-[10px] text-white/70 px-1 pt-1">
            <span>3 PM</span>
            <span>8 PM</span>
            <span>1 AM</span>
            <span>6 AM</span>
            <span>11 AM</span>
          </div>

          {/* Graph Controls */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button className="bg-[#38a5d8] p-2 rounded-xl text-white hover:bg-[#2d92c2] transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="bg-[#38a5d8] p-2 rounded-xl text-white hover:bg-[#2d92c2] transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-[#38a5d8] p-2 rounded-xl text-white hover:bg-[#2d92c2] transition-colors">
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Strip 1: Limit Button (Green) */}
        <div className="bg-[#48bb78] rounded-2xl p-3.5 flex items-center justify-between shadow-md text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black/10 rounded-xl">
              <Snowflake className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-base font-bold">Giới hạn</div>
              <div className="text-xs text-white/90">Nhỏ nhất: 0 - Lớn nhất: 100</div>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white" />
        </div>

        {/* Feature Strip 2: History Button (Light Blue) */}
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
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-rose-500 rounded-full text-white text-[11px] font-bold flex items-center justify-center">
              0 !
            </span>
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Sensors List Header */}
        <div className="flex items-center justify-between pt-2">
          <h2 className="text-lg font-bold text-white tracking-wide uppercase">BẢNG CẢM BIẾN</h2>
          <button className="bg-[#38a5d8] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <Layers className="w-4 h-4" />
            <span>Tất cả cảm biến</span>
          </button>
        </div>

        {/* Sensors List Cards matching Screenshot 3 */}
        <div className="space-y-3">
          {sensors.map((s) => (
            <div
              key={s.id}
              className={`rounded-2xl p-4 flex items-center justify-between shadow-md transition-all ${
                s.isWhite ? 'bg-white text-slate-800' : 'bg-[#38a5d8] text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    s.isWhite ? 'bg-[#192e54] text-white' : 'bg-white/20 text-white'
                  }`}
                >
                  <span className="text-lg font-bold">?</span>
                </div>
                <div>
                  <div className={`text-base font-bold ${s.isWhite ? 'text-slate-900' : 'text-white'}`}>
                    {s.bid}
                  </div>
                  <div className={`text-xs ${s.isWhite ? 'text-slate-600' : 'text-white/90'}`}>
                    {s.type}
                  </div>
                  <div className={`text-xs font-medium ${s.isWhite ? 'text-slate-500' : 'text-white/80'}`}>
                    {s.status}
                  </div>
                </div>
              </div>

              {/* Gauge Circular Chart Simulation */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className={s.isWhite ? 'text-slate-200' : 'text-white/20'}
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={s.isWhite ? 'text-[#38a5d8]' : 'text-white'}
                    strokeDasharray="25, 100"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className={`absolute text-xs font-bold ${s.isWhite ? 'text-slate-700' : 'text-white'}`}>
                  {s.value.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
