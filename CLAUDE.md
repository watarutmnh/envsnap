# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- **Build**: `npm run build` - Builds the library using tsup, outputs to `/dist` with CJS, ESM, and IIFE formats
- **Development**: `npm run dev` - Watches for changes and rebuilds automatically
- **TypeScript Check**: `npx tsc --noEmit` - Validates TypeScript without emitting files
- **Publish**: `npm publish` - Publishes to npm (prepublishOnly hook runs build)

Note: There are no tests configured yet (`npm test` exits with error).

## Architecture

EnvSnap is a single-class TypeScript library that collects browser environment information without external dependencies.

### Core Structure

**Main Class**: `EnvSnap` (src/index.ts:14-384)
- Static methods only, no instantiation needed
- Primary entry point: `collect()` returns complete `EnvironmentSnapshot`
- Each data category has dedicated private collector method (`getBrowserInfo()`, `getOSInfo()`, etc.)
- Output methods: `format()` (human-readable text), `toJSON()`, `copyToClipboard()`, `download()`

**Type System**: All interfaces defined in `src/types.ts`
- `EnvironmentSnapshot` - Main return type containing all subcategories
- Individual info types: `BrowserInfo`, `OSInfo`, `ScreenInfo`, `DeviceInfo`, `NetworkInfo`, `StorageInfo`, `TimezoneInfo`

### Build Configuration

**tsup** (tsup.config.ts:3-20):
- Outputs three formats: CommonJS, ESM, and IIFE for browser usage
- IIFE build uses global name `EnvSnap` with special footer handling for window attachment
- Minified, with sourcemaps, targets ES2020

**TypeScript** (tsconfig.json):
- Strict mode enabled with all strict checks
- Targets ES2020, uses ESNext modules
- Includes DOM APIs for browser environment access

### Distribution

- npm package: `@watarutmnh/envsnap`
- CDN available via unpkg
- Exports both default and named exports
- Full TypeScript definitions included