'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--site-bg)] pointer-events-auto overflow-hidden">
      
      <div 
        style={{ perspective: "1000px" }}
        className="flex flex-col items-center"
      >
        <Link href="/work" className="group cursor-pointer">
          
          {/* TILT CONTAINER */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateY,
              rotateX,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="relative w-[300px] h-[300px] mb-8 flex items-center justify-center cursor-pointer"
          >
            {/* The Logo GIF */}
            <div 
              style={{ transform: "translateZ(50px)" }}
              className="w-full h-full p-4"
            >
              <img
                src="/thumbnails/logoanim.gif"
                alt="Enter Site"
                className="w-full h-full object-contain pointer-events-none transition-all duration-500 ease-out group-hover:opacity-60 group-hover:brightness-110"
              />
            </div>
          </motion.div>
        </Link>

        {/* STATIC LABEL */}
        <p className="font-['Neue_Haas_Grotesk_Display_Pro_65_Medium',_sans-serif] text-[14.4px] font-[600] leading-[17.28px] tracking-[-0.02em] text-[var(--site-text-soft)] antialiased uppercase opacity-40 select-none cursor-default">
          Click Logo To Enter
        </p>
      </div>
    </div>
  );
}