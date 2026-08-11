'use client';

import React, { useState } from 'react';
import { X, Trash2, QrCode, ShieldCheck } from 'lucide-react';

// Dynamic Modal Generic Wrapper (Matching Flutter EasyDialog style)
export function ModalBase({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md p-6 border-0 shadow-2xl relative text-slate-800 rounded-[25px] space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2 pr-6">{title}</h3>
        {children}
      </div>
    </div>
  );
}

// Add/Edit Tab Modal (Matching Flutter default.dart addingDevices & editDevices dialogs)
export function TabEditModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialName = '',
  isEdit = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  onDelete?: () => void;
  initialName?: string;
  isEdit?: boolean;
}) {
  const [name, setName] = useState(initialName);

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={isEdit ? 'Điều chỉnh thiết bị' : 'Thêm thiết bị'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            onSave(name.trim());
            onClose();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Thiết Bị / Tủ Điện</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Tủ Điện Trung Tâm 01, Chiếu Sáng KCN..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-cyan-500"
            autoFocus
          />
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          {isEdit && onDelete ? (
            <button
              type="button"
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm"
            >
              <Trash2 className="w-4 h-4" /> Xóa
            </button>
          ) : <div></div>}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Đồng ý
            </button>
          </div>
        </div>
      </form>
    </ModalBase>
  );
}

// Add Big/Small Monitor Modal
export function AddMonitorModal({
  isOpen,
  onClose,
  onSave,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  title: string;
}) {
  const [name, setName] = useState('');

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            onSave(name.trim());
            setName('');
            onClose();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Cảm Biến / Màn Hình</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên giám sát..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-cyan-500"
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md"
          >
            Xác Nhận
          </button>
        </div>
      </form>
    </ModalBase>
  );
}

// Add Switch Control Modal
export function AddSwitchModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, bid: number) => void;
}) {
  const [name, setName] = useState('');
  const [bid, setBid] = useState<number>(1);

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Thêm Công Tắc Điều Khiển Mới">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            onSave(name.trim(), Number(bid));
            setName('');
            onClose();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Công Tắc</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Đèn Xưởng 01, Bơm Phụ..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-cyan-500"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Mã Kênh BID (Board ID)</label>
          <input
            type="number"
            value={bid}
            onChange={(e) => setBid(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md"
          >
            Tạo Công Tắc
          </button>
        </div>
      </form>
    </ModalBase>
  );
}

// Generic Edit/Delete Item Modal (Matching Flutter modifyBigMonitor, modifySmallMonitor, modifySwitchMonitor)
export function EditItemModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  title,
  initialName = '',
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  onDelete: () => void;
  title: string;
  initialName?: string;
}) {
  const [name, setName] = useState(initialName);

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            onSave(name.trim());
            onClose();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Cần Chỉnh Sửa</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên mới..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-cyan-500"
            autoFocus
          />
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm"
          >
            <Trash2 className="w-4 h-4" /> Xóa
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Đồng Ý
            </button>
          </div>
        </div>
      </form>
    </ModalBase>
  );
}

// QR Code Scanner Modal Simulation
export function QrScannerModal({
  isOpen,
  onClose,
  onScanned,
}: {
  isOpen: boolean;
  onClose: () => void;
  onScanned: (deviceId: string) => void;
}) {
  const [scanning, setScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScanned('MINATEK_GW_NEW_8899');
      onClose();
    }, 1500);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Quét Mã QR Kết Nối Thiết Bị IoT">
      <div className="flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="relative w-48 h-48 bg-slate-900 border-4 border-cyan-500 rounded-2xl flex items-center justify-center overflow-hidden shadow-md">
          <QrCode className="w-28 h-28 text-cyan-400 animate-pulse" />
          {scanning && (
            <div className="absolute inset-0 bg-cyan-500/30 border-t-4 border-cyan-400 animate-scan"></div>
          )}
        </div>
        <p className="text-xs text-slate-600 max-w-xs">
          Hướng camera về phía mã QR trên thân tủ điện Minatek để tự động kết nối PWA.
        </p>
        <button
          onClick={handleSimulateScan}
          disabled={scanning}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          {scanning ? 'Đang Quét Mã...' : 'Mô Phỏng Quét QR Mã MINATEK'}
        </button>
      </div>
    </ModalBase>
  );
}

