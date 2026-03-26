# ARCHITECTURE.md

## Design Principles

### Single-Class Design
All methods on `EnvSnap` are static. Users call `EnvSnap.collect()` and they're done.
No instantiation or config objects required.

### Data Collection Pattern
Each environment category has a corresponding private static method:

| Method | Return Type | Underlying API |
|--------|-------------|----------------|
| `getBrowserInfo()` | `BrowserInfo` | `navigator.userAgent` |
| `getOSInfo()` | `OSInfo` | `navigator.userAgent` / `platform` |
| `getScreenInfo()` | `ScreenInfo` | `screen` / `window` |
| `getDeviceInfo()` | `DeviceInfo` | `navigator` |
| `getNetworkInfo()` | `NetworkInfo` | `navigator.connection` |
| `getStorageInfo()` | `StorageInfo` | `window.*Storage` |
| `getTimezoneInfo()` | `TimezoneInfo` | `Intl.DateTimeFormat` |

`collect()` aggregates these into an `EnvironmentSnapshot`.

### Output Methods
- `format()` — Human-readable text
- `toJSON()` — JSON string
- `copyToClipboard()` — Clipboard write (Clipboard API + fallback)
- `download()` — File download via Blob + anchor tag

### Build Output
tsup produces three formats:
- **CJS** (`dist/index.js`) — Node.js / require
- **ESM** (`dist/index.mjs`) — import statements
- **IIFE** (`dist/index.global.js`) — Direct `<script>` tag loading, exposes `window.EnvSnap`

## Constraints

- **Zero external dependencies** — Only devDependencies are allowed
- **Privacy-first** — No outgoing external requests
- **`as any` usage** — Permitted only for non-standard APIs (e.g., `navigator.connection`)
- **User-Agent parsing** — Regex-based; 100% accuracy is not a goal
