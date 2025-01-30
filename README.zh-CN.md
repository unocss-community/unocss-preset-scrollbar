# unocss-preset-scrollbar

[![NPM version](https://img.shields.io/npm/v/unocss-preset-scrollbar?color=a1b858&label=)](https://www.npmjs.com/package/unocss-preset-scrollbar) ![npm](https://img.shields.io/npm/dw/unocss-preset-scrollbar)

[`unocss`](https://github.com/unocss/unocss) 的滚动预设，[一个简单的实例](https://stackblitz.com/edit/vitejs-vite-gyun7j?file=index.html)

简体中文 | [English](./README.md)

## 安装

```bash
npm i unocss-preset-scrollbar unocss -D
```

## 使用

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

上述代码将生成如下的 css 代码：

```css
/* layer: shortcuts */
.scrollbar::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-height);}
.scrollbar{overflow:auto;scrollbar-color:var(--scrollbar-thumb) var(--scrollbar-track);--scrollbar-track:#f5f5f5;--scrollbar-thumb:#ddd;--scrollbar-width:8px;--scrollbar-height:8px;--scrollbar-track-radius:4px;--scrollbar-thumb-radius:4px;}
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

你也可以使用 [`Attributify Mode`](https://github.com/unocss/unocss/tree/main/packages/preset-attributify)：

```html
<div
  scrollbar="~ rounded"
/>
```

或者使用 `@apply`

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

## 配置

|配置项|默认值|说明|
|--|--|--|
|`scrollbarWidth`|`8px`|默认的滚动条宽度|
|`scrollbarHeight`|`8px`|默认的滚动条高度|
|`scrollbarTrackRadius`|`4px`|默认的滚动条轨迹的圆角|
|`scrollbarThumbRadius`|`4px`|默认的滚动条滑块的圆角|
|`scrollbarTrackColor`|`#f5f5f5`|默认的滚动条轨迹的背景色|
|`scrollbarThumbColor`|`#ddd`|默认的滚动条滑块的背景色|
|`numberToUnit`|``value => `${value / 4}rem` ``|捕获到的数字转化成单位的方法|
|`varPrefix`|`''`|该预设生成的`css`变量的前缀|
|`prefix`|`''`|该预设生成的shortcuts加上前缀|
|`noCompatible`|`'true'`|如果为 `false` 的话 会使用 `scrollbar-width` 和 `scrollbar-color` 这两个规则，能够在Firefox上兼容, 但是`scrollbar-h`、`scrollbar-w` 以及 `scrollbar-raidus` 会失效 |

举个例子

```html
<div class="scrollbar scrollbar-w-4">
```

如果你使用默认的配置，`scrollbar-w-4` 将会转化成 `--scrollbar-width: 1rem`

而如果你自定义 `numberToUnit` 项：

```ts
export default defineConfig({
  presets: [
    presetUno(),
    presetScrollbar({
      numberToUnit: value => `${value}px`,
    }),
  ],
})
```

将转化成 `--scrollbar-width: 4px`

## 规则

### scrollbar

`scrollbar-thin`

```css
.scrollbar-thin {
  scrollbar-width: thin; // 如果 noCompatible 为 true, 则不会生成该行
  --un-scrollbar-width: 8px;
  --un-scrollbar-height: 8px;
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

使滚动条有圆角

### 颜色

`scrollbar-(track|thumb)-color-<color>`

设置轨迹或滑块的背景色

### size

`scrollbar-(radius|w|h|track-radius|thumb-radius)-(\d+?)([a-zA-Z]*?)`

|对应key|说明|
|--|--|
|raidus|设置轨迹和滑块的圆角|
|w|[设置滚动条宽度](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)|
|h|[设置滚动条高度](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)|
|track-radius|设置轨迹圆角|
|thumb-radius|设置滑块圆角|

> **注意**如果以数字结尾，则会通过 `numberToUnit` 转化成带有单位的长度，反之直接生成对应的单位长度。

> **注意**想要设置滚动条的圆角，必须先使用 `scrollbar-rounded`

例如：
- `scrollbar-w-4` -> `--scrollbar-width: 1rem`
- `scrollbar-w-4px` -> `--scrollbar-width: 4px`
- `scrollbar-w-4rem` -> `--scrollbar-width: 4rem`

## other

base [starter-ts](https://github.com/antfu/starter-ts)

## License

[MIT](./LICENSE) License © 2021 [kkopite](https://github.com/action-hong)
