import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Playground from './pages/Playground'
import Settings from './pages/Settings'

function Layout() {
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
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
            Settings
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Sign in
          </NavLink>
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
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              Settings
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Sign in
            </NavLink>
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
