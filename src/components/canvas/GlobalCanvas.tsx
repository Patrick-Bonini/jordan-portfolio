'use client';

import { Canvas } from '@react-three/fiber';
import { usePathname } from 'next/navigation';

export default function GlobalCanvas() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        
        {/* We will add the /work page WebGL effects here next */}
        
      </Canvas>
    </div>
  );
}