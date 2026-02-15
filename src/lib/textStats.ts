export interface TextStats {
  words: number
  characters: number
  lines: number
}

export function getTextStats(text: string): TextStats {
  const trimmed = text.trim()
  const characters = text.length
  const lines = text ? text.split(/\r?\n/).length : 0
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0
  return { words, characters, lines }
}
