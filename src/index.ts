import type { Theme } from '@unocss/preset-mini'
import type { Preset, Rule } from 'unocss'
import { colorResolver, handler as h } from '@unocss/preset-mini/utils'

export interface PresetScrollbarDefaultOption {
  /**
   * default scrollbar width
   * @default '8px'
   */
  scrollbarWidth?: string
  /**
   * default scrollbar height
   * @default '8px'
   */
  scrollbarHeight?: string
  /**
   * default scrollbar track radius
   * @default '4px'
   */
  scrollbarTrackRadius?: string
  /**
   * default scrollbar thumb radius
   * @default '4px'
   */
  scrollbarThumbRadius?: string
  /**
   * default scrollbar track background color
   * @default '#f5f5f5'
   */
  scrollbarTrackColor?: string
  /**
   * default scrollbar thumb background color
   * @default '#ddd'
   */
  scrollbarThumbColor?: string
  /**
   * css variable prefix
   * @default ''
   */
  varPrefix?: string

  /**
   * if true will use scrollbar-color and scrollbar-width, rounded and scrollbar-w, scrollbar-h and scrollbar-radius will not work
   * if false, won't have any effect in Firefox
   *
   * @default false
   */
  compatible?: boolean
}

const defaultOption: Required<PresetScrollbarDefaultOption> = {
  scrollbarWidth: '8px',
  scrollbarHeight: '8px',
  scrollbarTrackRadius: '4px',
  scrollbarThumbRadius: '4px',
  scrollbarTrackColor: '#f5f5f5',
  scrollbarThumbColor: '#ddd',
  varPrefix: '',
  compatible: true,
}

const customRules = {
  'radius': ['track-radius', 'thumb-radius'],
  'w': ['width'],
  'h': ['height'],
  'track-radius': ['track-radius'],
  'thumb-radius': ['thumb-radius'],
}

export function presetScrollbar(option: PresetScrollbarDefaultOption = {}): Preset<Theme> {
  const config = {
    ...defaultOption,
    ...option,
  }
  const resolveVar = (name: string) => `--${config.varPrefix ? `${config.varPrefix}-` : ''}scrollbar-${name}`
  const variantsRE = /^(scrollbar(-track|-thumb)?):.+$/

  const compatRules: Rule<Theme>[] = config.compatible
    ? [
        [
          /^scrollbar-color-(.+)$/,
          ([_, s]) => {
            // when use scrollbar-color, ::-webkit-scrollbar styling is disabled.
            // https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar
            return {
              'scrollbar-color': h.bracket.cssvar.auto.fraction.rem(s),
            }
          },
        ],
        ['scrollbar-width-auto', { 'scrollbar-width': 'auto' }],
        ['scrollbar-width-thin', { 'scrollbar-width': 'thin' }],
      ]
    : []

  return {
    name: 'unocss-preset-scrollbar',
    shortcuts: [
      [
        'scrollbar',
        [
          { overflow: 'auto' },
          'scrollbar-custom-property',
          'scrollbar-width-auto',
          `scrollbar-color-[var(${resolveVar('thumb')})_var(${resolveVar('track')})]`,
          `scrollbar-track:scrollbar-background-color-[var(${resolveVar('track')})]`,
          `scrollbar-thumb:scrollbar-background-color-[var(${resolveVar('thumb')})]`,
          `scrollbar:scrollbar-width-[var(${resolveVar('width')})]`,
          `scrollbar:scrollbar-height-[var(${resolveVar('height')})]`,
        ],
      ],
      [
        'scrollbar-rounded',
        `
          scrollbar-track:scrollbar-border-radius-[var(${resolveVar('track-radius')})]
          scrollbar-thumb:scrollbar-border-radius-[var(${resolveVar('thumb-radius')})]
        `,
      ],
      [
        'scrollbar-thin',
        `
          scrollbar-w-8px
          scrollbar-h-8px
          scrollbar-width-thin
        `,
      ],
      [
        'scrollbar-none',
        `
          scrollbar:hidden
          scrollbar-width-none
        `,
      ],
    ],
    variants: [
      // ::-webkit-scrollbar-track
      // ::-webkit-scrollbar-thumb
      // ::-webkit-scrollbar
      (matcher) => {
        if (!variantsRE.test(matcher))
          return

        const variant = matcher.replace(variantsRE, '$1')

        return {
          matcher: matcher.slice(variant.length + 1),
          selector: (s) => {
            return `${s}::-webkit-${variant}`
          },
        }
      },
    ],
    rules: [
      ...compatRules,
      ['scrollbar-width-none', { 'scrollbar-width': 'none' }],
      ['hidden', { display: 'none' }],
      [
        'scrollbar-custom-property',
        {
          [resolveVar('track')]: config.scrollbarTrackColor,
          [resolveVar('thumb')]: config.scrollbarThumbColor,
          [resolveVar('width')]: config.scrollbarWidth,
          [resolveVar('height')]: config.scrollbarHeight,
          [resolveVar('track-radius')]: config.scrollbarTrackRadius,
          [resolveVar('thumb-radius')]: config.scrollbarThumbRadius,
        },
      ],

      [
        /^scrollbar-(thumb|track)-color-(.+)$/,
        (match, ctx) => {
          const [, type] = match
          return colorResolver(resolveVar(type), `scrollbar-${type}`)(['', match[2]], ctx)
        },
        { autocomplete: 'scrollbar-(thumb|track)-color-$colors' },
      ],
      [
        /^scrollbar-(thumb|track)-op(?:acity)?-?(.+)$/,
        ([, type, opacity]) => ({ [`${resolveVar(type)}-opacity`]: h.bracket.percent.cssvar(opacity) }),
        { autocomplete: 'scrollbar-(thumb|track)-(op|opacity)-<percent>' },
      ],

      [
        /^scrollbar-(width|height|background-color|border-radius)-(.+)$/,
        ([_, prop, value]) => {
          return {
            [`${prop}`]: h.bracket.cssvar(value),
          }
        },
      ],

      [
        new RegExp(`^scrollbar-(${Object.keys(customRules).join('|')})-(.+)$`),
        ([_, type, value]) => {
          const val = h.bracket.cssvar.numberWithUnit.px.rem(value)
          const vars = customRules[type as keyof typeof customRules].map(resolveVar)

          return vars.reduce((acc: any, k) => {
            acc[k] = val
            return acc
          }, {})
        },
        { autocomplete: `scrollbar-(${Object.keys(customRules).join('|')})-<num>` },
      ],
    ],
  }
}
