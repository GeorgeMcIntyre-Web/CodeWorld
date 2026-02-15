import { useState } from 'react'

function encodeUtf8(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function decodeUtf8(base64: string): string {
  try {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return new TextDecoder().decode(bytes)
  } catch {
    return ''
  }
}

export default function Base64() {
  const [encodeInput, setEncodeInput] = useState('')
  const [encodeOutput, setEncodeOutput] = useState('')
  const [decodeInput, setDecodeInput] = useState('')
  const [decodeOutput, setDecodeOutput] = useState('')

  const doEncode = () => {
    setEncodeOutput(encodeUtf8(encodeInput))
  }

  const doDecode = () => {
    setDecodeOutput(decodeUtf8(decodeInput))
  }

  return (
    <>
      <h2 className="page-header">Base64</h2>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Encode</h3>
        <textarea
          value={encodeInput}
          onChange={(e) => setEncodeInput(e.target.value)}
          placeholder="Text to encode"
          aria-label="Text to encode"
          style={{ width: '100%', minHeight: '80px', marginBottom: '0.5rem' }}
        />
        <button
          type="button"
          className="primary"
          onClick={doEncode}
          style={{ marginBottom: '0.75rem' }}
        >
          Encode
        </button>
        <textarea
          value={encodeOutput}
          readOnly
          aria-label="Base64 result"
          style={{ width: '100%', minHeight: '60px' }}
        />
      </div>

      <div className="card">
        <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Decode</h3>
        <textarea
          value={decodeInput}
          onChange={(e) => setDecodeInput(e.target.value)}
          placeholder="Base64 to decode"
          aria-label="Base64 to decode"
          style={{ width: '100%', minHeight: '80px', marginBottom: '0.5rem' }}
        />
        <button
          type="button"
          className="primary"
          onClick={doDecode}
          style={{ marginBottom: '0.75rem' }}
        >
          Decode
        </button>
        <textarea
          value={decodeOutput}
          readOnly
          aria-label="Decoded text"
          style={{ width: '100%', minHeight: '60px' }}
        />
      </div>
    </>
  )
}
