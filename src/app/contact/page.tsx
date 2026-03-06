'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from '../layout';
import HeaderLogo from '@/components/header/HeaderLogo';
import HeaderNavLinks from '@/components/header/HeaderNavLinks';
import HeaderMenuButton from '@/components/header/HeaderMenuButton';
import HeaderThemeToggle from '@/components/header/HeaderThemeToggle';

export default function Contact() {
  const { openMenu } = useMenu();
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SENDING');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/meerjwqk", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('SUCCESS');
      } else {
        setStatus('ERROR');
      }
    } catch {
      setStatus('ERROR');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-fg)] pointer-events-auto flex flex-col">
      <header className="flex items-start justify-between px-4 md:px-8 py-[var(--header-py-mobile)] md:py-[var(--header-py-desktop)] sticky top-0 bg-[var(--site-bg)] z-50">
        <HeaderLogo alt="Back to Home" />
        <HeaderNavLinks activePage="contact" />
        <div className="flex items-center gap-1 md:gap-2">
          <HeaderThemeToggle />
          <HeaderMenuButton onClick={openMenu} />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center px-4 pt-[var(--contact-main-offset-mobile)] md:pt-[var(--contact-main-offset-desktop)] pb-12 overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'SUCCESS' ? (
            /* THANK YOU STATE */
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <h2 className="font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] font-[700] text-[40px] md:text-[64px] tracking-tighter leading-none">
                Talk soon.
              </h2>
              <p className="font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] text-[16px] md:text-[18px] font-[600] opacity-60 max-w-[400px]">
                Your message has been sent. I&apos;ll get back to you as soon as possible.
              </p>
              <Link 
                href="/work" 
                className="text-[14px] font-[700] uppercase tracking-widest border-b border-[var(--site-fg)] pb-1 hover:opacity-50 transition-opacity"
              >
                Go Back
              </Link>
            </motion.div>
          ) : (
            /* CONTACT FORM */
            <motion.form 
              key="form"
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="w-full max-w-[650px] space-y-12 font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif]"
            >
              <input type="text" name="_gotcha" className="hidden" /> {/* Honeypot */}

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[600] opacity-50">Name*</label>
                <input name="name" type="text" required className="bg-transparent border-b border-[var(--site-border)] focus:border-[var(--site-fg)] outline-none py-2 text-[18px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[600] opacity-50">Email*</label>
                  <input name="email" type="email" required className="bg-transparent border-b border-[var(--site-border)] focus:border-[var(--site-fg)] outline-none py-2 text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[600] opacity-50">Phone</label>
                  <input name="phone" type="tel" className="bg-transparent border-b border-[var(--site-border)] focus:border-[var(--site-fg)] outline-none py-2 text-[18px]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[600] opacity-50">Message*</label>
                <textarea name="message" required rows={4} className="bg-transparent border-b border-[var(--site-border)] focus:border-[var(--site-fg)] outline-none py-2 text-[18px] resize-none" />
              </div>

              <button 
                type="submit"
                disabled={status === 'SENDING'}
                className="w-full bg-[var(--site-button-bg)] text-[var(--site-button-text)] py-4 font-[700] tracking-tight hover:opacity-85 transition-opacity rounded-sm text-[16px] disabled:opacity-50"
              >
                {status === 'SENDING' ? 'Sending...' : status === 'ERROR' ? 'Error. Try again?' : 'Submit'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="flex gap-8 mt-16 md:mt-24">
          <a href="https://instagram.com/7jrdn" target="_blank" className="w-12 h-12 hover:scale-110 transition-transform">
            <img src="/instagram.svg" alt="Instagram" className="w-full h-full object-contain" />
          </a>
          <a href="https://youtube.com/@7jrdn" target="_blank" className="w-12 h-12 hover:scale-110 transition-transform">
            <img src="/youtube.svg" alt="YouTube" className="w-full h-full object-contain" />
          </a>
        </div>
      </main>
    </div>
  );
}