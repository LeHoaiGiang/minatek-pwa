'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PwaInstaller from '@/components/PwaInstaller';
import IotSimulatorModal from '@/components/IotSimulatorModal';
import {
  TabEditModal,
  AddMonitorModal,
  AddSwitchModal,
  EditItemModal,
  QrScannerModal,
} from '@/components/Modals';
import {
  TabData,
  getMinatekTabs,
  addTab,
  updateTab,
  deleteTab,
  addBigMonitor as addBigMonitorStore,
  editBigMonitor as editBigMonitorStore,
  deleteBigMonitor as deleteBigMonitorStore,
  addSmallMonitor as addSmallMonitorStore,
  editSmallMonitor as editSmallMonitorStore,
  deleteSmallMonitor as deleteSmallMonitorStore,
  addSwitch as addSwitchStore,
  editSwitch as editSwitchStore,
  deleteSwitch as deleteSwitchStore,
  toggleSwitchState as toggleSwitchStore,
} from '@/lib/store';
import { Plus, Zap, Activity, Radio, Trash2, Edit2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [tabsData, setTabsData] = useState<TabData[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isTabModalOpen, setIsTabModalOpen] = useState(false);
  const [isEditTab, setIsEditTab] = useState(false);
  
  const [isBigMonitorModalOpen, setIsBigMonitorModalOpen] = useState(false);
  const [isSmallMonitorModalOpen, setIsSmallMonitorModalOpen] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

  // Item editing modal states (Long press / edit dialog)
  const [editingItemType, setEditingItemType] = useState<'big' | 'small' | 'switch' | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number>(-1);
  const [editingInitialName, setEditingInitialName] = useState<string>('');

  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startLongPress = (type: 'big' | 'small' | 'switch', index: number, initialName: string) => {
    touchTimerRef.current = setTimeout(() => {
      setEditingItemType(type);
      setEditingItemIndex(index);
      setEditingInitialName(initialName);
    }, 600);
  };

  const cancelLongPress = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  };

  // Fetch initial control data with localStorage fallback
  const fetchControlData = async () => {
    try {
      setLoading(true);
      const localData = getMinatekTabs();
      setTabsData(localData);

      const res = await fetch('/api/control');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTabsData(data);
        }
      }
    } catch (error) {
      console.warn('Backend API unavailable, using offline localStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('minatek_token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchControlData();
  }, [router]);

  // Sync actions with serverless API asynchronously
  const sendControlAction = async (payload: any) => {
    try {
      await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn('API action post failed, stored locally:', error);
    }
  };

  // Toggle Switch state
  const handleToggleSwitch = (subIndex: number) => {
    const updated = toggleSwitchStore(activeTabIndex, subIndex);
    setTabsData([...updated]);
    sendControlAction({
      action: 'toggle_switch',
      tabIndex: activeTabIndex,
      subIndex,
    });
  };

  // IoT Simulator event handler
  const handleSimulateEvent = (eventType: string, payload: any) => {
    if (eventType === 'sensor_update') {
      const copy = [...tabsData];
      if (copy[activeTabIndex] && copy[activeTabIndex].bigMonitor[0]) {
        copy[activeTabIndex].bigMonitor[0].value = payload.value;
        copy[activeTabIndex].bigMonitor[0].state = true;
        setTabsData(copy);
      }
    } else if (eventType === 'alarm_trigger') {
      const copy = [...tabsData];
      if (copy[activeTabIndex]) {
        copy[activeTabIndex].state = !payload.active;
        setTabsData(copy);
      }
    }
  };

  const currentTab = tabsData[activeTabIndex] || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#73c1d9] via-[#66b0c7] to-[#2a849f] text-slate-800 pb-28 pt-0 font-sans select-none">
      {/* Header AppBar matching Flutter Mobile App */}
      <Header
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenQrScanner={() => setIsQrScannerOpen(true)}
        tabsData={tabsData}
        activeTabIndex={activeTabIndex}
        onSelectTab={(idx) => setActiveTabIndex(idx)}
        onEditTab={(idx) => {
          setActiveTabIndex(idx);
          setIsEditTab(true);
          setIsTabModalOpen(true);
        }}
      />

      {/* Main Body View */}
      <main className="max-w-xl mx-auto px-2 pt-3 space-y-3">
        {/* PWA Installation Banner */}
        <PwaInstaller />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-white space-y-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold">Đang tải dữ liệu từ Server Minatek...</p>
          </div>
        ) : currentTab ? (
          <div className="space-y-3">
            {/* Section 1: Big Monitor Card (Matching Flutter home.dart lines 179-314) */}
            <section className="bg-cyan-200/30 rounded-[20px] p-3 text-white border border-white/20">
              <h2 className="text-lg font-semibold text-white text-center mb-2 font-sans">
                Giám sát trạng thái
              </h2>

              <div className="overflow-x-auto no-scrollbar flex items-center gap-3 py-1 px-1">
                {currentTab.bigMonitor && currentTab.bigMonitor.map((bm, bIdx) => (
                  <div
                    key={bm.id || bIdx}
                    onTouchStart={() => startLongPress('big', bIdx, bm.name)}
                    onTouchEnd={cancelLongPress}
                    onMouseDown={() => startLongPress('big', bIdx, bm.name)}
                    onMouseUp={cancelLongPress}
                    onMouseLeave={cancelLongPress}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setEditingItemType('big');
                      setEditingItemIndex(bIdx);
                      setEditingInitialName(bm.name);
                    }}
                    className="bg-gradient-to-r from-[#02cce7] via-[#01b2c9] to-[#00b2c1] text-white rounded-[20px] p-3 shadow-md min-w-[210px] shrink-0 flex items-center gap-2.5 relative active:scale-98 transition-transform"
                  >
                    <div
                      className={`w-5 h-5 rounded-full shrink-0 border border-white/40 shadow-sm ${
                        bm.state ? 'bg-[#4AD54E] animate-pulse' : 'bg-rose-500'
                      }`}
                    ></div>
                    <div className="flex flex-col justify-center">
                      <div className="text-base font-semibold text-white leading-tight">
                        {bm.name}
                      </div>
                      <div className="text-xs font-medium text-cyan-100">
                        {bm.state ? (bm.value || 'Hoạt động') : 'Tạm dừng'}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Big Monitor Button (+) */}
                <button
                  onClick={() => setIsBigMonitorModalOpen(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-white rounded-[20px] h-[64px] min-w-[64px] flex items-center justify-center shadow-md transition-all shrink-0"
                  title="Thêm giám sát trạng thái"
                >
                  <Plus className="w-8 h-8 stroke-[2.5]" />
                </button>
              </div>

              {/* Section 2: Small Monitor / Sensors (Matching Flutter home.dart lines 315-407) */}
              <div className="mt-3 overflow-x-auto no-scrollbar flex items-center gap-2 py-1 px-1">
                {currentTab.smallMonitor && currentTab.smallMonitor.map((sm, sIdx) => (
                  <div
                    key={sm.id || sIdx}
                    onTouchStart={() => startLongPress('small', sIdx, sm.name)}
                    onTouchEnd={cancelLongPress}
                    onMouseDown={() => startLongPress('small', sIdx, sm.name)}
                    onMouseUp={cancelLongPress}
                    onMouseLeave={cancelLongPress}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setEditingItemType('small');
                      setEditingItemIndex(sIdx);
                      setEditingInitialName(sm.name);
                    }}
                    className="bg-gradient-to-r from-[#02cce7] via-[#01b2c9] to-[#01aac1] text-white rounded-[20px] p-3 shadow-md min-w-[130px] shrink-0 flex flex-col items-center justify-center text-center space-y-1.5 active:scale-98 transition-transform"
                  >
                    <div className="text-sm font-semibold text-white leading-tight">
                      {sm.name}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border border-white/40 shadow-sm ${
                        sm.state ? 'bg-[#4AD54E] animate-pulse' : 'bg-rose-500'
                      }`}
                    ></div>
                  </div>
                ))}

                {/* Add Small Monitor Button (+) */}
                <button
                  onClick={() => setIsSmallMonitorModalOpen(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-white rounded-[20px] h-[55px] min-w-[55px] flex items-center justify-center shadow-md transition-all shrink-0"
                  title="Thêm cảm biến nhỏ"
                >
                  <Plus className="w-7 h-7 stroke-[2.5]" />
                </button>
              </div>
            </section>

            {/* Section 3: Switches Control Grid (Matching Flutter home.dart lines 408-500) */}
            <section className="bg-cyan-200/30 rounded-[20px] p-3 text-white border border-white/20 space-y-2">
              <h3 className="text-lg font-semibold text-white text-center font-sans">
                Công tắc điều khiển
              </h3>

              <div className="overflow-x-auto no-scrollbar flex items-center gap-3 py-1 px-1">
                {currentTab.switches && currentTab.switches.map((sw, swIdx) => (
                  <button
                    key={sw.id || swIdx}
                    onClick={() => handleToggleSwitch(swIdx)}
                    onTouchStart={() => startLongPress('switch', swIdx, sw.name)}
                    onTouchEnd={cancelLongPress}
                    onMouseDown={() => startLongPress('switch', swIdx, sw.name)}
                    onMouseUp={cancelLongPress}
                    onMouseLeave={cancelLongPress}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setEditingItemType('switch');
                      setEditingItemIndex(swIdx);
                      setEditingInitialName(sw.name);
                    }}
                    className={`rounded-[30px] px-5 py-3 h-[90px] min-w-[120px] shrink-0 flex flex-col items-center justify-center space-y-1 transition-all duration-300 active:scale-95 shadow-md ${
                      sw.state ? 'bg-[#01cce7]' : 'bg-[#008495]'
                    }`}
                  >
                    <Zap className={`w-8 h-8 ${sw.state ? 'text-amber-300 fill-amber-300' : 'text-white'}`} />
                    <span className="text-sm font-semibold text-white whitespace-nowrap">
                      {sw.name}
                    </span>
                  </button>
                ))}

                {/* Add Switch Button (+) */}
                <button
                  onClick={() => setIsSwitchModalOpen(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-white rounded-[30px] h-[90px] min-w-[70px] flex items-center justify-center shadow-md transition-all shrink-0"
                  title="Thêm công tắc điều khiển"
                >
                  <Plus className="w-8 h-8 stroke-[2.5]" />
                </button>
              </div>
            </section>
          </div>
        ) : null}
      </main>

      {/* Bottom Navigation matching Flutter default.dart */}
      <BottomNav
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onRefresh={fetchControlData}
        onAddDevice={() => {
          setIsEditTab(false);
          setIsTabModalOpen(true);
        }}
      />

      {/* Modals */}
      <IotSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSimulateEvent={handleSimulateEvent}
      />

      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onScanned={(deviceId) => {
          alert(`Đã kết nối mã QR thiết bị ID: ${deviceId}`);
        }}
      />

      {/* Edit Tab / Add Device Modal */}
      <TabEditModal
        isOpen={isTabModalOpen}
        onClose={() => setIsTabModalOpen(false)}
        isEdit={isEditTab}
        initialName={isEditTab && currentTab ? currentTab.devicesName : ''}
        onSave={(name) => {
          if (isEditTab) {
            const updated = updateTab(activeTabIndex, name);
            setTabsData([...updated]);
            sendControlAction({ action: 'edit_tab', tabIndex: activeTabIndex, name });
          } else {
            const updated = addTab(name);
            setTabsData([...updated]);
            setActiveTabIndex(updated.length - 1);
            sendControlAction({ action: 'add_tab', name });
          }
        }}
        onDelete={() => {
          const updated = deleteTab(activeTabIndex);
          setTabsData([...updated]);
          setActiveTabIndex(0);
          sendControlAction({ action: 'delete_tab', tabIndex: activeTabIndex });
        }}
      />

      {/* Add Big Monitor Modal */}
      <AddMonitorModal
        isOpen={isBigMonitorModalOpen}
        onClose={() => setIsBigMonitorModalOpen(false)}
        title="Thêm thiết bị giám sát lớn"
        onSave={(name) => {
          const updated = addBigMonitorStore(activeTabIndex, name);
          setTabsData([...updated]);
          sendControlAction({ action: 'add_big_monitor', tabIndex: activeTabIndex, name });
        }}
      />

      {/* Add Small Monitor Modal */}
      <AddMonitorModal
        isOpen={isSmallMonitorModalOpen}
        onClose={() => setIsSmallMonitorModalOpen(false)}
        title="Thêm cảm biến nhỏ"
        onSave={(name) => {
          const updated = addSmallMonitorStore(activeTabIndex, name);
          setTabsData([...updated]);
          sendControlAction({ action: 'add_small_monitor', tabIndex: activeTabIndex, name });
        }}
      />

      {/* Add Switch Modal */}
      <AddSwitchModal
        isOpen={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
        onSave={(name, bid) => {
          const updated = addSwitchStore(activeTabIndex, name, bid);
          setTabsData([...updated]);
          sendControlAction({ action: 'add_switch', tabIndex: activeTabIndex, name, bid });
        }}
      />

      {/* Generic Item Edit/Delete Modal (for Long Press / Context Menu) */}
      {editingItemType && (
        <EditItemModal
          isOpen={!!editingItemType}
          onClose={() => setEditingItemType(null)}
          initialName={editingInitialName}
          title={
            editingItemType === 'big'
              ? 'Điều chỉnh giám sát lớn'
              : editingItemType === 'small'
              ? 'Điều chỉnh cảm biến'
              : 'Điều chỉnh công tắc'
          }
          onSave={(newName) => {
            if (editingItemType === 'big') {
              const updated = editBigMonitorStore(activeTabIndex, editingItemIndex, newName);
              setTabsData([...updated]);
            } else if (editingItemType === 'small') {
              const updated = editSmallMonitorStore(activeTabIndex, editingItemIndex, newName);
              setTabsData([...updated]);
            } else if (editingItemType === 'switch') {
              const updated = editSwitchStore(activeTabIndex, editingItemIndex, newName);
              setTabsData([...updated]);
            }
            setEditingItemType(null);
          }}
          onDelete={() => {
            if (editingItemType === 'big') {
              const updated = deleteBigMonitorStore(activeTabIndex, editingItemIndex);
              setTabsData([...updated]);
              sendControlAction({ action: 'delete_big_monitor', tabIndex: activeTabIndex, subIndex: editingItemIndex });
            } else if (editingItemType === 'small') {
              const updated = deleteSmallMonitorStore(activeTabIndex, editingItemIndex);
              setTabsData([...updated]);
              sendControlAction({ action: 'delete_small_monitor', tabIndex: activeTabIndex, subIndex: editingItemIndex });
            } else if (editingItemType === 'switch') {
              const updated = deleteSwitchStore(activeTabIndex, editingItemIndex);
              setTabsData([...updated]);
              sendControlAction({ action: 'delete_switch', tabIndex: activeTabIndex, subIndex: editingItemIndex });
            }
            setEditingItemType(null);
          }}
        />
      )}
    </div>
  );
}

