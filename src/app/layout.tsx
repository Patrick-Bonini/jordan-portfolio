'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import './globals.css';
import GlobalCanvas from '@/components/canvas/GlobalCanvas';
import Navigation from '@/components/Navigation';

// Create a simple Context so any page can open the menu
const MenuContext = createContext({ openMenu: () => {} });
export const useMenu = () => useContext(MenuContext);

type Theme = 'light' | 'dark';

const ThemeContext = createContext({
  theme: 'light' as Theme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <html lang="en">
      <body className="bg-[var(--site-bg)] text-[var(--site-fg)] antialiased transition-colors duration-300">
        <GlobalCanvas />
        
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <MenuContext.Provider value={{ openMenu }}>
            <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
            <main className="relative z-50 min-h-screen pointer-events-auto">
              {children}
            </main>
          </MenuContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}