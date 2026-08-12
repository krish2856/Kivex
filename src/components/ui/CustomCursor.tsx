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
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
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
        innerRef.current.style.transform = `translate(${e.clientX - INNER_SIZE / 2}px, ${e.clientY - INNER_SIZE / 2}px)`;
      }
    };

    const animate = () => {
      outerPos.current.x = lerp(outerPos.current.x, mouse.current.x, LERP_FACTOR);
      outerPos.current.y = lerp(outerPos.current.y, mouse.current.y, LERP_FACTOR);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x - OUTER_SIZE / 2}px, ${outerPos.current.y - OUTER_SIZE / 2}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    const interactiveSelector = "a, button, input, textarea, select, [role='button'], [data-cursor-hover]";
    const targets = document.querySelectorAll<HTMLElement>(interactiveSelector);

    targets.forEach((el) => {
      el.addEventListener("mouseenter", onHoverStart);
      el.addEventListener("mouseleave", onHoverEnd);
    });

    document.addEventListener("mousemove", onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverStart);
        el.removeEventListener("mouseleave", onHoverEnd);
      });
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
          transition: "width 0.3s ease, height 0.3s ease",
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
