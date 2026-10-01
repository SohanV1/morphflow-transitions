import React, { useState, useRef } from 'react';
import { RotateCw, Eye, EyeOff, ArrowDown } from 'lucide-react';
import { SpecimenData, SpecimenAnnotation } from '../data/specimens';

export type BlurMode = 'lens' | 'liquid' | 'prism';

interface MorphStageProps {
  currentSpecimen: SpecimenData;
  nextSpecimen: SpecimenData;
  /** Fractional morph progress between currentSpecimen (0) and nextSpecimen (1) */
  t: number;
  blurMode: BlurMode;
  showHudNodes: boolean;
  onToggleHudNodes: () => void;
  onStepNext: () => void;
}

/** Smooth hermite interpolation */
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const MorphStage: React.FC<MorphStageProps> = ({
  currentSpecimen,
  nextSpecimen,
  t,
  blurMode,
  showHudNodes,
  onToggleHudNodes,
  onStepNext,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [spinCount, setSpinCount] = useState(0);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Smooth S-curve for overall morph
  const s = smoothstep(0, 1, t);
  // Bell curve peaking at 1.0 when t = 0.5
  const morphBell = Math.sin(t * Math.PI);

  // Compute max blur based on selected optical mode
  const maxBlur = blurMode === 'lens' ? 28 : blurMode === 'liquid' ? 22 : 24;

  // Outgoing (A) and Incoming (B) image optical filter strings
  const blurA = s * maxBlur;
  const blurB = (1 - s) * maxBlur;

  const getOpticalFilter = (blurPx: number, bell: number) => {
    const b = blurPx.toFixed(2);
    if (blurMode === 'liquid' && bell > 0.02) {
      return `blur(${b}px) url(#botanical-liquid-morph) saturate(${(1 + bell * 0.25).toFixed(2)})`;
    }
    if (blurMode === 'prism') {
      const bright = (1 + bell * 0.18).toFixed(2);
      const contrast = (1 + bell * 0.12).toFixed(2);
      const sat = (1 + bell * 0.3).toFixed(2);
      return `blur(${b}px) brightness(${bright}) contrast(${contrast}) saturate(${sat})`;
    }
    return `blur(${b}px)`;
  };

  // Interactive 3D drag/hover handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setRotation({
        x: Math.max(-25, Math.min(25, -dy * 0.18)),
        y: dx * 0.45,
        z: dx * 0.04,
      });
    } else {
      const rect = stageRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setRotation((prev) => ({
        x: -ny * 10,
        y: nx * 12,
        z: prev.z * 0.9,
      }));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const handleTrigger360Spin = () => {
    setSpinCount((c) => c + 1);
  };

  // Helper to render a staggered morphing annotation pair (outgoing A -> incoming B)
  const renderMorphingAnnotation = (
    specA: SpecimenAnnotation,
    specB: SpecimenAnnotation,
    staggerIndex: number,
    align: 'left' | 'right'
  ) => {
    // Stagger window for each of the 3 items (0, 1, 2)
    const start = staggerIndex * 0.12;
    const end = 0.76 + staggerIndex * 0.12;
    const localS = smoothstep(start, end, t);
    const localBell = Math.sin(localS * Math.PI);

    const blurOut = (localS * 14).toFixed(1);
    const blurIn = ((1 - localS) * 14).toFixed(1);

    const alignClass =
      align === 'left'
        ? 'text-left lg:text-right lg:items-end'
        : 'text-left lg:text-left lg:items-start';

    return (
      <div
        key={`${specA.id}-${specB.id}`}
        className="relative min-h-[88px] flex flex-col justify-center"
      >
        {/* Outgoing Spec A */}
        <article
          style={{
            opacity: 1 - localS,
            transform: `translate3d(0, ${(-localS * 18).toFixed(1)}px, 0) scale(${(
              1 -
              localS * 0.03
            ).toFixed(3)})`,
            filter: `blur(${blurOut}px)`,
            pointerEvents: localS > 0.5 ? 'none' : 'auto',
          }}
          className={`flex flex-col ${alignClass} transition-none will-change-[transform,opacity,filter]`}
        >
          <div className="font-mono-tabular text-[10px] tracking-[0.22em] uppercase text-[#5C625E] mb-1">
            <span>{specA.code}</span>
            <span className="mx-1.5 text-[#5C625E]/50">·</span>
            <span className="text-[#2F6346] font-medium">{specA.category}</span>
          </div>
          <h2 className="font-serif-editorial text-xl sm:text-2xl text-[#15241C] tracking-tight leading-snug font-normal">
            {specA.value}
          </h2>
          <p className="text-xs text-[#434844] font-sans-editorial mt-1 leading-relaxed max-w-[260px]">
            {specA.description}
          </p>
        </article>

        {/* Incoming Spec B */}
        <article
          style={{
            opacity: localS,
            transform: `translate3d(0, ${((1 - localS) * 18).toFixed(1)}px, 0) scale(${(
              0.97 +
              localS * 0.03
            ).toFixed(3)})`,
            filter: `blur(${blurIn}px)`,
            pointerEvents: localS <= 0.5 ? 'none' : 'auto',
          }}
          aria-hidden={localS <= 0.5}
          className={`absolute inset-0 flex flex-col justify-center ${alignClass} transition-none will-change-[transform,opacity,filter]`}
        >
          <div className="font-mono-tabular text-[10px] tracking-[0.22em] uppercase text-[#5C625E] mb-1">
            <span>{specB.code}</span>
            <span className="mx-1.5 text-[#5C625E]/50">·</span>
            <span className="text-[#2F6346] font-medium">{specB.category}</span>
          </div>
          <h2 className="font-serif-editorial text-xl sm:text-2xl text-[#15241C] tracking-tight leading-snug font-normal">
            {specB.value}
          </h2>
          <p className="text-xs text-[#434844] font-sans-editorial mt-1 leading-relaxed max-w-[260px]">
            {specB.description}
          </p>
        </article>

        {/* Subtle optical hairline accent during active morph */}
        {localBell > 0.05 && (
          <div
            style={{ opacity: localBell * 0.35 }}
            className="w-12 h-px bg-[#2F6346] mt-2 pointer-events-none"
          />
        )}
      </div>
    );
  };

  // Active specimen for HUD nodes (switches cleanly at t = 0.5)
  const dominantSpecimen = t < 0.5 ? currentSpecimen : nextSpecimen;
  const hudOpacity = Math.max(0, 1 - morphBell * 1.6);

  const getTitleFontClass = (style: SpecimenData['titleStyle']) => {
    if (style === 'italic-serif') {
      return 'font-serif-editorial italic font-normal tracking-tight';
    }
    if (style === 'sans-bold') {
      return 'font-sans-editorial font-semibold tracking-tight uppercase';
    }
    return 'font-serif-editorial font-normal tracking-[-0.02em]';
  };

  return (
    <div className="relative flex-grow flex flex-col justify-between w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 py-3 sm:py-5 select-none overflow-hidden">
      {/* Hidden SVG Filter Definition for Liquid Optical Refraction Morphing */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="botanical-liquid-morph" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={0.012 + morphBell * 0.018}
              numOctaves={2}
              result="warpNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warpNoise"
              scale={morphBell * 34}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Dynamic Ambient Studio Aura that Cross-Blends Between Specimen A and Specimen B */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          style={{
            opacity: 1 - s,
            background: `radial-gradient(circle at 50% 48%, rgba(255,255,255,0.96) 0%, ${currentSpecimen.auraPrimary} 42%, ${currentSpecimen.auraSecondary} 68%, transparent 100%)`,
          }}
          className="absolute inset-0 transition-none"
        />
        <div
          style={{
            opacity: s,
            background: `radial-gradient(circle at 50% 48%, rgba(255,255,255,0.96) 0%, ${nextSpecimen.auraPrimary} 42%, ${nextSpecimen.auraSecondary} 68%, transparent 100%)`,
          }}
          className="absolute inset-0 transition-none"
        />
      </div>

      {/* TOP HIERARCHY: Dual-Layer Optical Morphing Title & Taxonomy */}
      <section className="relative z-20 text-center max-w-4xl mx-auto w-full min-h-[124px] sm:min-h-[144px] flex items-center justify-center">
        {/* Outgoing Title Layer A */}
        <div
          style={{
            opacity: 1 - s,
            transform: `translate3d(0, ${(-s * 22).toFixed(1)}px, 0) scale(${(1 - s * 0.04).toFixed(
              3
            )})`,
            filter: `blur(${(s * 18).toFixed(1)}px)`,
            pointerEvents: s > 0.5 ? 'none' : 'auto',
          }}
          className="w-full flex flex-col items-center will-change-[transform,opacity,filter]"
        >
          {/* Sequence & Taxonomic Kicker (Unboxed clean metadata) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono-tabular tracking-[0.26em] uppercase text-[#5C625E] mb-2">
            <span className="text-[#2F6346] font-semibold">
              {currentSpecimen.numberLabel} / 08
            </span>
            <span aria-hidden="true">·</span>
            <span>{currentSpecimen.scientificName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#15241C]">{currentSpecimen.classification}</span>
          </div>

          {/* Master Specimen Headline */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl text-[#15241C] leading-[1.04] text-balance ${getTitleFontClass(
              currentSpecimen.titleStyle
            )}`}
          >
            {currentSpecimen.title}
          </h1>

          {/* Editorial Subhead & Harvest Window */}
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-[#434844]">
            <span>{currentSpecimen.editorialTagline}</span>
            <span aria-hidden="true" className="text-[#5C625E]/50">
              ·
            </span>
            <span className="font-mono-tabular text-[11px] tracking-[0.16em] uppercase text-[#2F6346]">
              {currentSpecimen.harvestWindow}
            </span>
          </div>
        </div>

        {/* Incoming Title Layer B */}
        <div
          style={{
            opacity: s,
            transform: `translate3d(0, ${((1 - s) * 22).toFixed(1)}px, 0) scale(${(
              0.96 +
              s * 0.04
            ).toFixed(3)})`,
            filter: `blur(${((1 - s) * 18).toFixed(1)}px)`,
            pointerEvents: s <= 0.5 ? 'none' : 'auto',
          }}
          aria-hidden={s <= 0.5}
          className="absolute inset-0 w-full flex flex-col items-center justify-center will-change-[transform,opacity,filter]"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono-tabular tracking-[0.26em] uppercase text-[#5C625E] mb-2">
            <span className="text-[#2F6346] font-semibold">{nextSpecimen.numberLabel} / 08</span>
            <span aria-hidden="true">·</span>
            <span>{nextSpecimen.scientificName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#15241C]">{nextSpecimen.classification}</span>
          </div>

          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl text-[#15241C] leading-[1.04] text-balance ${getTitleFontClass(
              nextSpecimen.titleStyle
            )}`}
          >
            {nextSpecimen.title}
          </h1>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-[#434844]">
            <span>{nextSpecimen.editorialTagline}</span>
            <span aria-hidden="true" className="text-[#5C625E]/50">
              ·
            </span>
            <span className="font-mono-tabular text-[11px] tracking-[0.16em] uppercase text-[#2F6346]">
              {nextSpecimen.harvestWindow}
            </span>
          </div>
        </div>
      </section>

      {/* CENTER STAGE: Flanking Editorial Telemetry + Dual-Layer Optical Morphing Specimen */}
      <section className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4 my-auto py-2">
        {/* Left Flanking Editorial Specifications (3 items) */}
        <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col justify-between space-y-6 lg:space-y-8 z-20">
          {[0, 1, 2].map((idx) =>
            renderMorphingAnnotation(
              currentSpecimen.leftSpecs[idx],
              nextSpecimen.leftSpecs[idx],
              idx,
              'left'
            )
          )}
        </div>

        {/* Center Specimen Interactive Optical Viewport */}
        <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-center justify-center relative">
          <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Studio Radial Halo Behind Specimen */}
            <div
              style={{
                transform: `scale(${(1 + morphBell * 0.14).toFixed(3)})`,
                opacity: 0.85 + morphBell * 0.15,
              }}
              className="absolute inset-4 rounded-full bg-radial from-white via-[#F4F3EE]/80 to-transparent blur-2xl pointer-events-none -z-10"
            />

            {/* 3D Interactive Tilt & 360 Spin Wrapper */}
            <div
              style={{
                transform: `perspective(1100px) rotateX(${rotation.x.toFixed(
                  2
                )}deg) rotateY(${(rotation.y + spinCount * 360).toFixed(2)}deg) rotateZ(${rotation.z.toFixed(
                  2
                )}deg)`,
                transition: isDragging
                  ? 'none'
                  : 'transform 650ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Outgoing Specimen Image A */}
              <div
                style={{
                  opacity: 1 - s,
                  transform: `scale(${(1 + s * 0.08).toFixed(3)}) rotate(${(s * 5).toFixed(
                    2
                  )}deg)`,
                  filter: getOpticalFilter(blurA, morphBell),
                }}
                className="absolute inset-0 flex items-center justify-center p-3 will-change-[transform,opacity,filter]"
              >
                {!imgErrors[currentSpecimen.numberLabel] ? (
                  <img
                    src={currentSpecimen.imageUrl}
                    alt={currentSpecimen.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgErrors((prev) => ({
                        ...prev,
                        [currentSpecimen.numberLabel]: true,
                      }))
                    }
                    className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_24px_36px_rgba(21,36,28,0.14)]"
                  />
                ) : (
                  <div className="w-4/5 h-4/5 bg-[#F4F3EE] border border-[#15241C]/20 flex flex-col items-center justify-center p-6 text-center">
                    <span className="font-mono-tabular text-xs uppercase tracking-widest text-[#2F6346]">
                      Specimen {currentSpecimen.numberLabel}
                    </span>
                    <span className="font-serif-editorial text-2xl text-[#15241C] mt-1">
                      {currentSpecimen.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Incoming Specimen Image B */}
              <div
                style={{
                  opacity: s,
                  transform: `scale(${(0.92 + s * 0.08).toFixed(3)}) rotate(${(
                    (1 - s) *
                    -5
                  ).toFixed(2)}deg)`,
                  filter: getOpticalFilter(blurB, morphBell),
                }}
                className="absolute inset-0 flex items-center justify-center p-3 will-change-[transform,opacity,filter]"
              >
                {!imgErrors[nextSpecimen.numberLabel] ? (
                  <img
                    src={nextSpecimen.imageUrl}
                    alt={nextSpecimen.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgErrors((prev) => ({
                        ...prev,
                        [nextSpecimen.numberLabel]: true,
                      }))
                    }
                    className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_24px_36px_rgba(21,36,28,0.14)]"
                  />
                ) : (
                  <div className="w-4/5 h-4/5 bg-[#F4F3EE] border border-[#15241C]/20 flex flex-col items-center justify-center p-6 text-center">
                    <span className="font-mono-tabular text-xs uppercase tracking-widest text-[#2F6346]">
                      Specimen {nextSpecimen.numberLabel}
                    </span>
                    <span className="font-serif-editorial text-2xl text-[#15241C] mt-1">
                      {nextSpecimen.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Interactive HUD Telemetry Anchors (Visible when settled) */}
              {showHudNodes && hudOpacity > 0.05 && (
                <div
                  style={{ opacity: hudOpacity }}
                  className="absolute inset-0 pointer-events-none z-20"
                >
                  {dominantSpecimen.hudNodes.map((node) => {
                    const isNodeActive = activeNodeId === node.id;
                    return (
                      <div
                        key={node.id}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNodeId(isNodeActive ? null : node.id);
                          }}
                          onMouseEnter={() => setActiveNodeId(node.id)}
                          onMouseLeave={() => setActiveNodeId(null)}
                          className="group flex items-center gap-2 focus:outline-none cursor-pointer"
                          aria-label={`${node.label}: ${node.metric}`}
                        >
                          <span className="w-2.5 h-2.5 bg-[#15241C] border border-[#FBF9F5] shadow-sm transition-transform duration-150 group-hover:scale-125 group-hover:bg-[#D97736]" />
                          <div
                            className={`px-2.5 py-1 bg-[#FBF9F5]/95 backdrop-blur-md border border-[#15241C]/20 text-left shadow-sm transition-all duration-150 whitespace-nowrap ${
                              isNodeActive
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-85 sm:opacity-90 group-hover:opacity-100'
                            }`}
                          >
                            <div className="font-mono-tabular text-[9px] uppercase tracking-[0.18em] text-[#5C625E]">
                              {node.label}
                            </div>
                            <div className="font-mono-tabular text-[10px] font-medium text-[#15241C]">
                              {node.metric}
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Calibrated Ground Contact Shadow */}
            <div
              aria-hidden="true"
              style={{
                transform: `translateX(-50%) scaleX(${(1 - morphBell * 0.12).toFixed(2)})`,
                background: `radial-gradient(ellipse at center, ${dominantSpecimen.shadowTint} 0%, rgba(21,36,28,0.06) 52%, transparent 78%)`,
              }}
              className="absolute -bottom-3 left-1/2 w-3/4 h-10 blur-md pointer-events-none"
            />
          </div>

          {/* Interactive Stage Controls Row (360° Spin + HUD Toggle + Transform Step) */}
          <div className="mt-4 z-20 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleTrigger360Spin}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4F3EE] border border-[#15241C]/20 hover:border-[#15241C] text-[#15241C] text-[10px] font-mono-tabular uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#2F6346]" />
              <span>360° Specimen Rotation</span>
            </button>

            <button
              type="button"
              onClick={onStepNext}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#15241C] hover:bg-[#2F6346] text-[#FBF9F5] text-[10px] font-mono-tabular uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Morph Next</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onToggleHudNodes}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-transparent border border-[#15241C]/15 hover:border-[#15241C]/40 text-[#5C625E] hover:text-[#15241C] text-[10px] font-mono-tabular uppercase tracking-[0.16em] transition-colors cursor-pointer whitespace-nowrap"
              title="Toggle HUD tissue telemetry nodes"
            >
              {showHudNodes ? (
                <Eye className="w-3.5 h-3.5 text-[#2F6346]" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              <span>HUD</span>
            </button>
          </div>
        </div>

        {/* Right Flanking Editorial Specifications (3 items) */}
        <div className="order-3 lg:col-span-3 flex flex-col justify-between space-y-6 lg:space-y-8 z-20">
          {[0, 1, 2].map((idx) =>
            renderMorphingAnnotation(
              currentSpecimen.rightSpecs[idx],
              nextSpecimen.rightSpecs[idx],
              idx,
              'right'
            )
          )}
        </div>
      </section>
    </div>
  );
};
