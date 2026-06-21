import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Search } from 'lucide-react';

const navigation = [
  { name: 'Главная', path: '/' },
  { name: 'Выставки', path: '/exhibitions' },
  { name: 'Постоянные экспозиции', path: '/collection' },
  { name: 'Новости', path: '/news' },
  { name: 'Контакты', path: '/contacts' }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-secondary">Музей истории и искусств</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-foreground hover:text-primary'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Search & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Поиск">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <button
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `block py-3 transition-colors ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-foreground hover:text-primary'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
