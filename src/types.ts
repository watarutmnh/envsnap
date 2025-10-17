export interface BrowserInfo {
  name: string;
  version: string;
  language: string;
  languages: readonly string[];
  cookieEnabled: boolean;
  doNotTrack: string | null;
  onLine: boolean;
  platform: string;
  vendor: string;
}

export interface OSInfo {
  name: string;
  version: string;
  platform: string;
  is64Bit: boolean;
}

export interface ScreenInfo {
  screenWidth: number;
  screenHeight: number;
  availWidth: number;
  availHeight: number;
  colorDepth: number;
  pixelDepth: number;
  viewportWidth: number;
  viewportHeight: number;
  documentWidth: number;
  documentHeight: number;
  orientation: string;
}

export interface DeviceInfo {
  touchSupport: boolean;
  maxTouchPoints: number;
  devicePixelRatio: number;
  hardwareConcurrency: number | string;
  deviceMemory: number | string;
  isMobile: boolean;
  isTablet: boolean;
  vibrationSupport: boolean;
}

export interface NetworkInfo {
  supported: boolean;
  onLine: boolean;
  type?: string;
  effectiveType?: string;
  downlink?: number | string;
  downlinkMax?: number | string;
  rtt?: number | string;
  saveData?: boolean;
}

export interface StorageInfo {
  localStorage: boolean;
  sessionStorage: boolean;
  cookies: boolean;
  indexedDB: boolean;
  webSQL: boolean;
  serviceWorker: boolean;
  cacheAPI: boolean;
}

export interface TimezoneInfo {
  timezone: string;
  timezoneOffset: number;
  locale: string;
  dateFormat: string;
  timeFormat: string;
}

export interface EnvironmentSnapshot {
  timestamp: string;
  browser: BrowserInfo;
  os: OSInfo;
  screen: ScreenInfo;
  device: DeviceInfo;
  network: NetworkInfo;
  storage: StorageInfo;
  timezone: TimezoneInfo;
  userAgent: string;
}

export interface EnvSnapOptions {
  format?: 'json' | 'text';
  filename?: string;
}