import { createGenerator } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetScrollbar } from '../src'

describe('scrollbar (compatible)', async () => {
  const uno = await createGenerator({
    presets: [
      presetScrollbar({
        compatible: false,
      }),
    ],
  })

  it('scrollbar-auto', async () => {
    const { css } = await uno.generate('scrollbar')
    expect(css).toMatchSnapshot()
  })

  it('scrollbar-thin', async () => {
    const { css } = await uno.generate([
      'scrollbar',
      'scrollbar-thin',
    ])
    expect(css).toMatchSnapshot()
  })

  it('scrollbar-none', async () => {
    const { css } = await uno.generate([
      'scrollbar',
      'scrollbar-none',
    ])
    expect(css).toMatchSnapshot()
  })
})
