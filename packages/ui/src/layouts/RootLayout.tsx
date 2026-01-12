import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/api', label: 'API' },
  { to: '/examples', label: 'Examples' },
];

export default function RootLayout() {
  return (
    <div className="page">
      <div className="page-bg" aria-hidden="true" />
      <header className="hero">
        <div className="hero-top">
          <div className="brand">
            <span className="brand-mark" />
            <span>Wizzard Packages</span>
          </div>
          <nav className="nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' nav-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="hero-body">
          <div className="hero-copy">
            <p className="eyebrow">Documentation Hub</p>
            <h1>Docs UI</h1>
            <p className="subtitle">
              Interactive documentation experience for the
              @wizzard-packages/* ecosystem.
            </p>
            <div className="hero-actions">
              <NavLink to="/api" className="button button--primary">
                Explore API
              </NavLink>
              <NavLink to="/examples" className="button button--ghost">
                View Examples
              </NavLink>
            </div>
          </div>
          <div className="hero-panel">
            <p className="panel-label">Now live</p>
            <h2>Typedoc + Live Recipes</h2>
            <p className="panel-copy">
              Browse generated API markdown, then jump straight into example
              flows that match your use case.
            </p>
            <div className="panel-meta">
              <span>Design refresh</span>
              <span>Dev preview</span>
              <span>v0.1.0</span>
            </div>
          </div>
        </div>
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
