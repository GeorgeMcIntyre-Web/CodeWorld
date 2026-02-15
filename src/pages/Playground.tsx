import { useState, useCallback } from 'react'
import { getTextStats } from '../lib/textStats'

export default function Playground() {
  const [text, setText] = useState('')
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copied' | 'failed'>('idle')
  const stats = getTextStats(text)

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        setCopyFeedback('copied')
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopyFeedback(ok ? 'copied' : 'failed')
      }
    } catch {
      setCopyFeedback('failed')
    }
    setTimeout(() => setCopyFeedback('idle'), 2000)
  }, [text])

  return (
    <>
      <h2 className="page-header">Playground</h2>
      <div className="card">
        <textarea
          placeholder="Paste or type text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text input"
        />
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <span>Words: {stats.words}</span>
          <span>Characters: {stats.characters}</span>
          <span>Lines: {stats.lines}</span>
          <button type="button" className="primary" onClick={copyToClipboard} disabled={!text}>
            Copy
          </button>
          {copyFeedback === 'copied' && <span style={{ color: 'var(--accent)' }}>Copied!</span>}
          {copyFeedback === 'failed' && <span style={{ color: '#ef4444' }}>Copy failed</span>}
        </div>
      </div>
    </>
  )
}
