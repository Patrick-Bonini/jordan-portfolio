'use client';

import Link from 'next/link';
import { useMenu } from '../layout';
import HeaderLogo from '@/components/header/HeaderLogo';
import HeaderNavLinks from '@/components/header/HeaderNavLinks';
import HeaderMenuButton from '@/components/header/HeaderMenuButton';
import HeaderThemeToggle from '@/components/header/HeaderThemeToggle';

export default function About() {
  const { openMenu } = useMenu();

  return (
    <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-fg)] pointer-events-auto flex flex-col">
      
      {/* HEADER: Site-wide consistent header */}
      <header className="flex items-start justify-between px-4 md:px-8 py-[var(--header-py-mobile)] md:py-[var(--header-py-desktop)] sticky top-0 bg-[var(--site-bg)] z-50">
        <HeaderLogo alt="Back to Home" />
        <HeaderNavLinks activePage="about" />
        <div className="flex items-center gap-1 md:gap-2">
          <HeaderThemeToggle />
          <HeaderMenuButton onClick={openMenu} />
        </div>
      </header>

      {/* MAIN CONTENT: Two-column layout */}
      <main className="px-4 md:px-8 pb-24 w-full max-w-[1200px] mx-auto mt-[var(--about-main-offset-mobile)] md:mt-[var(--about-main-offset-desktop)] flex flex-col md:flex-row items-start gap-12 md:gap-20">
        
        {/* LEFT COLUMN: Large Portrait Image */}
        <div className="w-full md:w-1/2">
          <img 
            src="/bio-image.png" 
            alt="About Jordan"
            className="w-full h-auto object-cover rounded-sm"
          />
        </div>

        {/* RIGHT COLUMN: Bio Text and Contact CTA */}
        <div className="w-full md:w-1/2 font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] tracking-[-0.02em]">
          <div
            className="text-[16px] md:text-[19px] font-[600] leading-[1.3] space-y-6 text-[var(--site-text-soft)]"
          >
            <p>
              I’m Jordan, a versatile designer with a deep passion for Motion Graphics. 
              My work blends experimentation with intention, creating videos and designs 
              that are fresh and excite me personally. My focus is creating experiences 
              that not only look great, but connect meaningfully with the viewer.
            </p>
            <p>
              My design journey started with making silly YouTube videos as a kid. 
              Designing graphics and editing was my way of learning how to bring my 
              ideas to life. That spark grew into a passion for design and ever since 
              I realized I could convert said passion into a career path, I haven’t 
              looked back.
            </p>
          </div>

          {/* Contact CTA Link */}
            <div className="mt-10 md:mt-16">
            <Link 
                href="/contact" 
                className="text-[16px] md:text-[19px] font-[600] border-b-2 border-[var(--site-border)] hover:border-[var(--site-fg)] transition-colors pb-1 tracking-tight"
            >
                Contact Me
            </Link>
            
            {/* Social Logos - Positioned directly below */}
            <div className="flex gap-5 mt-6 items-center">
                <a 
                href="https://instagram.com/7jrdn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 hover:opacity-60 transition-opacity"
                >
                <img src="/instagram.svg" alt="Instagram" className="w-full h-full object-contain" />
                </a>
                <a 
                href="https://youtube.com/@7jrdn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 hover:opacity-60 transition-opacity"
                >
                <img src="/youtube.svg" alt="YouTube" className="w-full h-full object-contain" />
                </a>
            </div>
            </div>
        </div>
      </main>
    </div>
  );
}