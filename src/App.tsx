import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Playground from './pages/Playground'
import Settings from './pages/Settings'
import Tools from './pages/Tools'
import Base64 from './pages/tools/Base64'
import JsonFormatter from './pages/tools/JsonFormatter'

function Layout() {
  const { user, loading, logoutUrl } = useAuth()

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="app-name">CodeWorld</h1>
        <nav className="topbar-nav" aria-label="Main">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/playground" className={({ isActive }) => (isActive ? 'active' : '')}>
            Playground
          </NavLink>
          <NavLink to="/tools" className={({ isActive }) => (isActive ? 'active' : '')}>
            Tools
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
            Settings
          </NavLink>
          {!loading &&
            (user ? (
              <>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Signed in as {user.name || user.login}
                </span>
                <a href={logoutUrl} style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Sign out
                </a>
              </>
            ) : (
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                Sign in
              </NavLink>
            ))}
        </nav>
      </header>
      <div className="body">
        <aside className="sidebar">
          <nav className="sidebar-nav" aria-label="Sidebar">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
            <NavLink to="/playground" className={({ isActive }) => (isActive ? 'active' : '')}>
              Playground
            </NavLink>
            <NavLink to="/tools" className={({ isActive }) => (isActive ? 'active' : '')}>
              Tools
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              Settings
            </NavLink>
            {!loading &&
              (user ? (
                <a href={logoutUrl}>Sign out</a>
              ) : (
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Sign in
                </NavLink>
              ))}
          </nav>
        </aside>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="playground" element={<Playground />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="tools" element={<Tools />} />
          <Route path="tools/json" element={<JsonFormatter />} />
          <Route path="tools/base64" element={<Base64 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
