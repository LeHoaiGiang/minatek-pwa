'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import SensorBoardView from '@/components/SensorBoardView';
import ControlBoardView from '@/components/ControlBoardView';
import AlarmBoardView from '@/components/AlarmBoardView';
import NotificationsView from '@/components/NotificationsView';
import UserPage from '@/app/user/page';
import {
  LayoutGrid,
  Grid,
  AlertCircle,
  AlertTriangle,
  Plus,
  Sun,
  Wifi,
  Signal,
  Radio,
  Sliders,
  Cog,
  ChevronRight,
  User,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [activeNavTab, setActiveNavTab] = useState<'devices' | 'user' | 'notifications'>('devices');
  const [activeSubView, setActiveSubView] = useState<'home' | 'sensors' | 'controls' | 'alarms'>('home');
  
  const [activeBoardTab, setActiveBoardTab] = useState(0);
  const boardTabs = [
    { id: 0, name: 'STM32', active: true },
    { id: 1, name: 'HTGas Q8 test', active: false },
    { id: 2, name: 'Parc Mall C', active: false },
  ];

  useEffect(() => {
    const token = localStorage.getItem('minatek_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Render Sub-Views (Bảng cảm biến, Bảng điều khiển, Bảng cảnh báo)
  if (activeNavTab === 'devices') {
    if (activeSubView === 'sensors') {
      return (
        <>
          <SensorBoardView onBack={() => setActiveSubView('home')} />
          <BottomNav activeTab={activeNavTab} onChangeTab={setActiveNavTab} />
        </>
      );
    }

    if (activeSubView === 'controls') {
      return (
        <>
          <ControlBoardView onBack={() => setActiveSubView('home')} />
          <BottomNav activeTab={activeNavTab} onChangeTab={setActiveNavTab} />
        </>
      );
    }

    if (activeSubView === 'alarms') {
      return (
        <>
          <AlarmBoardView onBack={() => setActiveSubView('home')} />
          <BottomNav activeTab={activeNavTab} onChangeTab={setActiveNavTab} />
        </>
      );
    }
  }

  if (activeNavTab === 'user') {
    return (
      <>
        <UserPage onLogout={() => router.push('/login')} />
        <BottomNav activeTab={activeNavTab} onChangeTab={setActiveNavTab} />
      </>
    );
  }

  if (activeNavTab === 'notifications') {
    return (
      <>
        <NotificationsView />
        <BottomNav activeTab={activeNavTab} onChangeTab={setActiveNavTab} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e386b] text-white pb-24 font-sans select-none p-4">
      <main className="max-w-lg mx-auto space-y-4 pt-1">
        {/* Profile Header Bar matching Screenshot 1 */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#162744] rounded-2xl flex items-center justify-center border border-white/10 shadow-md shrink-0">
            <LayoutGrid className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white leading-tight">Lê Hoài Giang</h1>
            <p className="text-xs text-white/70 font-medium">lehoaigiangg@gmail.com</p>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-xl font-bold text-white tracking-tight">Tổng quan thiết bị</h2>

        {/* Device Stats Overview Grid 2x2 Card matching Screenshot 1 */}
        <div className="bg-[#162744] rounded-2xl p-4 shadow-lg border border-white/5 grid grid-cols-2 gap-4">
          {/* Stat 1: 3 thiết bị Kích hoạt */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">3 thiết bị</div>
              <div className="text-xs text-white/80">Kích hoạt</div>
            </div>
          </div>

          {/* Stat 2: 9 thiết bị Đã tắt */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Grid className="w-6 h-6 text-white/60" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">9 thiết bị</div>
              <div className="text-xs text-white/80">Đã tắt</div>
            </div>
          </div>

          {/* Stat 3: 4 thiết bị Bị lỗi */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">4 thiết bị</div>
              <div className="text-xs text-white/80">Bị lỗi</div>
            </div>
          </div>

          {/* Stat 4: 7 thiết bị Cảnh báo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">7 thiết bị</div>
              <div className="text-xs text-white/80">Cảnh báo</div>
            </div>
          </div>
        </div>

        {/* Add Device Button matching Screenshot 1 */}
        <button className="w-full bg-[#38a5d8] hover:bg-[#2d92c2] text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-between text-base active:scale-98">
          <span>Thêm thiết bị</span>
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Scrollable Board Tabs Strip matching Screenshot 1 */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
          {boardTabs.map((tab) => {
            const isSelected = activeBoardTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBoardTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${
                  isSelected
                    ? 'bg-[#38a5d8] text-white'
                    : 'bg-[#162744] text-white/80 hover:bg-white/10 border border-white/5'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isSelected ? 'bg-orange-500' : 'bg-emerald-500'}`}>
                  <LayoutGrid className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Environment Status Card matching Screenshot 1 */}
        <div className="bg-[#162744] rounded-2xl p-4 shadow-lg border border-white/5 grid grid-cols-3 gap-2 text-center">
          {/* Temperature */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <Sun className="w-6 h-6 text-white" />
            <div className="text-sm font-bold text-white">25.5°C</div>
            <div className="text-[11px] text-white/70">Nhiệt độ</div>
          </div>

          {/* Status Online */}
          <div className="flex flex-col items-center justify-center space-y-1 border-x border-white/10">
            <Wifi className="w-6 h-6 text-emerald-400" />
            <div className="text-sm font-bold text-emerald-400">Online</div>
            <div className="text-[11px] text-white/70">Trạng thái</div>
          </div>

          {/* Signal */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <Signal className="w-6 h-6 text-white" />
            <div className="text-sm font-bold text-white">0%</div>
            <div className="text-[11px] text-white/70">Tín hiệu</div>
          </div>
        </div>

        {/* 4 Main Feature Cards Grid 2x2 matching Screenshot 1 */}
        <div className="grid grid-cols-2 gap-3.5 pt-1">
          {/* Card 1: Bảng cảm biến */}
          <button
            onClick={() => setActiveSubView('sensors')}
            className="bg-[#38a5d8] hover:bg-[#2d92c2] text-white rounded-2xl p-4 shadow-md transition-all active:scale-95 text-left flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <Radio className="w-7 h-7 text-white stroke-[2.5]" />
              <span className="bg-[#48bb78] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <div>
              <div className="text-base font-extrabold text-white leading-tight">
                Bảng cảm biến
              </div>
              <div className="text-xs text-white/90 font-medium mt-1">10 cảm biến</div>
            </div>
          </button>

          {/* Card 2: Bảng điều khiển */}
          <button
            onClick={() => setActiveSubView('controls')}
            className="bg-[#38a5d8] hover:bg-[#2d92c2] text-white rounded-2xl p-4 shadow-md transition-all active:scale-95 text-left flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <Sliders className="w-7 h-7 text-white stroke-[2.5]" />
              <span className="bg-[#48bb78] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <div>
              <div className="text-base font-extrabold text-white leading-tight">
                Bảng điều khiển
              </div>
              <div className="text-xs text-white/90 font-medium mt-1">10 điều khiển</div>
            </div>
          </button>

          {/* Card 3: Bảng cảnh báo */}
          <button
            onClick={() => setActiveSubView('alarms')}
            className="bg-[#38a5d8] hover:bg-[#2d92c2] text-white rounded-2xl p-4 shadow-md transition-all active:scale-95 text-left flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <AlertTriangle className="w-7 h-7 text-white stroke-[2.5]" />
              <span className="bg-[#f45b38] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Error
              </span>
            </div>
            <div>
              <div className="text-base font-extrabold text-white leading-tight">
                Bảng cảnh báo
              </div>
              <div className="text-xs text-white/90 font-medium mt-1">10 cảnh báo</div>
            </div>
          </button>

          {/* Card 4: Bảng hệ thống */}
          <button
            onClick={() => setActiveSubView('sensors')}
            className="bg-[#38a5d8] hover:bg-[#2d92c2] text-white rounded-2xl p-4 shadow-md transition-all active:scale-95 text-left flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <Cog className="w-7 h-7 text-white stroke-[2.5]" />
              <span className="bg-[#48bb78] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <div>
              <div className="text-base font-extrabold text-white leading-tight">
                Bảng hệ thống
              </div>
              <div className="text-xs text-white/90 font-medium mt-1">Hệ thống</div>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Navigation matching screenshots */}
      <BottomNav activeTab={activeNavTab} onChangeTab={setActiveNavTab} />
    </div>
  );
}


