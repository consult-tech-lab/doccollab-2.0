import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/ambient-ai', label: 'Ambient AI' },
  { to: '/session', label: 'Live Session' },
  { to: '/compliance', label: 'Security' },
  { to: '/devices', label: 'Devices' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/session" className="hidden sm:block">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-full">
              Launch Demo <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-3 space-y-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 text-sm font-medium rounded-lg ${
                    isActive ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-secondary'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}