'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, AlertCircle, Phone, Radio } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-[#73c1d9] via-[#66b0c7] to-[#2a849f] text-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[25px] p-8 shadow-2xl space-y-6 text-slate-800">
        {/* Minatek Logo image matching Flutter App */}
        <div className="text-center space-y-3">
          <img
            src="https://minatek.vn/uploads/san-pham/logo-minatek-52cJ.png"
            alt="Minatek Logo"
            className="h-16 mx-auto object-contain"
          />
          <h1 className="text-xl font-bold text-cyan-800 tracking-tight">
            ĐĂNG NHẬP HỆ THỐNG MINATEK
          </h1>
          <p className="text-xs text-slate-500">
            Giám sát & Điều khiển tủ điện tự động hóa thông minh
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Đăng Nhập</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Mật Khẩu</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            {loading ? (
              <span>Đang Kết Nối Server...</span>
            ) : (
              <>
                <span>Đăng Nhập</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-cyan-600" /> 094 292 6979
          </span>
          <span className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-cyan-600" /> minatek.vn
          </span>
        </div>
      </div>
    </div>
  );
}
