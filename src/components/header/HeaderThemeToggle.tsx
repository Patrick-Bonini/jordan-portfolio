'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/app/layout';

interface HeaderThemeToggleProps {
  className?: string;
}

export default function HeaderThemeToggle({ className = '' }: HeaderThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When the component mounts on the client, set mounted to true
  useEffect(() => {
    setMounted(true);
  }, []);

  // While waiting for the client to take over, render a "placeholder" 
  // or a consistent default version to match the server.
  if (!mounted) {
    return (
      <div className={`self-center h-9 w-9 rounded-full border border-[var(--site-border)] p-2 opacity-0 ${className}`.trim()}>
        {/* Empty placeholder with same dimensions to prevent layout shift */}
      </div>
    );
  }

  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className={`self-center h-9 w-9 rounded-full border border-[var(--site-border)] bg-transparent p-2 cursor-pointer hover:opacity-60 transition-opacity flex items-center justify-center ${className}`.trim()}
    >
      <img
        src={theme === 'dark' ? '/day.svg' : '/night.svg'}
        alt={nextTheme === 'dark' ? 'Enable dark mode' : 'Enable light mode'}
        className="w-full h-full object-contain"
      />
    </button>
  );
}