"use client";

import { useEffect, useRef, useState } from "react";

const LERP_FACTOR = 0.15;
const OUTER_SIZE = 40;
const INNER_SIZE = 6;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const outerPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only activate on pointer devices with fine pointer and no touch
    const checkDesktop = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isWideScreen = window.innerWidth > 768;
      setIsDesktop(hasFinePointer && isWideScreen);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${e.clientX - INNER_SIZE / 2}px, ${e.clientY - INNER_SIZE / 2}px, 0)`;
      }
    };

    const animate = () => {
      outerPos.current.x = lerp(outerPos.current.x, mouse.current.x, LERP_FACTOR);
      outerPos.current.y = lerp(outerPos.current.y, mouse.current.y, LERP_FACTOR);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.current.x - OUTER_SIZE / 2}px, ${outerPos.current.y - OUTER_SIZE / 2}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Event delegation: dynamically catches newly rendered items and tabs!
    const onPointerOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        "a, button, input, textarea, select, [role='button'], [data-cursor-hover], [data-cursor-project]"
      );
      if (target) {
        setIsHovering(true);
      }
    };

    const onPointerOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        "a, button, input, textarea, select, [role='button'], [data-cursor-hover], [data-cursor-project]"
      );
      if (target) {
        // Check if moving to another interactive element
        const related = (e.relatedTarget as HTMLElement)?.closest?.(
          "a, button, input, textarea, select, [role='button'], [data-cursor-hover], [data-cursor-project]"
        );
        if (!related) {
          setIsHovering(false);
        }
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onPointerOver, { passive: true });
    document.addEventListener("mouseout", onPointerOut, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onPointerOver);
      document.removeEventListener("mouseout", onPointerOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: isHovering ? OUTER_SIZE + 16 : OUTER_SIZE,
          height: isHovering ? OUTER_SIZE + 16 : OUTER_SIZE,
          borderRadius: "50%",
          border: "1.5px solid white",
          mixBlendMode: "difference" as const,
          transition: "width 0.25s ease, height 0.25s ease",
          willChange: "transform",
        }}
      />

      {/* Inner Dot */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: INNER_SIZE,
          height: INNER_SIZE,
          borderRadius: "50%",
          backgroundColor: "white",
          mixBlendMode: "difference" as const,
          willChange: "transform",
        }}
      />
    </>
  );
}
