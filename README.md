# envsnap

[![npm version](https://badge.fury.io/js/@watarutmnh%2Fenvsnap.svg)](https://badge.fury.io/js/@watarutmnh%2Fenvsnap)
[![CI](https://github.com/watarutmnh/envsnap/workflows/CI/badge.svg)](https://github.com/watarutmnh/envsnap/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight TypeScript library that captures browser environment information for bug reports and debugging. Collects OS, browser, screen, network, device, storage, and timezone details — all with zero dependencies and no external requests.

## Features

- **Browser detection** — Name, version, language, and capabilities
- **OS information** — Operating system and architecture details
- **Screen details** — Resolution, viewport, color depth, and orientation
- **Device info** — Touch support, mobile/tablet detection, hardware specs
- **Network data** — Connection type, speed, and data saver status
- **Storage support** — LocalStorage, cookies, IndexedDB availability
- **Timezone info** — User's timezone and locale settings
- **Easy sharing** — Copy to clipboard or download as file
- **Privacy focused** — No tracking, no external requests
- **Zero dependencies** — Lightweight and fast
- **TypeScript support** — Full type definitions included

## Requirements

- Modern browser with ES2020 support

## Setup

### npm

```bash
npm install @watarutmnh/envsnap
```

### CDN

```html
<script src="https://unpkg.com/@watarutmnh/envsnap@latest/dist/index.js"></script>
```

## Usage

### ES Modules

```typescript
import EnvSnap from '@watarutmnh/envsnap';

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

### CDN / Script Tag

```html
<script src="https://unpkg.com/@watarutmnh/envsnap@latest/dist/index.js"></script>
<script>
  const envInfo = EnvSnap.collect();
  console.log(EnvSnap.format(envInfo));
</script>
```

## API

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `EnvSnap.collect()` | — | `EnvironmentSnapshot` | Collect all environment information |
| `EnvSnap.format(data?)` | `data` (optional) | `string` | Format as human-readable text |
| `EnvSnap.copyToClipboard(data?)` | `data` (optional) | `Promise<void>` | Copy formatted info to clipboard |
| `EnvSnap.download(data?, filename?)` | `data`, `filename` (optional) | `void` | Download as text file |
| `EnvSnap.toJSON(data?)` | `data` (optional) | `string` | Get as formatted JSON string |

All methods accept an optional `data` parameter. If omitted, fresh data is collected automatically.

## Example Output

```
=== Environment Snapshot ===
Generated: 2025-01-20T10:30:00.000Z

Browser
  Name: Chrome 120.0
  Language: en-US
  Online: Yes
  Cookies: Enabled

Operating System
  OS: macOS 14.2
  Platform: MacIntel
  64-bit: Yes

Screen
  Resolution: 2560 x 1440
  Viewport: 1280 x 720
  Color Depth: 24-bit
  Pixel Ratio: 2

Device
  Touch Support: No
  Mobile: No
  Tablet: No
  CPU Cores: 8
  Memory: 16 GB

Network
  Connection Type: 4g
  Downlink: 10 Mbps
  RTT: 50 ms
  Data Saver: Off

Storage
  Local Storage: Yes
  Session Storage: Yes
  IndexedDB: Yes
  Service Worker: Yes

Timezone
  Zone: America/New_York
  Offset: UTC-5
  Locale: en-US
```

## TypeScript

EnvSnap is written in TypeScript and includes full type definitions:

```typescript
import EnvSnap, { EnvironmentSnapshot, BrowserInfo } from '@watarutmnh/envsnap';

const envInfo: EnvironmentSnapshot = EnvSnap.collect();
const browser: BrowserInfo = envInfo.browser;
```

## Demo

Visit the [live demo](https://watarutmnh.github.io/envsnap) to see EnvSnap in action.

## Development

```bash
# Build
npm run build

# Watch mode
npm run dev

# Type check
npx tsc --noEmit

# Run demo locally
npm run demo
```

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/) — Language
- [tsup](https://tsup.egoist.dev/) — Bundler (CJS / ESM / IIFE)
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
