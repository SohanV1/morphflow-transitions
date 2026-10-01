import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SPECIMENS } from './data/specimens';
import { TopHeader, ActiveModal } from './components/TopHeader';
import { MorphStage, BlurMode } from './components/MorphStage';
import { TimelineScrubber } from './components/TimelineScrubber';
import { Overlays } from './components/Overlays';

const TOTAL_SPECIMENS = SPECIMENS.length; // 8

/** Wrap any number into [0, TOTAL_SPECIMENS) */
function wrapProgress(val: number): number {
  return ((val % TOTAL_SPECIMENS) + TOTAL_SPECIMENS) % TOTAL_SPECIMENS;
}

/** Shortest signed distance on a ring of circumference TOTAL_SPECIMENS */
function shortestRingDelta(from: number, to: number): number {
  let diff = (to - from) % TOTAL_SPECIMENS;
  if (diff > TOTAL_SPECIMENS / 2) diff -= TOTAL_SPECIMENS;
  if (diff < -TOTAL_SPECIMENS / 2) diff += TOTAL_SPECIMENS;
  return diff;
}

export default function App() {
  // Continuous rendered morph progress in [0, 8)
  const [progress, setProgress] = useState<number>(0);
  // Continuous target progress in [0, 8)
  const targetRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const isManualScrubbingRef = useRef<boolean>(false);
  const wheelSnapTimerRef = useRef<number | null>(null);

  // UI states
  const [blurMode, setBlurMode] = useState<BlurMode>('lens');
  const [showHudNodes, setShowHudNodes] = useState<boolean>(true);
  const [autoMorph, setAutoMorph] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  // Touch swipe tracking for mobile/tablet
  const touchStartYRef = useRef<number | null>(null);

  // Preload all 8 specimen studio images on mount for zero-latency morphing
  useEffect(() => {
    SPECIMENS.forEach((spec) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = spec.imageUrl;
    });
  }, []);

  // Smooth RAF spring/damping interpolation loop
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const curr = currentRef.current;
      const targ = targetRef.current;
      const delta = shortestRingDelta(curr, targ);

      if (Math.abs(delta) > 0.0004) {
        const speed = isManualScrubbingRef.current ? 0.25 : 0.095;
        const nextVal = wrapProgress(curr + delta * speed);
        currentRef.current = nextVal;
        setProgress(nextVal);
      } else if (curr !== targ) {
        currentRef.current = targ;
        setProgress(targ);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Jump/morph smoothly to a specific specimen index (0..7)
  const morphToIndex = useCallback((index: number) => {
    isManualScrubbingRef.current = false;
    targetRef.current = wrapProgress(index);
  }, []);

  // Step forward or backward by 1 specimen
  const stepSpecimen = useCallback((direction: 1 | -1) => {
    isManualScrubbingRef.current = false;
    const nearest = Math.round(targetRef.current);
    targetRef.current = wrapProgress(nearest + direction);
  }, []);

  // Auto-Morph timer when enabled
  useEffect(() => {
    if (!autoMorph || activeModal) return;
    const interval = window.setInterval(() => {
      stepSpecimen(1);
    }, 3800);
    return () => window.clearInterval(interval);
  }, [autoMorph, activeModal, stepSpecimen]);

  // Wheel / Trackpad continuous scroll-to-morph with magnetic snap
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeModal) return;
      e.preventDefault();

      // Normalize wheel delta for both mouse wheels and smooth trackpads
      const normalizedDelta = Math.max(-120, Math.min(120, e.deltaY));
      const increment = normalizedDelta * 0.0032;

      targetRef.current = wrapProgress(targetRef.current + increment);

      // Magnetic settle to nearest integer specimen after user pauses scrolling
      if (wheelSnapTimerRef.current) {
        window.clearTimeout(wheelSnapTimerRef.current);
      }
      wheelSnapTimerRef.current = window.setTimeout(() => {
        const snapped = wrapProgress(Math.round(targetRef.current));
        targetRef.current = snapped;
      }, 260);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeModal]);

  // Keyboard navigation (Arrows + 1-8 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal) {
        if (e.key === 'Escape') setActiveModal(null);
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        stepSpecimen(1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        stepSpecimen(-1);
      } else if (e.key >= '1' && e.key <= '8') {
        const idx = parseInt(e.key, 10) - 1;
        morphToIndex(idx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, stepSpecimen, morphToIndex]);

  // Touch vertical swipe morphing
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeModal || e.touches.length !== 1) return;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (activeModal || touchStartYRef.current === null || e.touches.length !== 1) return;
    const dy = touchStartYRef.current - e.touches[0].clientY;
    touchStartYRef.current = e.touches[0].clientY;
    targetRef.current = wrapProgress(targetRef.current + dy * 0.005);
  };

  const handleTouchEnd = () => {
    touchStartYRef.current = null;
    targetRef.current = wrapProgress(Math.round(targetRef.current));
  };

  // Manual range slider scrub handlers
  const handleScrubProgress = (newVal: number) => {
    isManualScrubbingRef.current = true;
    targetRef.current = wrapProgress(newVal);
  };

  const handleScrubEnd = () => {
    isManualScrubbingRef.current = false;
    targetRef.current = wrapProgress(Math.round(targetRef.current));
  };

  // Derive currentSpecimen (A), nextSpecimen (B), and fractional morph t in [0, 1)
  const baseIndex = Math.floor(progress) % TOTAL_SPECIMENS;
  const nextIndex = (baseIndex + 1) % TOTAL_SPECIMENS;
  const t = progress - Math.floor(progress);

  const currentSpecimen = SPECIMENS[baseIndex];
  const nextSpecimen = SPECIMENS[nextIndex];
  // Active specimen for timeline highlight (switches cleanly at midpoint t >= 0.5)
  const activeSpecimen = t < 0.5 ? currentSpecimen : nextSpecimen;

  return (
    <div
      id="top"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ backgroundColor: activeSpecimen.canvasBg }}
      className="min-h-screen flex flex-col justify-between relative overflow-x-hidden transition-colors duration-500"
    >
      {/* Top Navigation Bar */}
      <TopHeader
        activeModal={activeModal}
        onOpenModal={setActiveModal}
        autoMorph={autoMorph}
        onToggleAutoMorph={() => setAutoMorph((v) => !v)}
      />

      {/* Main Optical Morphing Showcase Stage */}
      <main className="flex-grow flex flex-col justify-center relative z-10">
        <MorphStage
          currentSpecimen={currentSpecimen}
          nextSpecimen={nextSpecimen}
          t={t}
          blurMode={blurMode}
          showHudNodes={showHudNodes}
          onToggleHudNodes={() => setShowHudNodes((v) => !v)}
          onStepNext={() => stepSpecimen(1)}
        />
      </main>

      {/* Bottom Sequence Scrubber, Optical Blur Selector & Archival Footer */}
      <TimelineScrubber
        progress={progress}
        activeSpecimen={activeSpecimen}
        nextSpecimen={SPECIMENS[(activeSpecimen.index + 1) % TOTAL_SPECIMENS]}
        blurMode={blurMode}
        onChangeBlurMode={setBlurMode}
        onSelectSpecimen={morphToIndex}
        onScrubProgress={handleScrubProgress}
        onScrubEnd={handleScrubEnd}
      />

      {/* Interactive Folio Overlays (Portfolio, Cultivation Science, Facilities, Technical Data, Spec Sheet, Source Code) */}
      <Overlays
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onSelectSpecimen={morphToIndex}
      />
    </div>
  );
}
