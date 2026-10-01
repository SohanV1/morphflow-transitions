import React from 'react';
import { Play, Pause, Code } from 'lucide-react';

export type ActiveModal =
  | null
  | 'portfolio'
  | 'cultivation-science'
  | 'facilities'
  | 'technical-data'
  | 'request-spec'
  | 'source-code';

interface TopHeaderProps {
  activeModal: ActiveModal;
  onOpenModal: (modal: ActiveModal) => void;
  autoMorph: boolean;
  onToggleAutoMorph: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeModal,
  onOpenModal,
  autoMorph,
  onToggleAutoMorph,
}) => {
  return (
    <header className="relative z-40 w-full px-6 sm:px-10 lg:px-16 py-5 border-b border-[#15241C]/10 bg-[#FBF9F5]/80 backdrop-blur-md flex items-center justify-between">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onOpenModal(null);
        }}
        className="font-mono-tabular text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#15241C] uppercase whitespace-nowrap hover:opacity-75 transition-opacity focus-visible:outline-2 focus-visible:outline-[#2F6346]"
      >
        3G FLORITECH
      </a>

      {/* Zone 2: 4 clean text navigation links */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex items-center gap-8 text-[11px] font-mono-tabular tracking-[0.18em] text-[#5C625E] uppercase"
      >
        <button
          type="button"
          onClick={() => onOpenModal(activeModal === 'portfolio' ? null : 'portfolio')}
          className={`whitespace-nowrap pb-0.5 border-b transition-colors cursor-pointer ${
            activeModal === 'portfolio'
              ? 'text-[#15241C] font-medium border-[#15241C]'
              : 'border-transparent hover:text-[#15241C] hover:border-[#15241C]/40'
          }`}
        >
          Portfolio
        </button>
        <button
          type="button"
          onClick={() =>
            onOpenModal(activeModal === 'cultivation-science' ? null : 'cultivation-science')
          }
          className={`whitespace-nowrap pb-0.5 border-b transition-colors cursor-pointer ${
            activeModal === 'cultivation-science'
              ? 'text-[#15241C] font-medium border-[#15241C]'
              : 'border-transparent hover:text-[#15241C] hover:border-[#15241C]/40'
          }`}
        >
          Cultivation Science
        </button>
        <button
          type="button"
          onClick={() => onOpenModal(activeModal === 'facilities' ? null : 'facilities')}
          className={`whitespace-nowrap pb-0.5 border-b transition-colors cursor-pointer ${
            activeModal === 'facilities'
              ? 'text-[#15241C] font-medium border-[#15241C]'
              : 'border-transparent hover:text-[#15241C] hover:border-[#15241C]/40'
          }`}
        >
          Facilities
        </button>
        <button
          type="button"
          onClick={() => onOpenModal(activeModal === 'technical-data' ? null : 'technical-data')}
          className={`whitespace-nowrap pb-0.5 border-b transition-colors cursor-pointer ${
            activeModal === 'technical-data'
              ? 'text-[#15241C] font-medium border-[#15241C]'
              : 'border-transparent hover:text-[#15241C] hover:border-[#15241C]/40'
          }`}
        >
          Technical Data
        </button>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onToggleAutoMorph}
          className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-[11px] font-mono-tabular tracking-[0.16em] uppercase border transition-colors whitespace-nowrap cursor-pointer ${
            autoMorph
              ? 'bg-[#2F6346] text-white border-[#2F6346]'
              : 'bg-transparent text-[#15241C] border-[#15241C]/25 hover:border-[#15241C]'
          }`}
          title="Automatically morph through all 8 botanical specimens"
        >
          {autoMorph ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>{autoMorph ? 'Morphing Active' : 'Auto-Morph'}</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('source-code')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-[11px] font-mono-tabular tracking-[0.16em] uppercase border border-[#15241C]/30 hover:border-[#15241C] text-[#15241C] bg-[#F4F3EE] hover:bg-[#E8E5DD] transition-colors whitespace-nowrap cursor-pointer"
          title="View and download source code"
        >
          <Code className="w-3.5 h-3.5 text-[#2F6346]" />
          <span>Source Code</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('request-spec')}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-mono-tabular font-medium tracking-[0.16em] uppercase bg-[#15241C] text-[#FBF9F5] hover:bg-[#2F6346] transition-colors whitespace-nowrap cursor-pointer"
        >
          Request Spec Sheet
        </button>
      </div>
    </header>
  );
};
