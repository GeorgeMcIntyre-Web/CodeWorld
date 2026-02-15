import { describe, it, expect } from 'vitest'
import { getTextStats } from './textStats'

describe('getTextStats', () => {
  it('returns zeros for empty string', () => {
    expect(getTextStats('')).toEqual({ words: 0, characters: 0, lines: 0 })
  })

  it('counts words, characters, and lines for single line', () => {
    expect(getTextStats('hello world')).toEqual({
      words: 2,
      characters: 11,
      lines: 1,
    })
  })

  it('counts multiple lines', () => {
    const text = 'line one\nline two\nline three'
    expect(getTextStats(text)).toEqual({
      words: 6,
      characters: 28,
      lines: 3,
    })
  })

  it('trims whitespace for word count', () => {
    expect(getTextStats('  one   two  ')).toEqual({
      words: 2,
      characters: 13,
      lines: 1,
    })
  })
})
