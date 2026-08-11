'use client';

import React from 'react';
import { LayoutGrid, UserCheck, Bell } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'devices' | 'user' | 'notifications';
  onChangeTab: (tab: 'devices' | 'user' | 'notifications') => void;
}

export default function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#162744] border-t border-white/10 shadow-2xl h-[70px] safe-area-bottom">
      <div className="max-w-md mx-auto h-full flex items-center justify-around px-4">
        {/* Tab 1: Thiết bị */}
        <button
          onClick={() => onChangeTab('devices')}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-transform active:scale-95"
        >
          <LayoutGrid
            className={`w-6 h-6 transition-colors ${
              activeTab === 'devices' ? 'text-[#38a5d8]' : 'text-white/70'
            }`}
          />
          <span
            className={`text-xs font-bold transition-colors ${
              activeTab === 'devices' ? 'text-[#38a5d8]' : 'text-white/70'
            }`}
          >
            Thiết bị
          </span>
        </button>

        {/* Tab 2: Người dùng */}
        <button
          onClick={() => onChangeTab('user')}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-transform active:scale-95"
        >
          <UserCheck
            className={`w-6 h-6 transition-colors ${
              activeTab === 'user' ? 'text-[#38a5d8]' : 'text-white/70'
            }`}
          />
          <span
            className={`text-xs font-bold transition-colors ${
              activeTab === 'user' ? 'text-[#38a5d8]' : 'text-white/70'
            }`}
          >
            Người dùng
          </span>
        </button>

        {/* Tab 3: Thông báo */}
        <button
          onClick={() => onChangeTab('notifications')}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-transform active:scale-95"
        >
          <Bell
            className={`w-6 h-6 transition-colors ${
              activeTab === 'notifications' ? 'text-[#38a5d8]' : 'text-white/70'
            }`}
          />
          <span
            className={`text-xs font-bold transition-colors ${
              activeTab === 'notifications' ? 'text-[#38a5d8]' : 'text-white/70'
            }`}
          >
            Thông báo
          </span>
        </button>
      </div>
    </nav>
  );
}

