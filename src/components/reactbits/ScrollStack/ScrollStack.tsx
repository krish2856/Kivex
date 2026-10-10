'use client';

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  style
}) => (
  <div
    className={`scroll-stack-card relative w-full box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      ...style
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  onActiveCardChange?: (index: number) => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  innerClassName = '',
  itemDistance = 80,
  itemScale = 0.025,
  itemStackDistance = 24,
  stackPosition = 120,
  scaleEndPosition = 60,
  baseScale = 0.88,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
  onActiveCardChange
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const activeCardRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, { scale: number; rotation: number; blur: number }>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (end <= start) return scrollTop >= start ? 1 : 0;
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePosition = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const scrollTop = useWindowScroll
      ? window.scrollY
      : scrollerRef.current
      ? scrollerRef.current.scrollTop
      : 0;
    const containerHeight = useWindowScroll
      ? window.innerHeight
      : scrollerRef.current
      ? scrollerRef.current.clientHeight
      : 0;

    const stackPositionPx = parsePosition(stackPosition, containerHeight);
    let currentTopIndex = 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const stickyTop = stackPositionPx + i * itemStackDistance;
      const rect = card.getBoundingClientRect();

      // Determine if this card has reached or passed its sticky top threshold
      if (rect.top <= stickyTop + 8) {
        currentTopIndex = i;
      }
    });

    if (activeCardRef.current !== currentTopIndex) {
      activeCardRef.current = currentTopIndex;
      onActiveCardChange?.(currentTopIndex);
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const stickyTop = stackPositionPx + i * itemStackDistance;
      const nextCard = cardsRef.current[i + 1];

      let overlapProgress = 0;
      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        const nextStickyTop = stackPositionPx + (i + 1) * itemStackDistance;
        const startOverlap = stickyTop + card.offsetHeight;
        const endOverlap = nextStickyTop;
        overlapProgress = calculateProgress(
          startOverlap - nextRect.top,
          0,
          Math.max(1, startOverlap - endOverlap)
        );
      }

      const depthBehindActive = Math.max(0, currentTopIndex - i);
      const targetScale = Math.max(
        baseScale,
        1 - depthBehindActive * itemScale - (depthBehindActive === 0 ? overlapProgress * itemScale : 0)
      );
      const rotation = rotationAmount ? depthBehindActive * rotationAmount : 0;
      const blur = blurAmount && depthBehindActive > 0 ? depthBehindActive * blurAmount : 0;

      const newTransform = {
        scale: Math.round(targetScale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isComplete = currentTopIndex === cardsRef.current.length - 1;
        if (isComplete && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isComplete && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    onActiveCardChange,
    calculateProgress,
    parsePosition
  ]);

  useLayoutEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    const containerHeight = useWindowScroll ? window.innerHeight : container.clientHeight;
    const stackPositionPx = parsePosition(stackPosition, containerHeight);

    cards.forEach((card, i) => {
      card.style.position = 'sticky';
      card.style.top = `${stackPositionPx + i * itemStackDistance}px`;
      card.style.zIndex = `${i + 1}`;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      } else {
        card.style.marginBottom = '0px';
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    updateCardTransforms();

    if (useWindowScroll) {
      const onScroll = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        transformsCache.clear();
      };
    } else {
      const lenis = new Lenis({
        wrapper: container,
        content: container.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        smoothWheel: true
      });
      lenis.on('scroll', updateCardTransforms);
      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        lenis.destroy();
        transformsCache.clear();
      };
    }
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    parsePosition,
    updateCardTransforms
  ]);

  return (
    <div ref={scrollerRef} className={`relative w-full ${className}`.trim()}>
      <div className={`scroll-stack-inner relative w-full ${innerClassName}`.trim()}>
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
