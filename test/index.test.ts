import { createGenerator, presetAttributify, presetUno } from 'unocss'
import { describe, expect, it } from 'vitest'
import { createAutocomplete } from '@unocss/autocomplete'
import { presetScrollbar } from '../src'

describe('scrollbar', async () => {
  const generator = await createGenerator({
    presets: [
      presetUno({
        preflight: false,
      }),
      presetAttributify(),
      presetScrollbar(),
    ],
  })

  const ac = createAutocomplete(generator)

  async function enumerateSuggestions(inputs: string[]) {
    return Object.fromEntries(await Promise.all(inputs.map(async input => [
      input,
      (await ac.suggest(input)).slice(0, 10).join(' '),
    ])))
  }

  it('scrollbar', async () => {
    const { css } = await generator.generate([
      'scrollbar',
      'scrollbar-rounded',
      'scrollbar-w-4px',
      'scrollbar-radius-2',
      'scrollbar-radius-track-4',
      'scrollbar-radius-thumb-4',
    ].join(' '))

    expect(css).toMatchSnapshot()
  })

  it('scrollbar color', async () => {
    const { css } = await generator.generate([
      'scrollbar-track-color-red',
    ].join(' '))
    expect(css).toMatchSnapshot()
  })

  it('scrollbar custom unit', async () => {
    const { css } = await generator.generate([
      'scrollbar-w-1px',
    ].join(' '))
    expect(css).toMatchSnapshot()
  })

  it('custom value to unit', async () => {
    const generator = await createGenerator({
      presets: [
        presetUno({
          preflight: false,
        }),
        presetScrollbar({
          numberToUnit: value => `${value * 2}px`,
        }),
      ],
    })
    const { css } = await generator.generate([
      'scrollbar-w-1',
      'scrollbar-thumb-radius-2px',
    ].join(' '))
    expect(css).toMatchSnapshot()
  })

  it('should work in atributify mode', async () => {
    const { css } = await generator.generate(`
<div 
  scrollbar="~ rounded w-4px radius-2 radius-track-4 radius-thumb-4">
</div>
`)
    expect(css).toMatchSnapshot()
  })

  it('var prefix', async () => {
    const generator = await createGenerator({
      presets: [
        presetUno({
          preflight: false,
        }),
        presetScrollbar({
          varPrefix: 'my-custom-prefix',
        }),
      ],
    })
    const { css } = await generator.generate([
      'scrollbar',
      'scrollbar-w-1',
      'scrollbar-thumb-radius-2px',
      'scrollbar-rounded',
    ].join(' '))
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
        "sccrollbar-thumb-radius-": "",
        "scrollbar-": "scrollbar-none scrollbar-rounded scrollbar-thin scrollbar-thumb-color-amber scrollbar-thumb-color-black scrollbar-thumb-color-blue scrollbar-thumb-color-bluegray scrollbar-thumb-color-blueGray scrollbar-thumb-color-coolgray scrollbar-thumb-color-coolGray",
        "scrollbar-radius-": "scrollbar-radius-2 scrollbar-radius-0 scrollbar-radius-1 scrollbar-radius-3 scrollbar-radius-4 scrollbar-radius-5 scrollbar-radius-6 scrollbar-radius-8 scrollbar-radius-10 scrollbar-radius-12",
        "scrollbar-thumb-": "scrollbar-thumb-radius-0 scrollbar-thumb-radius-1 scrollbar-thumb-radius-2 scrollbar-thumb-radius-3 scrollbar-thumb-radius-4 scrollbar-thumb-radius-5 scrollbar-thumb-radius-6 scrollbar-thumb-radius-8 scrollbar-thumb-radius-10 scrollbar-thumb-radius-12",
        "scrollbar-thumb-color-": "scrollbar-thumb-color-amber scrollbar-thumb-color-black scrollbar-thumb-color-blue scrollbar-thumb-color-bluegray scrollbar-thumb-color-blueGray scrollbar-thumb-color-coolgray scrollbar-thumb-color-coolGray scrollbar-thumb-color-current scrollbar-thumb-color-cyan scrollbar-thumb-color-dark",
        "scrollbar-track-color-": "scrollbar-track-color-amber scrollbar-track-color-black scrollbar-track-color-blue scrollbar-track-color-bluegray scrollbar-track-color-blueGray scrollbar-track-color-coolgray scrollbar-track-color-coolGray scrollbar-track-color-current scrollbar-track-color-cyan scrollbar-track-color-dark",
        "scrollbar-w-": "scrollbar-w-4px scrollbar-w-1px scrollbar-w-0 scrollbar-w-1 scrollbar-w-2 scrollbar-w-3 scrollbar-w-4 scrollbar-w-5 scrollbar-w-6 scrollbar-w-8",
      }
    `)
  })

  it('presetUno prefix', async () => {
    const generator = await createGenerator({
      presets: [
        presetUno({
          preflight: false,
          prefix: 'tw-',
        }),
        presetScrollbar(),
      ],
    }) 
    const {
      css,
    } = await generator.generate([
      'scrollbar',
    ])
    expect(css).toMatchSnapshot()
  })

  it('preset set prefix', async () => {
    const generator = await createGenerator({
      presets: [
        presetScrollbar({
          prefix: 'un-',
        }),
      ],
    }) 
    const {
      css,
    } = await generator.generate([
      'un-scrollbar',
    ])
    expect(css).toMatchSnapshot()
  })
})
