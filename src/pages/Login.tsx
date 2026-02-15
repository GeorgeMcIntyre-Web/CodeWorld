const AUTH_URL = import.meta.env.VITE_AUTH_URL ?? ''

export default function Login() {
  const handleSignIn = () => {
    if (AUTH_URL) {
      window.location.href = AUTH_URL
    }
  }

  return (
    <>
      <h2 className="page-header">Sign in</h2>
      <div className="card">
        {AUTH_URL ? (
          <>
            <p style={{ margin: 0 }}>Sign in to access CodeWorld.</p>
            <button
              type="button"
              className="primary"
              onClick={handleSignIn}
              style={{ marginTop: '1rem' }}
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            <p style={{ margin: 0 }}>Sign in with GitHub to access CodeWorld.</p>
            <a
              href="/api/auth/login"
              className="primary"
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                background: 'var(--accent)',
                color: '#fff',
                textDecoration: 'none',
                font: 'inherit',
                border: '1px solid var(--accent)',
              }}
            >
              Sign in with GitHub
            </a>
          </>
        )}
      </div>
    </>
  )
}
