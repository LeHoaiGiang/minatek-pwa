'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit3, LogOut, PhoneCall, Trash2, LayoutGrid } from 'lucide-react';

interface UserPageViewProps {
  onLogout?: () => void;
}

export default function UserPageView({ onLogout }: UserPageViewProps) {
  const router = useRouter();
  const [profile] = useState({
    userCode: '65',
    userName: 'Lê Hoài Giang',
    systemVersion: '25069PTEBG',
    email: 'lehoaigiangg@gmail.com',
  });

  const handleLogout = () => {
    localStorage.removeItem('minatek_token');
    localStorage.removeItem('minatek_user');
    if (onLogout) onLogout();
    else router.push('/login');
  };

  const handleCallHotline = () => {
    window.open('tel:0942926979');
  };

  const handleDeleteAccount = () => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này không?')) {
      handleLogout();
    }
  };

  return (
    <div className="min-h-screen bg-[#1e386b] text-white pb-24 font-sans select-none p-4">
      <main className="max-w-lg mx-auto space-y-4 pt-2">
        {/* Top Logo Card: White rounded box with Dev Icon matching Screenshot 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-24 h-24 bg-[#38a5d8] rounded-3xl flex items-center justify-center shadow-md">
            <LayoutGrid className="w-14 h-14 text-white stroke-[2]" />
          </div>
          <h2 className="text-xl font-extrabold text-[#38a5d8]">Tài khoản dev</h2>
        </div>

        {/* User Profile Details Card (Dark navy container with horizontal white line dividers) */}
        <div className="bg-[#162744] rounded-2xl p-4 shadow-lg border border-white/5 space-y-3">
          <div className="text-base font-semibold text-white py-1">
            Mã người dùng: {profile.userCode}
          </div>
          <div className="h-[1px] bg-white/20 w-full"></div>

          <div className="text-base font-semibold text-white py-1">
            Tên người dùng: {profile.userName}
          </div>
          <div className="h-[1px] bg-white/20 w-full"></div>

          <div className="text-base font-semibold text-white py-1">
            Phiên bản hệ thống: {profile.systemVersion}
          </div>
          <div className="h-[1px] bg-white/20 w-full"></div>

          <div className="text-base font-semibold text-white py-1">
            Email: {profile.email}
          </div>
        </div>

        {/* 4 Action Buttons matching Screenshot 2 */}
        <div className="space-y-3 pt-1">
          {/* Button 1: Chỉnh sửa thông tin */}
          <button className="w-full bg-[#38a5d8] hover:bg-[#2d92c2] text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-base active:scale-98">
            <Edit3 className="w-5 h-5 stroke-[2.5]" />
            <span>Chỉnh sửa thông tin</span>
          </button>

          {/* Button 2: Đăng xuất */}
          <button
            onClick={handleLogout}
            className="w-full bg-[#38a5d8] hover:bg-[#2d92c2] text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-base active:scale-98"
          >
            <LogOut className="w-5 h-5 stroke-[2.5]" />
            <span>Đăng xuất</span>
          </button>

          {/* Button 3: Hotline: 094 292 6979 */}
          <button
            onClick={handleCallHotline}
            className="w-full bg-[#38a5d8] hover:bg-[#2d92c2] text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-base active:scale-98"
          >
            <PhoneCall className="w-5 h-5 stroke-[2.5]" />
            <span>Hotline: 094 292 6979</span>
          </button>

          {/* Button 4: Xoá tài khoản (Orange Red #f45b38) */}
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-[#f45b38] hover:bg-[#e04a27] text-white font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-base active:scale-98"
          >
            <Trash2 className="w-5 h-5 stroke-[2.5]" />
            <span>Xoá tài khoản</span>
          </button>
        </div>
      </main>
    </div>
  );
}
