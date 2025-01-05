'use client';

import { useEffect, useRef } from 'react';

export default function RotatingVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <video 
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/images/logorotativo.webm" type="video/webm" />
      </video>
    </div>
  );
} 