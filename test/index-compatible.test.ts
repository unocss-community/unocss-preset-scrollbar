import { describe, expect, it } from 'vitest'
import { createGenerator } from 'unocss'
import { presetScrollbar } from '../src'

describe('scrollbar (compatible)', async () => {
  const generator = await createGenerator({
    presets: [
      presetScrollbar({
        noCompatible: false,
      }),
    ],
  })

  it('scrollbar-auto', async () => {
    const { css } = await generator.generate('scrollbar')
    expect(css).toMatchSnapshot()
  })

  it('scrollbar-thin', async () => {
    const { css } = await generator.generate([
      'scrollbar',
      'scrollbar-thin',
    ])
    expect(css).toMatchSnapshot()
  })

  it('scrollbar-none', async () => {
    const { css } = await generator.generate([
      'scrollbar',
      'scrollbar-none',
    ])
    expect(css).toMatchSnapshot()
  })

})
