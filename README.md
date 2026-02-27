# unocss-preset-scrollbar

[![NPM version](https://img.shields.io/npm/v/unocss-preset-scrollbar?color=a1b858&label=)](https://www.npmjs.com/package/unocss-preset-scrollbar) ![npm](https://img.shields.io/npm/dw/unocss-preset-scrollbar)

a [unocss](https://github.com/unocss/unocss) preset for scrollbar，here is a [demo](https://stackblitz.com/edit/vitejs-vite-gyun7j?file=index.html)

English | [简体中文](./README.zh-CN.md)

## Installation

```bash
npm i unocss-preset-scrollbar unocss -D
```

## Usage

```ts
// unocss.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetScrollbar({
      // config
    }),
  ],
})
```

```html
<div
  class="scrollbar scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4"
/>
```

it will generate below css：

```css
/* layer: shortcuts */
.scrollbar::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-height);}
.scrollbar{overflow:auto;--scrollbar-track:#f5f5f5;--scrollbar-thumb:#ddd;--scrollbar-width:8px;--scrollbar-height:8px;--scrollbar-track-radius:4px;--scrollbar-thumb-radius:4px;}
.scrollbar-rounded::-webkit-scrollbar-thumb{border-radius:var(--scrollbar-thumb-radius);}
.scrollbar-rounded::-webkit-scrollbar-track{border-radius:var(--scrollbar-track-radius);}
.scrollbar::-webkit-scrollbar-thumb{background-color:var(--scrollbar-thumb);}
.scrollbar::-webkit-scrollbar-track{background-color:var(--scrollbar-track);}
/* layer: default */
.scrollbar-radius-2{--scrollbar-track-radius:0.5rem;--scrollbar-thumb-radius:0.5rem;}
.scrollbar-thumb-radius-4{--scrollbar-thumb-radius:1rem;}
.scrollbar-track-radius-4{--scrollbar-track-radius:1rem;}
.scrollbar-w-4px{--scrollbar-width:4px;}
```

you can also use [`Attributify Mode`](https://github.com/unocss/unocss/tree/main/packages/preset-attributify)：

```html
<div
  scrollbar="~ rounded"
/>
```

or use `@apply`

```diff
import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetScrollbar({
    }),
  ],
+  transformers: [
+    transformerDirectives(),
+  ],
})
```

```css
.my-custom-scrollbar {
  @apply scrollbar scrollbar-rounded
}
```

## Configurations

|Field|Default|Description|
|--|--|--|
|`scrollbarWidth`|`8px`|default scrollbar width|
|`scrollbarHeight`|`8px`|default scrollbar height|
|`scrollbarTrackRadius`|`4px`|default scrollbar track radius|
|`scrollbarThumbRadius`|`4px`|default scrollbar thumb radius|
|`scrollbarTrackColor`|`#f5f5f5`|default scrollbar track background color|
|`scrollbarThumbColor`|`#ddd`|default scrollbar thumb background color|
|`varPrefix`|`''`|the css variable prefix of this preset|
|`compatible`|`false`|if `true`, use `scrollbar-width` / `scrollbar-color` for Firefox compatibility. In this mode, `scrollbar-h`, `scrollbar-w` and `scrollbar-radius` may not work as expected |

`numberToUnit` and preset-level `prefix` are deprecated and removed in this PR.

for example

```html
<div class="scrollbar scrollbar-w-4">
```

`scrollbar-w-4` now follows UnoCSS built-in length parsing and generates `--scrollbar-width: 1rem`.

## Utilities

### scrollbar

`scrollbar-thin`

```css
.scrollbar-thin {
  scrollbar-width: thin; // only generated when compatible is true
  --scrollbar-width: 8px;
  --scrollbar-height: 8px;
}
```

`scrollbar-none`

```css
.scrollbar-none {
  scrollbar-width: none;
}

.scrollbar-none::-webkit-scrollbar {
  display:none;
}
```

### rounded

`scrollbar-rounded`

Make thumb and track have rounded corners

### color

`scrollbar-(track|thumb)-color-<color>`

set track or thumb background color

`scrollbar-(track|thumb)-(op|opacity)-<percent>`

set track or thumb color opacity variable

### size

`scrollbar-(radius|w|h|track-radius|thumb-radius)-<length>`

|type|description|
|--|--|
|radius|set thumb radius and track radius|
|w|[set scrollbar width](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)|
|h|[set scrollbar height](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)|
|track-radius|set track radius|
|thumb-radius|set thumb radius|

**Attention，**the length parsing follows UnoCSS built-in behavior. Numeric values (for example `4`) are converted to rem units, and explicit units (for example `4px`, `4rem`) are kept as-is.

for example：
- `scrollbar-w-4` will be `--scrollbar-width: 1rem`
- `scrollbar-w-4px` will be `--scrollbar-width: 4px`
- `scrollbar-w-4rem` will be `--scrollbar-width: 4rem`

> warning
> when `compatible` is `true`, `scrollbar-w`, `scrollbar-h`, and `scrollbar-radius` may not work in compatible engines.

## License

[MIT](./LICENSE) License © 2021 [kkopite](https://github.com/action-hong)
