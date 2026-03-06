import Link from 'next/link';

type ActivePage = 'contact' | 'about' | null;

interface HeaderNavLinksProps {
  activePage?: ActivePage;
  className?: string;
}

export default function HeaderNavLinks({ activePage = null, className = '' }: HeaderNavLinksProps) {
  return (
    <nav
      className={`self-center flex gap-6 font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] text-[14px] font-[600] ${className}`.trim()}
    >
      <Link
        href="/contact"
        className={activePage === 'contact' ? 'border-b border-[var(--site-fg)]' : 'hover:opacity-60 transition-opacity'}
      >
        Contact
      </Link>
      <Link
        href="/about"
        className={activePage === 'about' ? 'border-b border-[var(--site-fg)]' : 'hover:opacity-60 transition-opacity'}
      >
        About
      </Link>
    </nav>
  );
}