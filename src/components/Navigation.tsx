'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/data/projects';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[var(--nav-overlay)] backdrop-blur-[2px] z-[110] pointer-events-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-4 right-4 w-[95vw] max-w-[850px] h-[85vh] max-h-[580px] bg-[var(--nav-surface)] backdrop-blur-3xl rounded-2xl shadow-2xl z-[120] overflow-hidden flex flex-col md:flex-row pointer-events-auto border border-[var(--nav-border)]"
          >
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose} 
              className="absolute top-5 right-6 text-[var(--nav-close)] hover:text-[var(--site-fg)] transition-colors z-[130] text-2xl cursor-pointer"
            >
              ✕
            </button>

            {/* LEFT SIDE: Project List */}
            <div className="w-full md:w-[45%] flex flex-col p-6 md:p-8 overflow-y-auto custom-scrollbar border-r border-[var(--nav-divider)]">
              <nav 
                className="flex flex-col"
                // Resets state when you move the mouse out of the list area
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setHoveredId(null);
                }}
              >
                {projects.map((project, index) => {
                  const isActive = hoveredId === project.id;
                  const isDimmed = hoveredId !== null && !isActive;

                  return (
                    <motion.div
                      key={project.id}
                      onMouseEnter={() => {
                        setHoveredProject(project.thumbnail);
                        setHoveredId(project.id);
                      }}
                      whileHover={{ x: 10 }}
                      animate={{ opacity: isDimmed ? 0.50 : 1 }}
                    >
                      <Link
                        href={`/work/${project.slug}`}
                        onClick={onClose}
                        className={`font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] text-[15px] font-[600] py-4 border-b border-[var(--nav-divider)] transition-colors flex items-center gap-4 group ${isActive ? 'text-[var(--nav-text-active)]' : 'text-[var(--nav-text-inactive)]'}`}
                      >
                        <span className={`tabular-nums text-[11px] transition-opacity ${isActive ? 'opacity-100' : 'opacity-20'}`}>
                          {String(index + 1).padStart(2, '0')} —
                        </span>
                        <span className="tracking-tight">{project.title}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* RIGHT SIDE: Preview Display */}
            <div className="hidden md:flex flex-1 bg-[var(--nav-preview-bg)] relative items-center justify-center p-12">
              <div className="w-full aspect-video relative overflow-hidden rounded-xl bg-[var(--nav-preview-card-bg)] shadow-2xl border border-[var(--nav-preview-card-border)] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {hoveredProject ? (
                    <motion.div
                      key={hoveredProject}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.85, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full relative"
                    >
                      <img src={hoveredProject} className="w-full h-full object-cover" alt="Preview" />
                      <motion.div initial={{ opacity: 0.4 }} animate={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-white/20 mix-blend-overlay pointer-events-none" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="standby"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex flex-col items-center justify-center bg-[var(--nav-standby-bg)] relative gap-4"
                    >
                      {/* Standby Visuals */}
                      <img src="/thumbnails/logoanim.gif" className="w-12 h-auto opacity-10 grayscale [filter:var(--nav-social-filter)]" alt="Standby" />
                      
                      {/* Added PREVIEW text with a technical, high-spaced look */}
                      <span className="text-[var(--nav-standby-text)] font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] text-[10px] font-bold tracking-[0.4em] mt-2 uppercase">
                        Preview Mode
                      </span>
                      
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SOCIAL LOGOS */}
              <div className="absolute bottom-8 right-10 flex gap-6 z-[130]">
                <a href="https://instagram.com/7jrdn" target="_blank" className="w-5 h-5 hover:opacity-100 opacity-30 transition-opacity">
                  <img src="/instagram.svg" alt="IG" className="w-full h-full object-contain [filter:var(--nav-social-filter)]" />
                </a>
                <a href="https://youtube.com/@7jrdn" target="_blank" className="w-5 h-5 hover:opacity-100 opacity-30 transition-opacity">
                  <img src="/youtube.svg" alt="YT" className="w-full h-full object-contain [filter:var(--nav-social-filter)]" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}