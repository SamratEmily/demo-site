"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DemoVideoProps {
  videoSrc: string;
  poster: { src: string; width: number; height: number; alt: string };
  playLabel: string;
  videoLabel: string;
  fallbackLabel: string;
  /** Preload the poster (use for above-the-fold placement only). */
  preload?: boolean;
}

/**
 * Shows a real screenshot with a play button. The video file is only
 * requested after the visitor presses play (CLAUDE.md §10).
 */
export function DemoVideo({
  videoSrc,
  poster,
  playLabel,
  videoLabel,
  fallbackLabel,
  preload = false,
}: DemoVideoProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The play button disappears, so hand keyboard focus to the video.
  useEffect(() => {
    if (playing) videoRef.current?.focus();
  }, [playing]);

  if (playing) {
    return (
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        autoPlay
        playsInline
        aria-label={videoLabel}
        className="aspect-video w-full bg-black"
      >
        <a href={videoSrc}>{fallbackLabel}</a>
      </video>
    );
  }

  return (
    <div className="relative">
      <Image
        src={poster.src}
        width={poster.width}
        height={poster.height}
        alt={poster.alt}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : undefined}
        sizes="(min-width: 1024px) 640px, 100vw"
        className="block h-auto w-full"
      />
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={playLabel}
        className="group/play absolute inset-0 flex items-center justify-center focus-visible:outline-none"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-brand-navy/85 text-white shadow-lg ring-brand-cyan transition-transform group-hover/play:scale-105 group-focus-visible/play:ring-4 group-active/play:scale-95">
          <Play className="ml-1 size-7 fill-current" aria-hidden />
        </span>
      </button>
    </div>
  );
}
