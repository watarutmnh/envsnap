# AGENTS.md

## About This Project (WHY)

A lightweight TypeScript library that collects browser environment information (OS, browser, screen, network, etc.) for use in bug reports and debugging. Zero external dependencies.

## Tech Stack (WHAT)

- Language: TypeScript 5.x (strict mode)
- Build: tsup (CJS / ESM / IIFE triple output)
- Target: ES2020 + DOM API
- Package: `@watarutmnh/envsnap` (npm + unpkg CDN)
- CI: GitHub Actions (Node 18.x / 20.x)

## Commands (HOW)

| Operation | Command | Description |
|-----------|---------|-------------|
| Build | `npm run build` | Output to dist/ via tsup |
| Dev | `npm run dev` | File watch + auto-rebuild |
| Type check | `npx tsc --noEmit` | TypeScript validation |
| Demo | `npm run demo` | Build then start local server |
| Publish | `npm publish` | Publish to npm (auto-builds) |

Tests are not configured (`npm test` exits with error).

## Quality Checks

- TypeScript: see `tsconfig.json` (strict + noUnusedLocals, etc.)
- Linter/Formatter: not yet configured

## Directory Structure

```
src/
  index.ts      # EnvSnap main class (static methods)
  types.ts      # All interface definitions
demo/
  index.html    # Demo page (published on GitHub Pages)
dist/           # Build artifacts (not tracked in Git)
.github/
  workflows/
    ci.yml      # CI: build + type check
    release.yml # Release: npm publish + gh-pages deploy
```

## Key Conventions

1. **Static methods only** — EnvSnap class is never instantiated
2. **No external dependencies** — Maintain zero-dependency policy
3. **Browser-only** — Designed around DOM / Navigator APIs

## References

@ARCHITECTURE.md — Design constraints
