'use client';

import React, { useState, useRef } from 'react';
import { Phone, QrCode, Radio } from 'lucide-react';
import { TabData } from '@/lib/store';

interface HeaderProps {
  onOpenSimulator: () => void;
  onOpenQrScanner: () => void;
  tabsData?: TabData[];
  activeTabIndex?: number;
  onSelectTab?: (index: number) => void;
  onEditTab?: (index: number) => void;
}

export default function Header({
  onOpenSimulator,
  onOpenQrScanner,
  tabsData = [],
  activeTabIndex = 0,
  onSelectTab,
  onEditTab,
}: HeaderProps) {
  const [showPhone, setShowPhone] = useState(false);
  const [showWeb, setShowWeb] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (index: number) => {
    timerRef.current = setTimeout(() => {
      if (onEditTab) onEditTab(index);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-800 rounded-b-[20px] shadow-md border-b border-slate-100 safe-area-top">
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        {/* Left: QR Code Icon (matching Flutter leading: Icons.qr_code) */}
        <button
          onClick={onOpenQrScanner}
          className="p-1.5 text-[#426373] hover:text-cyan-600 transition-colors rounded-lg active:scale-95"
          title="Quét mã QR kết nối thiết bị"
        >
          <QrCode className="w-6 h-6" />
        </button>

        {/* Center Title: Logo Minatek image (matching Flutter title: Image minatek.vn) */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="https://minatek.vn/uploads/san-pham/logo-minatek-52cJ.png"
            alt="Minatek Logo"
            className="h-8 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-extrabold text-[#109bc5] text-lg tracking-tight ml-1 font-sans">
            MINATEK
          </span>
        </div>

        {/* Right Actions: Phone & Website Buttons (matching Flutter actions) */}
        <div className="flex items-center gap-1.5">
          {/* Phone Hotline Button */}
          <button
            onClick={() => {
              setShowPhone(!showPhone);
              setShowWeb(false);
            }}
            onDoubleClick={() => window.open('tel:0942926979')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95"
            title="Nhấn đúp để gọi hotline 094 292 6979"
          >
            <Phone className={`w-4 h-4 ${showPhone ? 'text-red-400' : 'text-white'}`} />
            {showPhone && (
              <span className="text-red-500 font-extrabold text-xs ml-0.5 whitespace-nowrap animate-fade-in">
                094 292 6979
              </span>
            )}
          </button>

          {/* Website Link Button */}
          <button
            onClick={() => {
              setShowWeb(!showWeb);
              setShowPhone(false);
            }}
            onDoubleClick={() => window.open('https://minatek.vn', '_blank')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95"
            title="Nhấn đúp để mở minatek.vn"
          >
            <Radio className="w-4 h-4 text-white" />
            {showWeb && (
              <span className="text-white text-xs font-semibold ml-0.5 whitespace-nowrap animate-fade-in">
                minatek.vn
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Device Tabs Bar (matching Flutter TabBar in AppBar bottom) */}
      {tabsData.length > 0 && (
        <div className="px-2 pb-2.5 pt-1 overflow-x-auto no-scrollbar flex items-center gap-1.5 border-t border-slate-100/80">
          {tabsData.map((tab, index) => {
            const isActive = activeTabIndex === index;
            return (
              <button
                key={tab.id || index}
                onClick={() => onSelectTab && onSelectTab(index)}
                onTouchStart={() => handleTouchStart(index)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={() => handleTouchStart(index)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (onEditTab) onEditTab(index);
                }}
                className={`px-4 py-1.5 rounded-xl text-sm whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#109bc5] text-white shadow-md font-bold scale-102'
                    : 'text-[#426373] hover:bg-slate-100 font-medium'
                }`}
                title="Bấm giữ hoặc nhấp chuột phải để điều chỉnh/xóa thiết bị"
              >
                {tab.devicesName}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

