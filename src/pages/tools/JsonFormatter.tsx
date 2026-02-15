import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const format = () => {
    setError(null)
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const minify = () => {
    setError(null)
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
      setOutput('')
    }
  }

  return (
    <>
      <h2 className="page-header">JSON formatter</h2>
      <div className="card">
        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="json-input">
          Input
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          aria-label="JSON input"
          style={{ width: '100%', minHeight: '120px', marginBottom: '1rem' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button type="button" className="primary" onClick={format}>
            Format
          </button>
          <button type="button" onClick={minify}>
            Minify
          </button>
        </div>
        {error && (
          <p style={{ color: 'var(--text-muted)', margin: '0 0 0.5rem', fontSize: '0.875rem' }}>
            {error}
          </p>
        )}
        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="json-output">
          Output
        </label>
        <textarea
          id="json-output"
          value={output}
          readOnly
          aria-label="JSON output"
          style={{ width: '100%', minHeight: '120px' }}
        />
      </div>
    </>
  )
}
