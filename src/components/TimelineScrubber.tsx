import React from 'react';
import { SPECIMENS, SpecimenData } from '../data/specimens';
import { BlurMode } from './MorphStage';
import { ArrowDown, RotateCcw, Sliders } from 'lucide-react';

interface TimelineScrubberProps {
  /** Normalized progress in [0, 8) */
  progress: number;
  activeSpecimen: SpecimenData;
  nextSpecimen: SpecimenData;
  blurMode: BlurMode;
  onChangeBlurMode: (mode: BlurMode) => void;
  onSelectSpecimen: (index: number) => void;
  onScrubProgress: (newProgress: number) => void;
  onScrubEnd: () => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  progress,
  activeSpecimen,
  nextSpecimen,
  blurMode,
  onChangeBlurMode,
  onSelectSpecimen,
  onScrubProgress,
  onScrubEnd,
}) => {
  const isLastSpecimen = activeSpecimen.index === 7;
  // Slider range 0 to 7.99
  const sliderValue = Math.max(0, Math.min(7.99, progress));

  return (
    <footer className="relative z-30 w-full border-t border-[#15241C]/12 bg-[#FBF9F5]/90 backdrop-blur-md select-none">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 pt-3 pb-4 flex flex-col gap-3">
        {/* Row 1: Continuous Optical Morph Scrubber & Blur Optics Selector */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-2 border-b border-[#15241C]/10">
          {/* Continuous Morph Scrubber */}
          <div className="flex-1 flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#5C625E] whitespace-nowrap">
              <Sliders className="w-3 h-3 text-[#2F6346]" />
              <span>Optical Scrub</span>
            </div>
            <input
              type="range"
              min={0}
              max={7.95}
              step={0.01}
              value={sliderValue}
              onChange={(e) => onScrubProgress(parseFloat(e.target.value))}
              onMouseUp={onScrubEnd}
              onTouchEnd={onScrubEnd}
              aria-label="Continuous specimen morph scrubber"
              className="w-full max-w-md h-1 bg-[#15241C]/15 appearance-none cursor-ew-resize accent-[#15241C]"
            />
            <span className="font-mono-tabular text-[10px] tracking-[0.16em] text-[#15241C] uppercase whitespace-nowrap">
              {activeSpecimen.numberLabel} → {nextSpecimen.numberLabel} (
              {Math.round((progress % 1) * 100)}% Morph)
            </span>
          </div>

          {/* Optical Blur Mode Segmented Controls */}
          <div className="flex items-center gap-1.5 self-start md:self-auto">
            <span className="text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#5C625E] mr-1 whitespace-nowrap">
              Optics:
            </span>
            {(
              [
                { id: 'lens', label: 'Depth Lens Blur' },
                { id: 'liquid', label: 'Liquid Refraction' },
                { id: 'prism', label: 'Optical Bloom' },
              ] as const
            ).map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onChangeBlurMode(mode.id)}
                className={`px-2.5 py-1 text-[10px] font-mono-tabular uppercase tracking-[0.14em] border transition-colors whitespace-nowrap cursor-pointer ${
                  blurMode === mode.id
                    ? 'bg-[#15241C] text-[#FBF9F5] border-[#15241C]'
                    : 'bg-[#F4F3EE] text-[#5C625E] border-[#15241C]/15 hover:text-[#15241C]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: 01 — 08 Botanical Sequence Timeline Scrubber */}
        <nav
          aria-label="Specimen Sequence Timeline"
          className="w-full overflow-x-auto no-scrollbar py-1"
        >
          <div className="flex items-center justify-between min-w-[980px] gap-2">
            {SPECIMENS.map((item, idx) => {
              const isCurrent = activeSpecimen.index === idx;
              return (
                <React.Fragment key={item.numberLabel}>
                  <button
                    type="button"
                    onClick={() => onSelectSpecimen(idx)}
                    className={`group flex items-center gap-2 px-2.5 py-1.5 text-[10px] sm:text-[11px] font-mono-tabular tracking-[0.18em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                      isCurrent
                        ? 'bg-[#15241C] text-[#FBF9F5] font-semibold'
                        : 'text-[#5C625E] hover:text-[#15241C] hover:bg-[#F4F3EE]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 ${
                        isCurrent
                          ? 'bg-[#D97736]'
                          : 'bg-[#15241C]/25 group-hover:bg-[#2F6346]'
                      }`}
                    />
                    <span>
                      {item.numberLabel} {item.shortName}
                    </span>
                  </button>
                  {idx < SPECIMENS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="text-[#5C625E]/30 font-mono-tabular text-xs select-none"
                    >
                      —
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </nav>

        {/* Row 3: Scroll Transformation Prompt & Quiet Archival Coordinates */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-[#15241C]/10 text-[10px] font-mono-tabular tracking-[0.2em] uppercase text-[#5C625E]">
          {/* Left: Coordinates & Facility */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>{activeSpecimen.coordinates}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#15241C]">{activeSpecimen.facilityLabel}</span>
          </div>

          {/* Center: Dynamic Scroll Transformation CTA */}
          <button
            type="button"
            onClick={() => onSelectSpecimen((activeSpecimen.index + 1) % 8)}
            className="inline-flex items-center gap-1.5 text-[#2F6346] hover:text-[#15241C] font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            {isLastSpecimen ? (
              <>
                <RotateCcw className="w-3 h-3" />
                <span>Cycle Repeat · Scroll to Return to 01 Capsicum</span>
              </>
            ) : (
              <>
                <span>Scroll</span>
                <ArrowDown className="w-3 h-3" />
                <span>to Transform to {nextSpecimen.title}</span>
              </>
            )}
          </button>

          {/* Right: Catalog Code & Copyright */}
          <div className="flex items-center gap-2">
            <span>{activeSpecimen.catalogCode}</span>
            <span aria-hidden="true">·</span>
            <span>© 2025 3G FLORITECH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
