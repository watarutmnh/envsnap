# 🔍 EnvSnap

[![npm version](https://badge.fury.io/js/envsnap.svg)](https://badge.fury.io/js/envsnap)
[![CI](https://github.com/watarutmnh/envsnap/workflows/CI/badge.svg)](https://github.com/watarutmnh/envsnap/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

**Lightweight JavaScript library to collect and share client environment information for bug reports**

EnvSnap instantly captures comprehensive environment information from your users' browsers, making bug reporting and debugging much easier. Perfect for support teams, QA engineers, and developers who need detailed environment context.

## ✨ Features

- 🌐 **Browser Detection** - Name, version, language, and capabilities
- 💻 **OS Information** - Operating system and architecture details  
- 🖥️ **Screen Details** - Resolution, viewport, color depth, and orientation
- 📱 **Device Info** - Touch support, mobile/tablet detection, hardware specs
- 🌍 **Network Data** - Connection type, speed, and data saver status
- 💾 **Storage Support** - LocalStorage, cookies, IndexedDB availability
- 🕐 **Timezone Info** - User's timezone and locale settings
- 📋 **Easy Sharing** - Copy to clipboard or download as file
- 🔒 **Privacy Focused** - No tracking, no external requests
- 📦 **Zero Dependencies** - Lightweight and fast
- 🎯 **TypeScript Support** - Full type definitions included

## 🚀 Quick Start

### Installation

```bash
npm install envsnap
```

### Usage

```javascript
import EnvSnap from 'envsnap';

// Collect all environment information
const envInfo = EnvSnap.collect();

// Get formatted text output
const textReport = EnvSnap.format(envInfo);

// Copy to clipboard
await EnvSnap.copyToClipboard(envInfo);

// Download as file
EnvSnap.download(envInfo, 'my-environment.txt');

// Get as JSON
const jsonData = EnvSnap.toJSON(envInfo);
```

### CDN Usage

```html
<script src="https://unpkg.com/envsnap@latest/dist/index.js"></script>
<script>
  const envInfo = EnvSnap.collect();
  console.log(EnvSnap.format(envInfo));
</script>
```

## 📊 Example Output

```
=== Environment Snapshot ===
Generated: 2025-01-20T10:30:00.000Z

📱 Browser
  • Name: Chrome 120.0
  • Language: en-US
  • Online: Yes
  • Cookies: Enabled

💻 Operating System
  • OS: macOS 14.2
  • Platform: MacIntel
  • 64-bit: Yes

🖥️ Screen
  • Resolution: 2560 × 1440
  • Viewport: 1280 × 720
  • Color Depth: 24-bit
  • Pixel Ratio: 2

📟 Device
  • Touch Support: No
  • Mobile: No
  • Tablet: No
  • CPU Cores: 8
  • Memory: 16 GB

🌐 Network
  • Connection Type: 4g
  • Downlink: 10 Mbps
  • RTT: 50 ms
  • Data Saver: Off

💾 Storage
  • Local Storage: ✓
  • Session Storage: ✓
  • IndexedDB: ✓
  • Service Worker: ✓

🕐 Timezone
  • Zone: America/New_York
  • Offset: UTC-5
  • Locale: en-US
```

## 🔧 API Reference

### `EnvSnap.collect()`

Collects all environment information and returns a structured object.

**Returns:** `EnvironmentSnapshot`

### `EnvSnap.format(data?)`

Formats the environment data as a human-readable string.

**Parameters:**
- `data` (optional): Environment data object. If not provided, collects fresh data.

**Returns:** `string`

### `EnvSnap.copyToClipboard(data?)`

Copies the formatted environment information to the clipboard.

**Parameters:**
- `data` (optional): Environment data object. If not provided, collects fresh data.

**Returns:** `Promise<void>`

### `EnvSnap.download(data?, filename?)`

Downloads the environment information as a text file.

**Parameters:**
- `data` (optional): Environment data object. If not provided, collects fresh data.
- `filename` (optional): Custom filename. Defaults to `envsnap_[timestamp].txt`

### `EnvSnap.toJSON(data?)`

Returns the environment data as a formatted JSON string.

**Parameters:**
- `data` (optional): Environment data object. If not provided, collects fresh data.

**Returns:** `string`

## 📱 TypeScript Support

EnvSnap is written in TypeScript and includes full type definitions:

```typescript
import EnvSnap, { EnvironmentSnapshot, BrowserInfo } from 'envsnap';

const envInfo: EnvironmentSnapshot = EnvSnap.collect();
const browser: BrowserInfo = envInfo.browser;
```

## 🌟 Use Cases

- **Bug Reports** - Include environment details automatically
- **Support Tickets** - Help support teams understand user environments
- **Analytics** - Gather environment statistics (privacy-friendly)
- **Testing** - Validate across different browser/OS combinations
- **Debugging** - Quickly identify environment-specific issues

## 🎮 Try the Demo

Visit our [live demo](https://watarutmnh.github.io/envsnap) to see EnvSnap in action!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with TypeScript and modern web APIs
- Bundled with [tsup](https://tsup.egoist.dev/) for optimal performance
- Inspired by the need for better debugging tools

---

Made with ❤️ for developers who care about great user experiences.