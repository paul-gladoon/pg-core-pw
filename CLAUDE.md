# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**automation-playwright-core** is a TypeScript library providing a Page Object Model (POM) framework for Playwright test automation. It exports typed element classes, fragment (reusable component) abstractions, collection helpers, and browser utilities. Consumed as an npm package by downstream test projects.

## Commands

```bash
npm run build        # Clean and compile TypeScript → /built
npm run test:local   # Run Playwright tests headed (chromium only)
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run tsc          # Type-check without emitting
```

Pre-commit hooks run `lint` and `tsc` automatically.

To run a single test: `npx playwright test tests/example.spec.ts -g "test name"`.

## Architecture

### Class Hierarchy

- **BaseElement** (abstract) — core element interaction (click, hover, get, sendKeys, waitFor*, isDisplay, isExist, scroll, screenshot). Subclassed by 9 element types in `lib/elements/`: Button, CheckBox, Img, Input, Link, RadioButton, Select, Text, Toggler.
- **BaseRootElement** — variant that searches from document root instead of parent scope.
- **BaseFragment** (abstract) — reusable page component composed from a parent locator. Supports nested fragments and an override pattern for extending methods.
- **BasePage** — page abstraction that owns browser utilities (`_actioner`, `_consoler`, `_tabber`, `_downloader`) and delegates element interactions via object-based APIs.
- **CollectionElements / CollectionFragments** — generic wrappers for querying multiple elements/fragments (`_all`, `_index`, `_where`, `_length`, `_every`, `_some`).

### Key Design Patterns

**Object-based API** — All interactions use object patterns, not method chaining:
```typescript
await page.click({button: null})
await page.get({element1: {text: null}, element2: {attribute: 'id'}})
```

**Locator chaining** — Complex nested selectors via arrays:
```typescript
[{selector: 'div'}, {selector: 'button', opts: {locatorOpts: 'first'}}]
```

**Waiter pattern** — `waiter.waitForState(callback, {timeout, interval})` for polling-based state checks beyond Playwright's built-in waiters.

### Directory Layout

- `lib/` — Source TypeScript (elements, collections, browser utilities, utils, types)
- `lib/elements/` — Element type implementations
- `lib/collection/` — CollectionElements and CollectionFragments
- `lib/browser/` — BrowserActioner, BrowserTabber, BrowserConsoler, BrowserDownloader
- `lib/utils/` — Waiter, helpers, keyboard Keys enum, evaluate functions
- `po/` — Example page objects with fragments
- `tests/` — Playwright test specs
- `fixtures.ts` — Custom Playwright fixtures (`pageProvider`)
- `built/` — Compiled output (gitignored)

### Type System

Extensive TypeScript interfaces for each element type and action (e.g., `ButtonClick`, `ButtonGet`, `ButtonGetResult`). All public interfaces exported from `lib/index.ts`. Over 500+ type exports for IDE autocomplete.

## Code Style

- No semicolons, single quotes, no trailing spaces
- 130 char line width, `bracketSpacing: false`
- `no-console` rule enforced
- File naming: kebab-case with type suffix (e.g., `browser.actioner.ts`, `collection.elements.ts`)
- Classes: PascalCase; Methods: camelCase; Private fields: `#property`

## Playwright Config

- Test timeout: 120s; viewport: 1920×1080; chromium only
- CI mode (`process.env.CI`): forbidOnly, 2 retries, 1 worker
