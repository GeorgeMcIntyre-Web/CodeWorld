import { useTheme } from '../hooks/useTheme'

export default function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <h2 className="page-header">Settings</h2>
      <div className="card">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <span>Theme</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
            style={{
              font: 'inherit',
              padding: '0.35rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
            }}
            aria-label="Theme"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
        <p style={{ margin: '0.75rem 0 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Theme is saved in localStorage and persists after refresh.
        </p>
      </div>
    </>
  )
}
