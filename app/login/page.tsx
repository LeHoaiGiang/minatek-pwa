'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, AlertCircle, Phone, Radio, LayoutGrid } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.accessToken) {
        localStorage.setItem('minatek_token', data.accessToken);
        localStorage.setItem('minatek_user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setErrorMsg(data.message || 'Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      setErrorMsg('Không thể kết nối máy chủ API Minatek');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e386b] text-white flex flex-col items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-md bg-[#162744] rounded-3xl p-8 shadow-2xl space-y-6 border border-white/10 text-white">
        {/* Minatek Logo & Header matching Mobile App */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-[#38a5d8] rounded-3xl mx-auto flex items-center justify-center shadow-lg">
            <LayoutGrid className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight pt-1">
            MINATEK SMART IoT
          </h1>
          <p className="text-xs text-white/70">
            Giám sát & Điều khiển tủ điện tự động hóa thông minh
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/20 border border-rose-500/50 rounded-2xl text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-white/90 mb-1.5">Tên Đăng Nhập</label>
            <div className="relative">
              <User className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="w-full bg-[#192e54] border border-white/15 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38a5d8] transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/90 mb-1.5">Mật Khẩu</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#192e54] border border-white/15 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38a5d8] transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#38a5d8] hover:bg-[#2d92c2] text-white font-bold text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            {loading ? (
              <span>Đang Kết Nối Server...</span>
            ) : (
              <>
                <span>Đăng Nhập</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70 font-medium">
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-[#38a5d8]" /> 094 292 6979
          </span>
          <span className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-[#38a5d8]" /> minatek.vn
          </span>
        </div>
      </div>
    </div>
  );
}

