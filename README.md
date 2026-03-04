# CounterJS — OOP Counter with State-Driven UI

A lightweight, zero-dependency JavaScript counter component built with ES6 classes and ES Modules. Demonstrates OOP principles including encapsulation, inheritance, and polymorphism.

## Project Structure

OOP_Counter_with_State-Driven_UI/
├── index.html              # Documentation & live demo page
├── css/
│   ├── main.css            # Compiled styles (edit via SCSS source)
│   └── grid.css            # Responsive grid library (4 → 12 col)
├── js/
    ├── module/
    │   ├── counter.js          # Counter + StepCounter class definitions
│   └── main.js             # Entry point — instantiates all counters
├── sass/
│   ├── main.scss           # Root SCSS entry point
│   ├── abstracts/
│   │   ├── _variables.scss # Colours, fonts, spacing tokens
│   │   ├── _mixins.scss    # Flexbox, font-face, transform mixins
│   │   ├── _fonts.scss     # Font declarations
│   │   └── _index.scss     # Forwards all abstracts
│   ├── base/
│   │   ├── _typography.scss
│   │   └── _index.scss
│   ├── components/
│   │   ├── _counter.scss   # All counter component styles
│   │   └── _index.scss
│   └── pages/
│       ├── _home.scss      # Documentation page layout
│       └── _index.scss
└── images/
    ├── 

## Classes

### `Counter`

The base class. Renders its own markup into a container element and manages all state internally.

**Import**
```js
import { Counter } from './js/counter.js';
```

**Constructor**
```js
new Counter(selector, initialCount, label)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | `string` | — | CSS selector for the container element. Required. |
| `initialCount` | `number` | `0` | Starting count. `reset()` returns to this value. |
| `label` | `string` | `''` | Optional heading rendered inside the widget. |

**Public Methods**

| Method | Returns | Description |

|--------|---------|-------------|
| `increment()` | `void` | Increases count by 1 and updates the UI. |
| `decrement()` | `void` | Decreases count by 1. Will not go below 0. |
| `reset()` | `void` | Returns count to `initialCount`. Logs `Reset Activated!!!` to the console. |
| `getValue()` | `number` | Returns the current count without modifying state. |

**Zero State**

When `count === 0`, the decrement and reset buttons automatically receive the CSS class `counter__btn--inactive`, visually signalling they have no effect. The container also receives `is-zero` for additional style hooks.

### `StepCounter extends Counter`

Subclass that demonstrates inheritance and polymorphism. Accepts a `step` parameter and overrides `increment()` and `decrement()` to change by that amount instead of 1. All other behaviour — including the zero floor, inactive button states, and `reset()` logging — is inherited from `Counter`.

**Import**
```js
import { StepCounter } from './js/counter.js';
```

**Constructor**
```js
new StepCounter(selector, initialCount, step, label)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `selector` | `string` | — | CSS selector for the container element. Required. |
| `initialCount` | `number` | `0` | Starting count value. |
| `step` | `number` | `1` | Amount added or subtracted on each action. |
| `label` | `string` | `''` | Optional heading rendered inside the widget. |

**Overridden Methods**

| Method | Behaviour change |
|--------|-----------------|
| `increment()` | Adds `step` instead of `1`. |
| `decrement()` | Subtracts `step`, floored at `0` via `Math.max`. |

---

## Usage

### 1. Add a container in your HTML

```html

```

### 2. Load the module script

```html

```

### 3. Instantiate in `main.js`

```js
import { Counter, StepCounter } from './counter.js';

// Base counter starting at 0
const c1 = new Counter('#my-counter', 0, 'My Counter');

// Step counter — increments/decrements by 5
const s1 = new StepCounter('#step-counter', 0, 5, 'Step ×5');
```

### Multiple instances on one page

Each instance is fully independent. Pass different selectors and the class handles everything else:

```js
const c1 = new Counter('#counter-container1', 0,  'Alpha');
const c2 = new Counter('#counter-container2', 5,  'Beta');
const c3 = new Counter('#counter-container3', 10, 'Gamma');
```

---

## Styling

Styles are authored in SCSS under `/sass/` and compiled to `css/main.css`. The counter component styles live in `sass/components/_counter.scss`. Variables (colours, fonts, spacing) are defined in `sass/abstracts/_variables.scss`.

To recompile after editing SCSS:
```bash
sass sass/main.scss css/main.css --style compressed
```

Key CSS classes:

| Class | Description |
|-------|-------------|
| `.counter` | Outer wrapper element |
| `.counter__ring` | Circular display area |
| `.counter__value` | The number readout |
| `.counter__controls` | Button row container |
| `.counter__btn` | Base button style |
| `.counter__btn--inc` | Increment button modifier |
| `.counter__btn--dec` | Decrement button modifier |
| `.counter__btn--reset` | Reset button modifier |
| `.counter__btn--inactive` | Applied to dec + reset when count is 0 |
| `.counter__step-badge` | Step size pill (StepCounter only) |
| `.is-zero` | Applied to container when count equals 0 |

---

## OOP Concepts Demonstrated

- **Encapsulation** — state (`count`), DOM references, and event binding all live inside the class. Nothing leaks to global scope.
- **Abstraction** — callers only interact with `increment()`, `decrement()`, `reset()`, and `getValue()`. Internal methods (`mount()`, `update()`, `_makeBtn()`) are prefixed with `_` by convention.
- **Inheritance** — `StepCounter` uses `extends Counter` and calls `super()` to reuse the constructor and all inherited methods.
- **Polymorphism** — `StepCounter` overrides `increment()` and `decrement()` with step-aware versions while the rest of the interface stays identical to `Counter`.

---

## Browser Requirements

- Any modern browser with ES Module support (Chrome 61+, Firefox 60+, Safari 11+, Edge 16+).
- Must be served over HTTP/HTTPS — ES Modules do not work via `file://` due to CORS restrictions.

## Credits

- Zakia Sultana