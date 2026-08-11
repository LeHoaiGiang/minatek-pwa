'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import IotSimulatorModal from '@/components/IotSimulatorModal';
import { QrScannerModal } from '@/components/Modals';
import { LogOut, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getMinatekTabs, TabData } from '@/lib/store';

export default function UserPage() {
  const router = useRouter();
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [tabsData, setTabsData] = useState<TabData[]>([]);
  const [copied, setCopied] = useState(false);

  const [profile, setProfile] = useState({
    deviceId: 'MINATEK_GW_001',
    device: 'Tủ Điện Trung Tâm 01',
    licenseType: 'Customer',
    expireDate: new Date().toISOString(),
  });

  useEffect(() => {
    const token = localStorage.getItem('minatek_token');
    if (!token) {
      router.push('/login');
      return;
    }

    const localData = getMinatekTabs();
    setTabsData(localData);

    fetch('/api/control')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTabsData(data);
      })
      .catch(() => {});
  }, [router]);

  // Base64 QR Code payload matching Flutter userInfo.dart line 126:
  // base64.encode(utf8.encode(json.encode(homeController.tabData.value)))
  const qrPayload = typeof window !== 'undefined'
    ? btoa(unescape(encodeURIComponent(JSON.stringify(tabsData.length > 0 ? tabsData : getMinatekTabs()))))
    : '';

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrPayload)}`;

  const handleCopyUserInfo = () => {
    const textToCopy = `ID: ${profile.deviceId}\nThiết bị: ${profile.device}\nSố thiết bị kết nối: ${tabsData.length}\nLoại chứng chỉ: ${profile.licenseType}\nHạn sử dụng: ${profile.expireDate}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('minatek_token');
    localStorage.removeItem('minatek_user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#90ddf4] via-[#6cc4dd] via-[#5cb9d3] via-[#3597b5] to-[#27768e] text-slate-800 pb-28 pt-0 font-sans select-none">
      {/* Header AppBar matching Flutter userInfo.dart */}
      <Header
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenQrScanner={() => {}}
      />

      <main className="max-w-xl mx-auto px-2 pt-3 space-y-3">
        {/* QR Code Card (Matching Flutter userInfo.dart Lines 122-130) */}
        <div className="bg-white rounded-[20px] p-3 shadow-md text-center flex flex-col items-center justify-center">
          <img
            src={qrImageUrl}
            alt="User Info QR Code"
            className="w-52 h-52 object-contain my-1"
          />
        </div>

        {/* User Info Details Card (Matching Flutter userInfo.dart Lines 135-244) */}
        <div className="bg-cyan-200/30 rounded-[20px] p-4 text-white border border-white/20 space-y-3.5">
          <div className="text-lg font-medium text-white">ID: {profile.deviceId}</div>
          <div className="h-[1px] bg-black/70 w-full"></div>

          <div className="text-lg font-medium text-white">Thiết bị: {profile.device}</div>
          <div className="h-[1px] bg-black/70 w-full"></div>

          <div className="text-lg font-medium text-white">
            Số thiết bị kết nối: {tabsData.length}
          </div>
          <div className="h-[1px] bg-black/70 w-full"></div>

          <div className="text-lg font-medium text-white">Loại chứng chỉ: {profile.licenseType}</div>
          <div className="h-[1px] bg-black/70 w-full"></div>

          <div className="text-base font-medium text-white">
            Hạn sử dụng: {profile.expireDate}
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleCopyUserInfo}
              className="w-[85%] py-2.5 bg-white text-cyan-800 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Đã Sao Chép Thông Tin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-700" />
                  <span>Sao chép thông tin người dùng</span>
                </>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-rose-600 text-white font-bold text-xs rounded-[20px] shadow-md hover:bg-rose-700 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng Xuất Khỏi Ứng Dụng</span>
        </button>
      </main>

      <BottomNav
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onRefresh={() => {}}
      />

      <IotSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSimulateEvent={() => {}}
      />
    </div>
  );
}

