'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
}

export default function ParallaxImage({ src, alt }: ParallaxImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.7;
        const horizontalRate = scrolled * 0.1;
        imageRef.current.style.transform = `translate3d(${horizontalRate}px, ${rate}px, 0) scale(1.1)`;
      }
    };

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div 
      ref={imageRef}
      className="absolute inset-0 transform-gpu will-change-transform overflow-hidden"
      style={{
        transform: 'translate3d(0, 0, 0) scale(1.1)',
        transition: 'transform 0.1s ease-out'
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover w-full h-full"
        priority
        quality={100}
      />
    </div>
  );
} 