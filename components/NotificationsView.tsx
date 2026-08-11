'use client';

import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function NotificationsView() {
  const notifications = [
    {
      id: 1,
      title: 'Hệ thống khởi động',
      time: '12:22 - 11/08/2026',
      content: 'Tủ điện STM32 đã kết nối thành công với máy chủ Minatek Cloud.',
      type: 'info',
    },
    {
      id: 2,
      title: 'Cảnh báo nhiệt độ',
      time: '10:15 - 11/08/2026',
      content: 'BID 0 ghi nhận nhiệt độ tăng cao vượt mức 45°C.',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Cập nhật phần mềm',
      time: '08:00 - 10/08/2026',
      content: 'Phiên bản hệ thống 25069PTEBG đã được kích hoạt thành công.',
      type: 'success',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1e386b] text-white pb-24 font-sans select-none">
      {/* Header Bar */}
      <div className="p-4 sticky top-0 bg-[#1e386b] z-20 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight">Thông báo hệ thống</h1>
        <div className="bg-[#192e54] p-2 rounded-xl border border-white/10">
          <Bell className="w-5 h-5 text-[#38a5d8]" />
        </div>
      </div>

      <main className="px-4 space-y-3 max-w-lg mx-auto">
        {notifications.map((item) => (
          <div key={item.id} className="bg-[#16294a] rounded-2xl p-4 shadow-md border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {item.type === 'info' && <Info className="w-5 h-5 text-[#38a5d8]" />}
                {item.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                <span className="font-bold text-sm text-white">{item.title}</span>
              </div>
              <span className="text-[11px] text-white/60 font-medium">{item.time}</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed pl-7">{item.content}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
