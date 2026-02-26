import { createAutocomplete } from '@unocss/autocomplete'
import { createGenerator, presetAttributify, presetWind3 } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetScrollbar } from '../src'

describe('scrollbar', async () => {
  const uno = await createGenerator({
    presets: [
      presetWind3({
        preflight: false,
      }),
      presetAttributify(),
      presetScrollbar(),
    ],
  })

  const ac = createAutocomplete(uno)

  async function enumerateSuggestions(inputs: string[]) {
    return Object.fromEntries(await Promise.all(inputs.map(async input => [
      input,
      (await ac.suggest(input)).slice(0, 10),
    ])))
  }

  it('scrollbar', async () => {
    const { css } = await uno.generate([
      'scrollbar',
      'scrollbar-rounded',
      'scrollbar-w-4px',
      'scrollbar-radius-2',
      'scrollbar-radius-track-4',
      'scrollbar-radius-thumb-4',
    ])

    expect(css).toMatchSnapshot()

    // const { css: css2 } = await uno.generate('scrollbar-color-[var(--my-custom-prefix-scrollbar-thumb)_var(--my-custom-prefix-scrollbar-track)]')
  })

  it('scrollbar color', async () => {
    const { css } = await uno.generate([
      'scrollbar-track-color-red',
      'scrollbar-track-op-80',
      'scrollbar-thumb-color-red-800',
    ])
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .scrollbar-thumb-color-red-800{--un-scrollbar-thumb-opacity:1;--scrollbar-thumb:rgb(153 27 27 / var(--un-scrollbar-thumb-opacity));}
      .scrollbar-track-color-red{--un-scrollbar-track-opacity:1;--scrollbar-track:rgb(248 113 113 / var(--un-scrollbar-track-opacity));}
      .scrollbar-track-op-80{--scrollbar-track-opacity:0.8;}"
    `)
  })

  it('scrollbar custom unit', async () => {
    const { css } = await uno.generate([
      'scrollbar-w-1px',
    ])
    expect(css).toMatchSnapshot()
  })

  it('should work in atributify mode', async () => {
    const { css } = await uno.generate(`
<div 
  scrollbar="~ rounded w-4px radius-2 radius-track-4 radius-thumb-4">
</div>
`)
    expect(css).toMatchSnapshot()
  })

  it('var prefix', async () => {
    const uno = await createGenerator({
      presets: [
        presetWind3({
          preflight: false,
        }),
        presetScrollbar({
          varPrefix: 'my-custom-prefix',
        }),
      ],
    })
    const { css } = await uno.generate([
      'scrollbar',
      'scrollbar-w-1',
      'scrollbar-thumb-radius-2px',
      'scrollbar-rounded',
    ])
    expect(css).toMatchSnapshot()
  })

  it('should provide autocomplete', async () => {
    expect(
      await enumerateSuggestions([
        'scrollbar-',
        'scrollbar-w-',
        'sccrollbar-thumb-radius-',
        'scrollbar-radius-',
        'scrollbar-track-color-',
        'scrollbar-thumb-color-',
        'scrollbar-thumb-',
      ]),
    ).toMatchInlineSnapshot(`
      {
        "sccrollbar-thumb-radius-": [],
        "scrollbar-": [
          "scrollbar-custom-property",
          "scrollbar-none",
          "scrollbar-rounded",
          "scrollbar-thin",
          "scrollbar-thumb-color-amber",
          "scrollbar-thumb-color-black",
          "scrollbar-thumb-color-blue",
          "scrollbar-thumb-color-bluegray",
          "scrollbar-thumb-color-blueGray",
          "scrollbar-thumb-color-coolgray",
        ],
        "scrollbar-radius-": [
          "scrollbar-radius-2",
          "scrollbar-radius-0",
          "scrollbar-radius-1",
          "scrollbar-radius-3",
          "scrollbar-radius-4",
          "scrollbar-radius-5",
          "scrollbar-radius-6",
          "scrollbar-radius-8",
          "scrollbar-radius-10",
          "scrollbar-radius-12",
        ],
        "scrollbar-thumb-": [
          "scrollbar-thumb-color-amber",
          "scrollbar-thumb-color-black",
          "scrollbar-thumb-color-blue",
          "scrollbar-thumb-color-bluegray",
          "scrollbar-thumb-color-blueGray",
          "scrollbar-thumb-color-coolgray",
          "scrollbar-thumb-color-coolGray",
          "scrollbar-thumb-color-current",
          "scrollbar-thumb-color-cyan",
          "scrollbar-thumb-color-dark",
        ],
        "scrollbar-thumb-color-": [
          "scrollbar-thumb-color-amber",
          "scrollbar-thumb-color-black",
          "scrollbar-thumb-color-blue",
          "scrollbar-thumb-color-bluegray",
          "scrollbar-thumb-color-blueGray",
          "scrollbar-thumb-color-coolgray",
          "scrollbar-thumb-color-coolGray",
          "scrollbar-thumb-color-current",
          "scrollbar-thumb-color-cyan",
          "scrollbar-thumb-color-dark",
        ],
        "scrollbar-track-color-": [
          "scrollbar-track-color-amber",
          "scrollbar-track-color-black",
          "scrollbar-track-color-blue",
          "scrollbar-track-color-bluegray",
          "scrollbar-track-color-blueGray",
          "scrollbar-track-color-coolgray",
          "scrollbar-track-color-coolGray",
          "scrollbar-track-color-current",
          "scrollbar-track-color-cyan",
          "scrollbar-track-color-dark",
        ],
        "scrollbar-w-": [
          "scrollbar-w-4px",
          "scrollbar-w-1px",
          "scrollbar-w-0",
          "scrollbar-w-1",
          "scrollbar-w-2",
          "scrollbar-w-3",
          "scrollbar-w-4",
          "scrollbar-w-5",
          "scrollbar-w-6",
          "scrollbar-w-8",
        ],
      }
    `)
  })

  it('presetWind3 prefix', async () => {
    const uno = await createGenerator({
      presets: [
        presetWind3({
          preflight: false,
          prefix: 'tw-',
        }),
        presetScrollbar(),
      ],
    })
    const {
      css,
    } = await uno.generate([
      'scrollbar',
    ])
    expect(css).toMatchSnapshot()
  })
})
