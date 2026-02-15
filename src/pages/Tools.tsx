import { Link } from 'react-router-dom'

export default function Tools() {
  return (
    <>
      <h2 className="page-header">Tools</h2>
      <div className="card">
        <ul
          style={{
            margin: 0,
            paddingLeft: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <li>
            <Link to="/playground">Playground</Link> – text stats (words, characters, lines) and
            copy
          </li>
          <li>
            <Link to="/tools/json">JSON formatter</Link> – pretty-print or minify JSON
          </li>
          <li>
            <Link to="/tools/base64">Base64</Link> – encode or decode text
          </li>
        </ul>
      </div>
    </>
  )
}
