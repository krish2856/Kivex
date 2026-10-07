"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    function animate(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const duration = 2000;
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      const currentProgress = Math.round(eased * 100);

      setProgress(currentProgress);

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsComplete(true);
            onCompleteRef.current();
          }, 500);
        }, 300);
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-dark"
      style={{
        zIndex: 9999,
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? "none" : "auto",
        transition: "opacity 500ms ease-out",
      }}
    >
      <div className="flex items-center justify-center animate-pulse">
        <Logo className="h-14 sm:h-18 md:h-20 w-auto filter drop-shadow-[0_4px_24px_rgba(45,95,199,0.4)]" />
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div
          className="relative overflow-hidden bg-white/10"
          style={{ width: 200, height: 2 }}
        >
          <div
            className="absolute inset-y-0 left-0 bg-white"
            style={{
              width: `${progress}%`,
              transition: "width 16ms linear",
            }}
          />
        </div>

        <span
          className="mt-3 text-white/60 font-mono tabular-nums"
          style={{ fontSize: 11, letterSpacing: "0.05em" }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}
