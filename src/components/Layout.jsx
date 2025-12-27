import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children, showNav = true }) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/works', label: 'Works' },
    { path: '/exhibitions', label: 'Exhibitions' },
    { path: '/press', label: 'Press' },
    { path: '/biography', label: 'Biography' },
    { path: '/contact', label: 'Contact' },
  ]
  
  return (
    <div className="layout">
      {showNav && (
        <nav className="sidebar">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      
      <main className={`content ${!showNav ? 'full-width' : ''}`}>
        {children}
      </main>
    </div>
  )
}

export default Layout
