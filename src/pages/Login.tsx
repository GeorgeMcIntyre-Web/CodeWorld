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
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            Auth is not configured. Set <code>VITE_AUTH_URL</code> in your environment (e.g. your
            Cloudflare Access login URL) and rebuild to enable sign-in.
          </p>
        )}
      </div>
    </>
  )
}
