'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu, User, Plus } from 'lucide-react';

interface BottomNavProps {
  onOpenSimulator?: () => void;
  onRefresh?: () => void;
  onAddDevice?: () => void;
}

export default function BottomNav({ onOpenSimulator, onRefresh, onAddDevice }: BottomNavProps) {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isUser = pathname === '/user';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-[40px] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] h-[75px] safe-area-bottom">
      <div className="max-w-md mx-auto h-full flex items-center justify-around relative px-4">
        {/* Tab 1: Quản lý thiết bị (matching Flutter bottomNavBar.dart index 0) */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <Cpu className={`w-[38px] h-[38px] transition-colors ${isHome ? 'text-cyan-500' : 'text-slate-500'}`} />
          <span className={`text-[12px] font-semibold ${isHome ? 'text-cyan-600 font-bold' : 'text-slate-600'}`}>
            Quản lý thiết bị
          </span>
        </Link>

        {/* Floating Action Button (+) centered docked (matching Flutter default.dart FAB) */}
        {onAddDevice && (
          <div className="relative -top-6 flex flex-col items-center">
            <button
              onClick={onAddDevice}
              className="w-[62px] h-[62px] bg-cyan-400 hover:bg-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all border-4 border-white"
              title="Thêm thiết bị"
            >
              <Plus className="w-10 h-10 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* Tab 2: Dữ liệu người dùng (matching Flutter bottomNavBar.dart index 1) */}
        <Link
          href="/user"
          className="flex flex-col items-center justify-center gap-0.5"
        >
          <User className={`w-[38px] h-[38px] transition-colors ${isUser ? 'text-cyan-500' : 'text-slate-500'}`} />
          <span className={`text-[12px] font-semibold ${isUser ? 'text-cyan-600 font-bold' : 'text-slate-600'}`}>
            Dữ liệu người dùng
          </span>
        </Link>
      </div>
    </nav>
  );
}
