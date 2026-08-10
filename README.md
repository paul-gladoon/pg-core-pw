# automation-playwright-core

TypeScript-based Page Object Model (POM) framework built on top of [Playwright](https://playwright.dev/). Provides typed element abstractions, reusable fragments, collection helpers, and browser utilities for building scalable test automation.

## Installation

```bash
npm install automation-playwright-core
```

## Quick Start

### 1. Define a Page Object

```typescript
import {BasePage} from 'automation-playwright-core'
import {ButtonElement, ButtonPerform, ButtonGet} from 'automation-playwright-core'
import {InputElement, InputSendKeys} from 'automation-playwright-core'

interface ILoginPagePerform {
  submitBtn?: ButtonPerform
}

interface ILoginPageSendKeys {
  emailInput?: InputSendKeys
  passwordInput?: InputSendKeys
}

interface ILoginPageGet {
  submitBtn?: ButtonGet
}

class LoginPage extends BasePage {
  private submitBtn: ButtonElement
  private emailInput: InputElement
  private passwordInput: InputElement

  constructor(browserContext, page) {
    super(browserContext, page, '#app', 'Login Page', 'https://example.com/login')
    this.submitBtn = this.init(ButtonElement, 'button[type="submit"]', 'Submit')
    this.emailInput = this.init(InputElement, '#email', 'Email input')
    this.passwordInput = this.init(InputElement, '#password', 'Password input')
  }
}
```

### 2. Create Fixtures

```typescript
import {test as base} from '@playwright/test'
import {LoginPage} from './po/login-page/login.page'

type MyFixtures = {
  pageProvider: {login: LoginPage}
}

export const test = base.extend<MyFixtures>({
  pageProvider: async ({context, page}, use) => {
    await use({
      login: new LoginPage(context, page),
    })
  },
})
```

### 3. Write Tests

```typescript
import {test} from '../fixtures'
import {Keys} from 'automation-playwright-core'

test('login flow', async ({pageProvider: {login}}) => {
  await login.goToPage()
  await login.sendKeys({emailInput: 'user@example.com'})
  await login.sendKeys({passwordInput: 'password' + Keys.ENTER})
  await login.perform({submitBtn: 'click'})
})
```

## Core Concepts

### Element Types

The framework provides 9 typed element classes, each with type-safe interfaces for every action:

| Element | Class | Use Case |
|---------|-------|----------|
| Button | `ButtonElement` | Buttons, clickable elements |
| CheckBox | `CheckBoxElement` | Checkbox inputs |
| Image | `ImgElement` | Image elements |
| Input | `InputElement` | Text input fields |
| Link | `LinkElement` | Anchor/hyperlinks |
| RadioButton | `RadioButtonElement` | Radio button groups |
| Select | `SelectElement` | Dropdown selects |
| Text | `TextElement` | Text content |
| Toggler | `TogglerElement` | Toggle switches |

Every element supports: `perform` (click / hover / scroll), `get`, `isDisplay`, `isExist`, `getScreenshot`, `waitForDataState`, `waitForDisplayedState`. Elements like Input, CheckBox, RadioButton, Select, and Toggler also support `sendKeys`.

Verb restrictions: CheckBox, RadioButton, and Toggler do not support the `'click'` verb, and Select supports neither `'click'` nor `'hover'` — use `sendKeys` to change their state. These restrictions are enforced both by the per-element `*Perform` types and at runtime.

### Object-Based API

All interactions use an object pattern. For actions, pass a verb string (`'click' | 'hover' | 'scroll'`) or an `{_action: <verb>, ...options}` object when Playwright options are needed:

```typescript
// Click with defaults
await page.perform({submitBtn: 'click'})

// Get element data
await page.get({submitBtn: {text: null, attribute: 'class'}})

// Hover with options
await page.perform({submitBtn: {_action: 'hover', force: true}})

// Scroll into view (accepts {timeout})
await page.perform({submitBtn: {_action: 'scroll', timeout: 5000}})

// Check visibility
await page.isDisplay({submitBtn: null})

// Wait for a data condition
await page.waitForDataState({submitBtn: {_where: {attribute: {class: 'active'}}, _includes: true}}, 5000)
```

### Fragments (Reusable Components)

Fragments represent reusable UI components with their own nested elements and sub-fragments:

```typescript
import {BaseFragment} from 'automation-playwright-core'
import {TextElement, TextGet, TextPerform} from 'automation-playwright-core'

interface IHeaderPerform {
  title?: TextPerform
}

interface IHeaderGet {
  title?: TextGet
}

class HeaderFragment extends BaseFragment {
  private title: TextElement

  constructor(page, parentLocator, fragmentRootSelector = 'header', name = 'Header', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.title = this.init(TextElement, 'h1', 'Title')
  }
}
```

Fragments are initialized in pages or other fragments via `this.init()`:

```typescript
this.header = this.init(HeaderFragment, 'header.hero', 'Header')
```

### Collections

**CollectionElements** — multiple elements of the same type:

```typescript
import {CollectionElements} from 'automation-playwright-core'
import {TextElement} from 'automation-playwright-core'

// In page constructor:
this.navItems = this.initCollection(CollectionElements, TextElement, '.nav-item', 'Nav items')

// Query methods:
await page.perform({navItems: {_action: 'click'}})                        // click all
await page.perform({navItems: {_action: 'click', _index: 1}})             // by index
await page.perform({navItems: {_action: 'click', _where: {text: 'API'}}}) // by condition
await page.perform({navItems: {_action: 'scroll', _index: 5}})            // scroll to item
await page.perform({navItems: {_action: 'hover', _index: 1, force: true}}) // verb + options
await page.get({navItems: {_length: null}})                               // get count
await page.get({navItems: {_action: {text: null}}})                       // get all texts
```

**CollectionFragments** — multiple fragment instances:

```typescript
import {CollectionFragments} from 'automation-playwright-core'

// In fragment constructor:
this.sections = this.initCollection(CollectionFragments, SectionFragment, '.section', 'Sections')

// Deep querying through fragment collections:
await page.get({footer: {sections: {items: {_action: {text: null}}}}})
await page.perform({footer: {sections: {_where: {title: {text: 'Learn'}}, items: {_action: 'click', _index: 0}}}})
```

Collection query modifiers: `_action`, `_index`, `_where`, `_length`, `_every`, `_some`, `_includes`.

### Migrating from 1.x

Version 2.0.0 replaces the `click`, `hover`, and `scroll` methods with a single `perform` method:

```typescript
// 1.x                                              // 2.x
await page.click({submitBtn: null})                 await page.perform({submitBtn: 'click'})
await page.hover({menu: {force: true}})             await page.perform({menu: {_action: 'hover', force: true}})
await page.scroll({footer: null})                   await page.perform({footer: 'scroll'})
await page.click({navItems: {_action: null}})       await page.perform({navItems: {_action: 'click'}})
```

- The `IXxxClick`/`IXxxHover`/`IXxxScroll` page-object interfaces merge into a single `IXxxPerform`; the `ButtonClick`-style type aliases are replaced by `ButtonPerform`-style unions.
- For collections, `_action` now holds the verb, and Playwright options sit at the same level as `_index`/`_where`.
- Collections now support the `'scroll'` verb.

### Locator Chaining

Support for complex nested selectors using arrays:

```typescript
this.apiItem = this.init(
  ButtonElement,
  [
    {selector: '.navbar__title', opts: {selectorOpts: {hasText: 'Playwright'}}},
    '..',   // parent traversal
    '..',
    {selector: 'a', opts: {selectorOpts: {hasText: 'API'}}},
  ],
  'API Link'
)
```

### Root Element Search

Use `searchFromDOMRoot: true` to search from the document root instead of the parent scope:

```typescript
this.modal = this.init(ButtonElement, '.modal', 'Modal', {searchFromDOMRoot: true})
```

### Browser Utilities

Accessible via page instance:

```typescript
// Keyboard actions
await page._actioner.sendKeys([Keys.CTRL, Keys.A])

// Tab management
await page._tabber.sendKeys({switchTab: {url: 'https://example.com'}})
await page._tabber.sendKeys({newTab: 'https://example.com'})
await page._tabber.sendKeys({navigateToUrl: 'https://example.com'})
await page._tabber.sendKeys({setWindowSize: {width: 1920, height: 1080}})
await page._tabber.sendKeys({refresh: true})
await page._tabber.sendKeys({switchTab: {defaultTab: true}})
await page._tabber.get({windowSize: null})

// Console message capture
await page._consoler.get({readyState: null})

// Download handling
await page._downloader.sendKeys({...})
```

### Waiter

Custom polling utility for state checks beyond Playwright's built-in waiters:

```typescript
import {waiter} from 'automation-playwright-core'

await waiter.waitForState(async () => {
  // return true when condition is met
  return someCondition
}, {timeout: 5000, interval: 500})
```

### Keys Enum

Full keyboard key mapping for `sendKeys`:

```typescript
import {Keys} from 'automation-playwright-core'

await page.sendKeys({searchInput: 'query' + Keys.ENTER})
```

Includes: letters (A-Z), numbers (0-9), control keys (Enter, Escape, Shift, Ctrl, Alt, Meta), arrows, function keys (F1-F12), numpad, and more.

## Development

### Scripts

```bash
npm run build        # Clean and compile TypeScript
npm run test:local   # Run tests in headed browser (chromium)
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run tsc          # Type-check without emitting
```

### Run a Single Test

```bash
npx playwright test tests/example.spec.ts -g "test name"
```

### Code Style

- No semicolons, single quotes, no trailing spaces
- 130 character line width, `bracketSpacing: false`
- `no-console` rule enforced
- Pre-commit hooks run `lint` and `tsc`

## Project Structure

```
lib/                    # Source library
├── base.element.ts     # Core element abstraction
├── base.page.ts        # Base page class
├── base.fragment.ts    # Base fragment class
├── base.types.ts       # Shared type definitions
├── index.ts            # Barrel export
├── elements/           # Element implementations (9 types)
├── collection/         # CollectionElements, CollectionFragments
├── browser/            # BrowserActioner, BrowserTabber, BrowserConsoler, BrowserDownloader
└── utils/              # Waiter, helpers, Keys enum, evaluate functions
po/                     # Example page objects
tests/                  # Playwright test specs
fixtures.ts             # Custom Playwright fixtures
```

## License

ISC
