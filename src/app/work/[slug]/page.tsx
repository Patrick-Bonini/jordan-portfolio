'use client';

import { use } from 'react';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import { useMenu } from '../../layout';
import HeaderLogo from '@/components/header/HeaderLogo';
import HeaderNavLinks from '@/components/header/HeaderNavLinks';
import HeaderThemeToggle from '@/components/header/HeaderThemeToggle';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  const { openMenu } = useMenu();

  if (!project) {
    notFound();
  }

  // --- YOUTUBE URL LOGIC ---
  let finalVideoUrl = '';
  if (project.videoUrl) {
    const videoId = project.videoUrl.split('/embed/')[1]?.split('?')[0];
    const paramsToAdd = `autoplay=1&mute=1&rel=0${videoId ? `&loop=1&playlist=${videoId}` : ''}`;
    const separator = project.videoUrl.includes('?') ? '&' : '?';
    finalVideoUrl = `${project.videoUrl.replace('youtube.com', 'youtube-nocookie.com')}${separator}${paramsToAdd}`;
  }

  return (
    <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-fg)] flex flex-col pointer-events-auto">
      
      <header className="flex items-start justify-between px-4 md:px-8 py-[var(--header-py-mobile)] md:py-[var(--header-py-desktop)] sticky top-0 bg-[var(--site-bg)] z-[100] pointer-events-auto">
        <HeaderLogo alt="Back to Landing" className="z-[110]" />
        <HeaderNavLinks />

        <div className="flex items-center gap-1 md:gap-2 max-w-[70%] md:max-w-[60%]">
          <HeaderThemeToggle />

          <button 
            onClick={openMenu}
            className="relative z-[110] font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] font-[700] text-[20px] md:text-[28px] tracking-tight leading-none text-right hover:opacity-60 transition-opacity cursor-pointer force-pointer appearance-none border-none bg-transparent outline-none"
          >
            {project.title}
          </button>
        </div>
      </header>

      <main className="px-4 md:px-8 pb-24 w-full max-w-[1200px] mx-auto mt-[var(--work-main-offset-mobile)] md:mt-[var(--work-main-offset-desktop)] flex-grow pointer-events-auto">
        
        <div className="mb-8 md:mb-10 max-w-[520px] font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] tracking-[-0.02em] text-[var(--site-text-soft)]">
          {project.description && (
            <div className="text-[15px] md:text-[16px] font-[600] leading-[1.2] mb-5 space-y-4">
              {project.description.split('\n').filter(line => line.trim() !== "").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
          
          {project.credits && (
            <div className="text-[13px] leading-[1.2]">
              {project.credits.split('\n').map((line, i) => {
                const isHeading = line.trim().endsWith(':');
                return (
                  <p 
                    key={i} 
                    className={`${isHeading ? "font-[600]" : "font-[400] opacity-80"} ${isHeading && i > 0 ? "mt-3" : ""}`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative w-full aspect-video bg-black/5 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
          {finalVideoUrl ? (
            <iframe
              src={finalVideoUrl}
              title={project.title}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              Video link coming soon.
            </div>
          )}
        </div>

        {project.extraImage && (
          <div className="mt-4 md:mt-8 w-full flex justify-center">
            <img 
              src={project.extraImage} 
              alt={`${project.title} - Behind the scenes`} 
              className="w-[90%] md:w-[45%] h-auto object-contain"
            />
          </div>
        )}
      </main>
    </div>
  );
}