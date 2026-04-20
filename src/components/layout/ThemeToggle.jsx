import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full bg-secondary border border-border flex items-center transition-colors hover:border-primary/40"
    >
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center transition-all duration-300 ease-out ${
          isDark ? 'left-[calc(100%-1.625rem)]' : 'left-0.5'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-accent" />
        )}
      </span>
    </button>
  );
}