export interface DeviceControl {
  id: number;
  deviceId: number;
  bid: number;
  name: string;
  type: 'sensor' | 'button' | 'alarm';
  value: number | string;
  status: 'connect' | 'warning' | 'error';
  color?: string;
  min: number;
  max: number;
  subType?: number;
}

export interface BigMonitorItem {
  id: string;
  name: string;
  state: boolean;
  type?: string;
  value?: string | number;
}

export interface SmallMonitorItem {
  id: string;
  name: string;
  state: boolean;
  type?: string;
}

export interface SwitchItem {
  id: string;
  bid: number;
  name: string;
  state: boolean;
  type: string; // 'button' | 'output' | 'sensor'
}

export interface TabData {
  id: string;
  devicesName: string;
  state: boolean;
  bigMonitor: BigMonitorItem[];
  smallMonitor: SmallMonitorItem[];
  switches: SwitchItem[];
}

export interface DeviceData {
  id: number;
  deviceId: string;
  deviceName: string;
  status: string;
  life: number;
  ssid?: string;
  txtype?: string;
  groupId?: string;
}

// Initial Default Seed Data matching NestJS Backend DeviceControl entities
export const defaultDeviceControls: DeviceControl[] = [
  // Controls (Buttons / Switches)
  { id: 1, deviceId: 1, bid: 0, name: 'BID 0', type: 'button', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 2, deviceId: 1, bid: 5, name: 'BID 5', type: 'button', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 3, deviceId: 1, bid: 1, name: 'BID 1', type: 'button', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 4, deviceId: 1, bid: 6, name: 'BID 6', type: 'button', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 5, deviceId: 1, bid: 2, name: 'BID 2', type: 'button', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 6, deviceId: 1, bid: 7, name: 'BID 7', type: 'button', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 7, deviceId: 1, bid: 3, name: 'BID 3', type: 'button', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 8, deviceId: 1, bid: 8, name: 'BID 8', type: 'button', value: 0, status: 'connect', min: 0, max: 100 },

  // Sensors
  { id: 10, deviceId: 1, bid: 0, name: 'BID 0', type: 'sensor', value: 0.0, status: 'connect', min: 0, max: 100, subType: 0 },
  { id: 11, deviceId: 1, bid: 1, name: 'BID 1', type: 'sensor', value: 0.0, status: 'connect', min: 0, max: 100, subType: 0 },
  { id: 12, deviceId: 1, bid: 2, name: 'BID 2', type: 'sensor', value: 0.0, status: 'connect', min: 0, max: 100, subType: 0 },
  { id: 13, deviceId: 1, bid: 3, name: 'BID 3', type: 'sensor', value: 0.0, status: 'connect', min: 0, max: 100, subType: 0 },

  // Alarms
  { id: 20, deviceId: 1, bid: 0, name: 'BID 0', type: 'alarm', value: 1, status: 'warning', min: 0, max: 100 },
  { id: 21, deviceId: 1, bid: 1, name: 'BID 1', type: 'alarm', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 22, deviceId: 1, bid: 2, name: 'BID 2', type: 'alarm', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 23, deviceId: 1, bid: 3, name: 'BID 3', type: 'alarm', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 24, deviceId: 1, bid: 4, name: 'BID 4', type: 'alarm', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 25, deviceId: 1, bid: 5, name: 'BID 5', type: 'alarm', value: 0, status: 'connect', min: 0, max: 100 },
  { id: 26, deviceId: 1, bid: 6, name: 'BID 6', type: 'alarm', value: 0, status: 'connect', min: 0, max: 100 },
];

// Initial Default Seed Data for Minatek Smart IoT
const defaultTabs: TabData[] = [
  {
    id: 'tab-1',
    devicesName: 'STM32',
    state: true,
    bigMonitor: [
      { id: 'bm-1', name: 'Bơm Nước Chính', state: true, value: 'Chạy ổn định' },
      { id: 'bm-2', name: 'Quạt Thông Gió', state: true, value: 'Tốc độ 85%' },
      { id: 'bm-3', name: 'Hệ Thống Làm Lạnh', state: false, value: 'Tạm dừng' },
    ],
    smallMonitor: [
      { id: 'sm-1', name: 'Cảm Biến Nhiệt', state: true, type: 'sensor' },
      { id: 'sm-2', name: 'Cảm Biến Áp Suất', state: true, type: 'sensor' },
      { id: 'sm-3', name: 'Cảnh Báo Quá Tải', state: false, type: 'alarm' },
      { id: 'sm-4', name: 'Rò Rỉ Điện', state: false, type: 'alarm' },
    ],
    switches: [
      { id: 'sw-1', bid: 0, name: 'BID 0', state: false, type: 'button' },
      { id: 'sw-2', bid: 5, name: 'BID 5', state: false, type: 'button' },
      { id: 'sw-3', bid: 1, name: 'BID 1', state: false, type: 'button' },
      { id: 'sw-4', bid: 6, name: 'BID 6', state: false, type: 'button' },
    ],
  },
  {
    id: 'tab-2',
    devicesName: 'HTGas Q8 test',
    state: true,
    bigMonitor: [
      { id: 'bm-201', name: 'Máy Phát Điện Dự Phòng', state: true, value: 'Đang chờ' },
    ],
    smallMonitor: [
      { id: 'sm-201', name: 'Cảm Biến Khói', state: true, type: 'sensor' },
    ],
    switches: [
      { id: 'sw-201', bid: 0, name: 'BID 0', state: true, type: 'button' },
    ],
  },
  {
    id: 'tab-3',
    devicesName: 'Parc Mall C',
    state: true,
    bigMonitor: [],
    smallMonitor: [],
    switches: [],
  },
];

let globalTabs: TabData[] = [...defaultTabs];

const saveToLocalStorage = (tabs: TabData[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('tabsData', JSON.stringify(tabs));
    } catch (e) {
      console.error('Failed saving tabsData to localStorage', e);
    }
  }
};

export const getMinatekTabs = (): TabData[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('tabsData');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          globalTabs = parsed;
          return globalTabs;
        }
      }
    } catch (e) {
      console.error('Failed reading tabsData from localStorage', e);
    }
  }
  return globalTabs;
};

export const setMinatekTabs = (tabs: TabData[]) => {
  globalTabs = tabs;
  saveToLocalStorage(globalTabs);
  return globalTabs;
};

export const toggleSwitchState = (tabIndex: number, switchIndex: number): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].switches[switchIndex]) {
    globalTabs[tabIndex].switches[switchIndex].state = !globalTabs[tabIndex].switches[switchIndex].state;
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const addTab = (name: string): TabData[] => {
  const newTab: TabData = {
    id: `tab-${Date.now()}`,
    devicesName: name,
    state: true,
    bigMonitor: [],
    smallMonitor: [],
    switches: [],
  };
  globalTabs.push(newTab);
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const updateTab = (index: number, name: string): TabData[] => {
  if (globalTabs[index]) {
    globalTabs[index].devicesName = name;
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const deleteTab = (index: number): TabData[] => {
  if (globalTabs[index]) {
    globalTabs.splice(index, 1);
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const addBigMonitor = (tabIndex: number, name: string): TabData[] => {
  if (globalTabs[tabIndex]) {
    globalTabs[tabIndex].bigMonitor.push({
      id: `bm-${Date.now()}`,
      name,
      state: true,
      value: 'Hoạt động',
    });
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const editBigMonitor = (tabIndex: number, monitorIndex: number, name: string): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].bigMonitor[monitorIndex]) {
    globalTabs[tabIndex].bigMonitor[monitorIndex].name = name;
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const deleteBigMonitor = (tabIndex: number, monitorIndex: number): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].bigMonitor[monitorIndex]) {
    globalTabs[tabIndex].bigMonitor.splice(monitorIndex, 1);
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const addSmallMonitor = (tabIndex: number, name: string): TabData[] => {
  if (globalTabs[tabIndex]) {
    globalTabs[tabIndex].smallMonitor.push({
      id: `sm-${Date.now()}`,
      name,
      state: true,
      type: 'sensor',
    });
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const editSmallMonitor = (tabIndex: number, monitorIndex: number, name: string): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].smallMonitor[monitorIndex]) {
    globalTabs[tabIndex].smallMonitor[monitorIndex].name = name;
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const deleteSmallMonitor = (tabIndex: number, monitorIndex: number): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].smallMonitor[monitorIndex]) {
    globalTabs[tabIndex].smallMonitor.splice(monitorIndex, 1);
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const addSwitch = (tabIndex: number, name: string, bid?: number): TabData[] => {
  if (globalTabs[tabIndex]) {
    const nextBid = bid !== undefined ? bid : globalTabs[tabIndex].switches.length;
    globalTabs[tabIndex].switches.push({
      id: `sw-${Date.now()}`,
      bid: nextBid,
      name,
      state: false,
      type: 'button',
    });
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const editSwitch = (tabIndex: number, switchIndex: number, name: string): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].switches[switchIndex]) {
    globalTabs[tabIndex].switches[switchIndex].name = name;
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};

export const deleteSwitch = (tabIndex: number, switchIndex: number): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].switches[switchIndex]) {
    globalTabs[tabIndex].switches.splice(switchIndex, 1);
  }
  saveToLocalStorage(globalTabs);
  return [...globalTabs];
};


