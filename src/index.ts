import type {
  BrowserInfo,
  OSInfo,
  ScreenInfo,
  DeviceInfo,
  NetworkInfo,
  StorageInfo,
  TimezoneInfo,
  EnvironmentSnapshot
} from './types';

export * from './types';

class EnvSnap {
  /**
   * Collect all environment information
   */
  static collect(): EnvironmentSnapshot {
    return {
      timestamp: new Date().toISOString(),
      browser: this.getBrowserInfo(),
      os: this.getOSInfo(),
      screen: this.getScreenInfo(),
      device: this.getDeviceInfo(),
      network: this.getNetworkInfo(),
      storage: this.getStorageInfo(),
      timezone: this.getTimezoneInfo(),
      userAgent: navigator.userAgent
    };
  }

  /**
   * Get browser information
   */
  private static getBrowserInfo(): BrowserInfo {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    
    // Detect browser
    if (ua.indexOf('Firefox') > -1) {
      browserName = 'Firefox';
      const match = ua.match(/Firefox\/(\d+\.?\d*)/);
      browserVersion = match?.[1] || 'Unknown';
    } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
      browserName = 'Opera';
      const match = ua.match(/(?:Opera|OPR)\/(\d+\.?\d*)/);
      browserVersion = match?.[1] || 'Unknown';
    } else if (ua.indexOf('Edg') > -1) {
      browserName = 'Edge';
      const match = ua.match(/Edg\/(\d+\.?\d*)/);
      browserVersion = match?.[1] || 'Unknown';
    } else if (ua.indexOf('Chrome') > -1) {
      browserName = 'Chrome';
      const match = ua.match(/Chrome\/(\d+\.?\d*)/);
      browserVersion = match?.[1] || 'Unknown';
    } else if (ua.indexOf('Safari') > -1) {
      browserName = 'Safari';
      const match = ua.match(/Version\/(\d+\.?\d*)/);
      browserVersion = match?.[1] || 'Unknown';
    } else if (ua.indexOf('Trident') > -1) {
      browserName = 'Internet Explorer';
      const match = ua.match(/rv:(\d+\.?\d*)/);
      browserVersion = match?.[1] || 'Unknown';
    }

    return {
      name: browserName,
      version: browserVersion,
      language: navigator.language || (navigator as any).userLanguage || 'Unknown',
      languages: navigator.languages || [navigator.language || (navigator as any).userLanguage || 'Unknown'],
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: (navigator as any).doNotTrack || null,
      onLine: navigator.onLine,
      platform: navigator.platform,
      vendor: navigator.vendor
    };
  }

  /**
   * Get OS information
   */
  private static getOSInfo(): OSInfo {
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    let os = 'Unknown';
    let osVersion = '';

    // Detect OS
    if (ua.indexOf('Windows NT 10.0') > -1 || ua.indexOf('Windows NT 11') > -1) {
      os = 'Windows';
      if (ua.indexOf('Windows NT 11') > -1) {
        osVersion = '11';
      } else {
        osVersion = '10';
      }
    } else if (ua.indexOf('Windows NT 6.3') > -1) {
      os = 'Windows';
      osVersion = '8.1';
    } else if (ua.indexOf('Windows NT 6.2') > -1) {
      os = 'Windows';
      osVersion = '8';
    } else if (ua.indexOf('Windows NT 6.1') > -1) {
      os = 'Windows';
      osVersion = '7';
    } else if (ua.indexOf('Mac OS X') > -1) {
      os = 'macOS';
      const match = ua.match(/Mac OS X (\d+[._]\d+)/);
      if (match) {
        osVersion = match[1].replace(/_/g, '.');
      }
    } else if (ua.indexOf('Android') > -1) {
      os = 'Android';
      const match = ua.match(/Android (\d+\.?\d*)/);
      if (match) {
        osVersion = match[1];
      }
    } else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
      os = 'iOS';
      const match = ua.match(/OS (\d+[._]\d+)/);
      if (match) {
        osVersion = match[1].replace(/_/g, '.');
      }
    } else if (ua.indexOf('Linux') > -1) {
      os = 'Linux';
    }

    return {
      name: os,
      version: osVersion,
      platform: platform,
      is64Bit: ua.indexOf('WOW64') > -1 || 
              ua.indexOf('Win64') > -1 ||
              ua.indexOf('x64') > -1
    };
  }

  /**
   * Get screen and viewport information
   */
  private static getScreenInfo(): ScreenInfo {
    return {
      screenWidth: screen.width,
      screenHeight: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      viewportWidth: window.innerWidth || document.documentElement.clientWidth,
      viewportHeight: window.innerHeight || document.documentElement.clientHeight,
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      orientation: (screen as any).orientation ? (screen as any).orientation.type : 'Unknown'
    };
  }

  /**
   * Get device information
   */
  private static getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;
    
    return {
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      devicePixelRatio: window.devicePixelRatio || 1,
      hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
      deviceMemory: (navigator as any).deviceMemory || 'Unknown',
      isMobile: /Mobile|Android|iPhone|iPad|iPod/i.test(ua),
      isTablet: /iPad|Android(?!.*Mobile)/i.test(ua),
      vibrationSupport: 'vibrate' in navigator
    };
  }

  /**
   * Get network information
   */
  private static getNetworkInfo(): NetworkInfo {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (!connection) {
      return {
        supported: false,
        onLine: navigator.onLine
      };
    }

    return {
      supported: true,
      onLine: navigator.onLine,
      type: connection.type || 'Unknown',
      effectiveType: connection.effectiveType || 'Unknown',
      downlink: connection.downlink || 'Unknown',
      downlinkMax: connection.downlinkMax || 'Unknown',
      rtt: connection.rtt || 'Unknown',
      saveData: connection.saveData || false
    };
  }

  /**
   * Get storage availability information
   */
  private static getStorageInfo(): StorageInfo {
    const checkStorage = (storageName: 'localStorage' | 'sessionStorage'): boolean => {
      try {
        const storage = window[storageName];
        const testKey = '__storage_test__';
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    };

    return {
      localStorage: checkStorage('localStorage'),
      sessionStorage: checkStorage('sessionStorage'),
      cookies: navigator.cookieEnabled,
      indexedDB: 'indexedDB' in window,
      webSQL: 'openDatabase' in window,
      serviceWorker: 'serviceWorker' in navigator,
      cacheAPI: 'caches' in window
    };
  }

  /**
   * Get timezone information
   */
  private static getTimezoneInfo(): TimezoneInfo {
    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || (navigator as any).userLanguage || 'en-US';
    
    return {
      timezone: timezone || 'Unknown',
      timezoneOffset: now.getTimezoneOffset(),
      locale: language,
      dateFormat: new Intl.DateTimeFormat(language).format(now),
      timeFormat: new Intl.DateTimeFormat(language, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(now)
    };
  }

  /**
   * Format collected data as a readable string
   */
  static format(data?: EnvironmentSnapshot): string {
    if (!data) {
      data = this.collect();
    }

    let output = '=== Environment Snapshot ===\n';
    output += `Generated: ${data.timestamp}\n\n`;

    // Browser Information
    output += '📱 Browser\n';
    output += `  • Name: ${data.browser.name} ${data.browser.version}\n`;
    output += `  • Language: ${data.browser.language}\n`;
    output += `  • Online: ${data.browser.onLine ? 'Yes' : 'No'}\n`;
    output += `  • Cookies: ${data.browser.cookieEnabled ? 'Enabled' : 'Disabled'}\n\n`;

    // OS Information
    output += '💻 Operating System\n';
    output += `  • OS: ${data.os.name} ${data.os.version}\n`;
    output += `  • Platform: ${data.os.platform}\n`;
    output += `  • 64-bit: ${data.os.is64Bit ? 'Yes' : 'No/Unknown'}\n\n`;

    // Screen Information
    output += '🖥️ Screen\n';
    output += `  • Resolution: ${data.screen.screenWidth} × ${data.screen.screenHeight}\n`;
    output += `  • Viewport: ${data.screen.viewportWidth} × ${data.screen.viewportHeight}\n`;
    output += `  • Color Depth: ${data.screen.colorDepth}-bit\n`;
    output += `  • Pixel Ratio: ${data.device.devicePixelRatio}\n\n`;

    // Device Information
    output += '📟 Device\n';
    output += `  • Touch Support: ${data.device.touchSupport ? 'Yes' : 'No'}\n`;
    output += `  • Mobile: ${data.device.isMobile ? 'Yes' : 'No'}\n`;
    output += `  • Tablet: ${data.device.isTablet ? 'Yes' : 'No'}\n`;
    output += `  • CPU Cores: ${data.device.hardwareConcurrency}\n`;
    output += `  • Memory: ${data.device.deviceMemory !== 'Unknown' ? data.device.deviceMemory + ' GB' : 'Unknown'}\n\n`;

    // Network Information
    output += '🌐 Network\n';
    if (data.network.supported) {
      output += `  • Connection Type: ${data.network.effectiveType}\n`;
      output += `  • Downlink: ${data.network.downlink} Mbps\n`;
      output += `  • RTT: ${data.network.rtt} ms\n`;
      output += `  • Data Saver: ${data.network.saveData ? 'On' : 'Off'}\n\n`;
    } else {
      output += `  • Status: ${data.network.onLine ? 'Online' : 'Offline'}\n`;
      output += `  • Details: Not available\n\n`;
    }

    // Storage Information
    output += '💾 Storage\n';
    output += `  • Local Storage: ${data.storage.localStorage ? '✓' : '✗'}\n`;
    output += `  • Session Storage: ${data.storage.sessionStorage ? '✓' : '✗'}\n`;
    output += `  • IndexedDB: ${data.storage.indexedDB ? '✓' : '✗'}\n`;
    output += `  • Service Worker: ${data.storage.serviceWorker ? '✓' : '✗'}\n\n`;

    // Timezone Information
    output += '🕐 Timezone\n';
    output += `  • Zone: ${data.timezone.timezone}\n`;
    output += `  • Offset: UTC${data.timezone.timezoneOffset > 0 ? '-' : '+'}${Math.abs(data.timezone.timezoneOffset / 60)}\n`;
    output += `  • Locale: ${data.timezone.locale}\n\n`;

    // User Agent
    output += '🔍 User Agent\n';
    output += `  ${data.userAgent}\n`;

    return output;
  }

  /**
   * Copy formatted data to clipboard
   */
  static async copyToClipboard(data?: EnvironmentSnapshot): Promise<void> {
    const text = this.format(data);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return Promise.resolve();
      } catch (err) {
        document.body.removeChild(textarea);
        return Promise.reject(err);
      }
    }
  }

  /**
   * Download data as a text file
   */
  static download(data?: EnvironmentSnapshot, filename?: string): void {
    const text = this.format(data);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = filename || `envsnap_${timestamp}.txt`;
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  /**
   * Get data as JSON
   */
  static toJSON(data?: EnvironmentSnapshot): string {
    return JSON.stringify(data || this.collect(), null, 2);
  }
}

// Default export
export default EnvSnap;

// Named export for convenience
export { EnvSnap };