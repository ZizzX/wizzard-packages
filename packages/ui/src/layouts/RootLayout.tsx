import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/api', label: 'API' },
  { to: '/examples', label: 'Examples' },
];

export default function RootLayout() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Wizzard Packages</p>
        <h1>Docs UI</h1>
        <p className="subtitle">
          Interactive documentation site for @wizzard-packages/*.
        </p>
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
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
