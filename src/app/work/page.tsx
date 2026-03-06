'use client';

import Link from 'next/link';
import { projects } from '@/data/projects';
import { useMenu } from '../layout';
import HeaderLogo from '@/components/header/HeaderLogo';
import HeaderNavLinks from '@/components/header/HeaderNavLinks';
import HeaderMenuButton from '@/components/header/HeaderMenuButton';
import HeaderThemeToggle from '@/components/header/HeaderThemeToggle';

export default function Work() {
  const { openMenu } = useMenu();

  const leftColumn = projects.filter((_, index) => index % 2 === 0);
  const rightColumn = projects.filter((_, index) => index % 2 !== 0);

  return (
    <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-fg)] pointer-events-auto">
      
      {/* HEADER */}
      <header className="flex items-start justify-between px-4 md:px-8 py-[var(--header-py-mobile)] md:py-[var(--header-py-desktop)] sticky top-0 bg-[var(--site-bg)] z-50">
        <HeaderLogo alt="Back to Home" />
        <HeaderNavLinks />
        <div className="flex items-center gap-1 md:gap-2">
          <HeaderThemeToggle />
          <HeaderMenuButton onClick={openMenu} />
        </div>
      </header>

      {/* MASONRY GRID */}
      <main className="px-4 md:px-8 pb-12 w-full max-w-[1400px] mx-auto mt-[var(--work-main-offset-mobile)] md:mt-[var(--work-main-offset-desktop)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            {leftColumn.map((project) => (
              <Link 
                href={`/work/${project.slug}`} 
                key={project.id}
                className="block w-full relative group overflow-hidden cursor-pointer"
              >
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 p-6">
                  <p className="opacity-0 group-hover:opacity-100 text-[#f5f5ee] font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] font-[700] text-[24px] md:text-[28px] tracking-tight leading-none transition-opacity duration-300">
                    {project.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            {rightColumn.map((project) => (
              <Link 
                href={`/work/${project.slug}`} 
                key={project.id}
                className="block w-full relative group overflow-hidden cursor-pointer"
              >
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 p-6">
                  <p className="opacity-0 group-hover:opacity-100 text-[#f5f5ee] font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] font-[700] text-[24px] md:text-[28px] tracking-tight leading-none transition-opacity duration-300">
                    {project.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

    </div>
  );
}