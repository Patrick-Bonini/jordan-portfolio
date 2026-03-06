'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderLogoProps {
  alt: string;
  className?: string;
}

export default function HeaderLogo({ alt, className = '' }: HeaderLogoProps) {
  const pathname = usePathname();

  // If we are currently on the work page, link to landing (/).
  // Otherwise, default to linking back to /work.
  const destination = pathname === '/work' ? '/' : '/work';

  return (
    <Link
      href={destination}
      className={`group relative block w-[70px] md:w-[120px] cursor-pointer flex-shrink-0 ${className}`.trim()}
    >
      {/* Base Logo */}
      <img
        src="/logo.png"
        alt={alt}
        className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-0"
      />

      {/* Hover Logo */}
      <img
        src="/logoHOVER.png
        alt={`${alt} Hover`}
        className="absolute inset-0 w-full h-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </Link>
  );
}