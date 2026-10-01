import React, { useState } from 'react';
import { X, Download, Check, ArrowUpRight, Copy, FileCode, CheckCircle2 } from 'lucide-react';
import { SPECIMENS } from '../data/specimens';
import { ActiveModal } from './TopHeader';

interface OverlaysProps {
  activeModal: ActiveModal;
  onClose: () => void;
  onSelectSpecimen: (index: number) => void;
}

export const Overlays: React.FC<OverlaysProps> = ({
  activeModal,
  onClose,
  onSelectSpecimen,
}) => {
  const [selectedCrops, setSelectedCrops] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7]);
  const [companyName, setCompanyName] = useState('');
  const [destinationPort, setDestinationPort] = useState('Rotterdam / Jebel Ali / Singapore');
  const [submitted, setSubmitted] = useState(false);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [selectedSourceTab, setSelectedSourceTab] = useState<'app' | 'stage' | 'scrubber' | 'data'>('stage');

  if (!activeModal) return null;

  const toggleCropSelection = (idx: number) => {
    setSelectedCrops((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleDownloadSpecSheet = () => {
    const chosen = SPECIMENS.filter((s) => selectedCrops.includes(s.index));
    const lines = [
      '3G FLORITECH / MORPHFLOW — BOTANICAL ENGINEERING SPECIFICATION DOSSIER',
      `GENERATED: ${new Date().toISOString().slice(0, 10)}`,
      `CONSIGNEE / INQUIRY: ${companyName || 'Institutional Buyer'}`,
      `TARGET CORRIDOR: ${destinationPort}`,
      '========================================================================',
      '',
      ...chosen.map(
        (s) =>
          `[${s.numberLabel} / 08] ${s.title.toUpperCase()} (${s.scientificName})\n` +
          `  Classification : ${s.classification}\n` +
          `  Catalog Code   : ${s.catalogCode}\n` +
          `  Primary Metric : ${s.brixOrPrimaryMetric}\n` +
          `  Storage Temp   : ${s.storageTemp}\n` +
          `  Packaging      : ${s.packagingSummary}\n` +
          `  Harvest Window : ${s.harvestWindow}\n` +
          `  Facility       : ${s.facilityLabel} (${s.coordinates})\n`
      ),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MorphFlow-3G-Floritech-Spec-Sheet-2025.txt';
    a.click();
    URL.revokeObjectURL(url);
    setSubmitted(true);
  };

  const sourceSnippets = {
    stage: `// src/components/MorphStage.tsx — Optical Blur & Specimen Cross-Morph Engine
import React, { useState, useRef } from 'react';
import { SpecimenData } from '../data/specimens';

export type BlurMode = 'lens' | 'liquid' | 'prism';

export const MorphStage = ({ currentSpecimen, nextSpecimen, t, blurMode }) => {
  // s = smoothstep curve (0 -> 1)
  const s = t * t * (3 - 2 * t);
  // morphBell peaks at 1.0 when t = 0.5 (midpoint of transition)
  const morphBell = Math.sin(t * Math.PI);
  const maxBlur = blurMode === 'lens' ? 28 : blurMode === 'liquid' ? 22 : 24;

  const blurA = s * maxBlur;
  const blurB = (1 - s) * maxBlur;

  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      {/* Specimen A (Outgoing) */}
      <div style={{ opacity: 1 - s, filter: \`blur(\${blurA.toFixed(1)}px)\` }} className="absolute inset-0">
        <img src={currentSpecimen.imageUrl} alt={currentSpecimen.title} />
      </div>

      {/* Specimen B (Incoming) */}
      <div style={{ opacity: s, filter: \`blur(\${blurB.toFixed(1)}px)\` }} className="absolute inset-0">
        <img src={nextSpecimen.imageUrl} alt={nextSpecimen.title} />
      </div>
    </div>
  );
};`,
    app: `// src/App.tsx — Continuous Scroll & Gesture RAF Interpolation Loop
useEffect(() => {
  let rafId;
  const tick = () => {
    const delta = shortestRingDelta(currentRef.current, targetRef.current);
    if (Math.abs(delta) > 0.0004) {
      currentRef.current = wrapProgress(currentRef.current + delta * 0.095);
      setProgress(currentRef.current);
    }
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}, []);`,
    scrubber: `// src/components/TimelineScrubber.tsx — 01-08 Sequence & Optical Scrub
<input
  type="range"
  min={0}
  max={7.95}
  step={0.01}
  value={progress}
  onChange={(e) => onScrubProgress(parseFloat(e.target.value))}
  aria-label="Continuous specimen morph scrubber"
/>`,
    data: `// src/data/specimens.ts — 8 Precision Botanical Specimens
export const SPECIMENS = [
  { index: 0, numberLabel: '01', title: 'Colour Capsicum', scientificName: 'Capsicum annuum var. grossum' },
  { index: 1, numberLabel: '02', title: 'Mini Cucumber', scientificName: 'Cucumis sativus' },
  { index: 2, numberLabel: '03', title: 'Lettuce & Greens', scientificName: 'Lactuca sativa' },
  { index: 3, numberLabel: '04', title: 'Selected Brinjal', scientificName: 'Solanum melongena' },
  { index: 4, numberLabel: '05', title: 'Grounded Tomato', scientificName: 'Solanum lycopersicum' },
  { index: 5, numberLabel: '06', title: 'Considered Broccoli', scientificName: 'Brassica oleracea var. italica' },
  { index: 6, numberLabel: '07', title: 'Reliable Cabbage', scientificName: 'Brassica oleracea var. capitata' },
  { index: 7, numberLabel: '08', title: 'Red Chilly', scientificName: 'Capsicum annuum var. acuminatum' },
];`,
  };

  const copyCode = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(key);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#15241C]/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[88vh] bg-[#FBF9F5] border border-[#15241C] shadow-[0_24px_48px_-12px_rgba(21,36,28,0.18)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#15241C]/15 bg-[#F4F3EE] flex items-center justify-between">
          <div>
            <div className="font-mono-tabular text-[10px] uppercase tracking-[0.24em] text-[#2F6346]">
              MorphFlow · 3G Floritech Archival Folio
            </div>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#15241C] mt-0.5">
              {activeModal === 'portfolio' && 'Botanical Specimen Index (01 — 08)'}
              {activeModal === 'cultivation-science' &&
                'Botanical Engineering & Cultivation Science'}
              {activeModal === 'facilities' && 'Controlled-Climate Glasshouse Facilities'}
              {activeModal === 'technical-data' && 'Master Agronomic & Cold-Chain Matrix'}
              {activeModal === 'request-spec' && 'Export Specification Dossier & Inquiry'}
              {activeModal === 'source-code' && 'Application Source Code & Export Guide'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-[#15241C]/20 hover:bg-[#15241C] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* 0. SOURCE CODE MODAL */}
          {activeModal === 'source-code' && (
            <div className="space-y-6">
              <div className="bg-[#F4F3EE] border border-[#15241C]/15 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-editorial text-xl text-[#15241C]">
                    How to Access & Download Your Source Code
                  </h3>
                  <p className="text-xs text-[#5C625E] mt-1 leading-relaxed">
                    All source files are stored directly in your AI Studio project repository. You can explore the file tree in the left panel of AI Studio, copy snippets below, or download the full specification sheet.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyCode(selectedSourceTab, sourceSnippets[selectedSourceTab])}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#15241C] hover:bg-[#2F6346] text-[#FBF9F5] text-xs font-mono-tabular uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedFile === selectedSourceTab ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#9CD3AF]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code File Tabs */}
              <div className="flex items-center gap-2 border-b border-[#15241C]/15 pb-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'stage', label: 'MorphStage.tsx (Optical Blur)' },
                  { id: 'app', label: 'App.tsx (Scroll Engine)' },
                  { id: 'scrubber', label: 'TimelineScrubber.tsx' },
                  { id: 'data', label: 'specimens.ts (8 Crops)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedSourceTab(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono-tabular text-xs uppercase tracking-wider border transition-colors cursor-pointer whitespace-nowrap ${
                      selectedSourceTab === tab.id
                        ? 'bg-[#15241C] text-[#FBF9F5] border-[#15241C]'
                        : 'bg-[#F4F3EE] text-[#5C625E] border-[#15241C]/15 hover:text-[#15241C]'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Code Block */}
              <div className="relative bg-[#15241C] text-[#FBF9F5] p-5 font-mono-tabular text-xs leading-relaxed overflow-x-auto border border-[#15241C]/30 max-h-[380px]">
                <pre>{sourceSnippets[selectedSourceTab]}</pre>
              </div>

              {/* Architecture Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono-tabular text-xs">
                <div className="bg-[#F4F3EE] border border-[#15241C]/15 p-4">
                  <div className="font-semibold text-[#2F6346] uppercase tracking-wider">1. Dual-Layer Canvas</div>
                  <div className="text-[#434844] mt-1 text-[11px] leading-relaxed">
                    Specimen A & B are layered on top of each other. At any scroll point <code>t</code>, A blurs out as B blurs in with SVG liquid noise.
                  </div>
                </div>
                <div className="bg-[#F4F3EE] border border-[#15241C]/15 p-4">
                  <div className="font-semibold text-[#2F6346] uppercase tracking-wider">2. Magnetic Settle</div>
                  <div className="text-[#434844] mt-1 text-[11px] leading-relaxed">
                    Continuous scroll wheel gestures allow real-time blur inspection, followed by a gentle spring lock onto the nearest integer specimen.
                  </div>
                </div>
                <div className="bg-[#F4F3EE] border border-[#15241C]/15 p-4">
                  <div className="font-semibold text-[#2F6346] uppercase tracking-wider">3. Editorial Stagger</div>
                  <div className="text-[#434844] mt-1 text-[11px] leading-relaxed">
                    Title typography, sequence numbers, and all 6 flanking metric callouts morph with staggered directional blur.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 1. PORTFOLIO GRID */}
          {activeModal === 'portfolio' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SPECIMENS.map((item) => (
                <button
                  key={item.numberLabel}
                  type="button"
                  onClick={() => {
                    onSelectSpecimen(item.index);
                    onClose();
                  }}
                  className="group text-left bg-[#F4F3EE] border border-[#15241C]/15 hover:border-[#15241C] p-4 flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono-tabular text-[10px] tracking-[0.2em] uppercase text-[#5C625E]">
                      <span className="text-[#2F6346] font-semibold">
                        {item.numberLabel} / 08
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="h-40 my-3 flex items-center justify-center bg-[#FBF9F5] p-3 border border-[#15241C]/8">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-serif-editorial text-xl text-[#15241C] group-hover:text-[#2F6346] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-serif-editorial italic text-xs text-[#5C625E] mt-0.5">
                      {item.scientificName}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#15241C]/10 flex items-center justify-between font-mono-tabular text-[10px] text-[#434844]">
                    <span>{item.brixOrPrimaryMetric}</span>
                    <span>·</span>
                    <span>{item.storageTemp}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 2. CULTIVATION SCIENCE */}
          {activeModal === 'cultivation-science' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <article className="bg-[#F4F3EE] border border-[#15241C]/15 p-6 space-y-3">
                <div className="font-mono-tabular text-[10px] uppercase tracking-[0.2em] text-[#2F6346]">
                  01 · Closed-Loop Hydroponics
                </div>
                <h3 className="font-serif-editorial text-2xl text-[#15241C]">
                  95% Water Recirculation & Pure Nutrient Film
                </h3>
                <p className="text-sm text-[#434844] leading-relaxed">
                  Our leafy greens, mini cucumbers, and high-wire solanaceous crops are cultivated in
                  sterile, substrate-isolated channels. Automated electrical conductivity (EC 1.6–2.4
                  mS/cm) and pH dosing ensure optimal cellular turgor without soil-borne pathogens.
                </p>
                <div className="pt-3 border-t border-[#15241C]/10 font-mono-tabular text-xs text-[#15241C]">
                  Verified Metric: 95% H₂O Retention vs Open-Field Baseline
                </div>
              </article>

              <article className="bg-[#F4F3EE] border border-[#15241C]/15 p-6 space-y-3">
                <div className="font-mono-tabular text-[10px] uppercase tracking-[0.2em] text-[#2F6346]">
                  02 · Biological IPM Ecology
                </div>
                <h3 className="font-serif-editorial text-2xl text-[#15241C]">
                  Zero Pesticide Residue (MRL-Free Purity)
                </h3>
                <p className="text-sm text-[#434844] leading-relaxed">
                  Predatory phytoseiid mites and beneficial parasitoids patrol our glasshouse bays,
                  eliminating synthetic pesticide dependency. Every harvest lot undergoes gas
                  chromatography screening prior to export clearance.
                </p>
                <div className="pt-3 border-t border-[#15241C]/10 font-mono-tabular text-xs text-[#15241C]">
                  Compliance: EU / Gulf / ISO 22000 & GlobalG.A.P. Certified
                </div>
              </article>

              <article className="bg-[#F4F3EE] border border-[#15241C]/15 p-6 space-y-3">
                <div className="font-mono-tabular text-[10px] uppercase tracking-[0.2em] text-[#2F6346]">
                  03 · Post-Harvest Thermodynamics
                </div>
                <h3 className="font-serif-editorial text-2xl text-[#15241C]">
                  Rapid Hydro-Cooling & Respiration Damping
                </h3>
                <p className="text-sm text-[#434844] leading-relaxed">
                  Within 25 minutes of detachment, specimens enter crop-specific thermal envelopes
                  (from 0°C–2°C iced highland broccoli to 10°C–13°C chill-sensitive table tomatoes),
                  locking in epicuticular bloom and calyx hydration.
                </p>
                <div className="pt-3 border-t border-[#15241C]/10 font-mono-tabular text-xs text-[#15241C]">
                  Shelf-Life Extension: +9 to +14 Days Transit Stability
                </div>
              </article>
            </div>
          )}

          {/* 3. FACILITIES */}
          {activeModal === 'facilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  code: 'LOT GH-IV-PUNE-NORTH',
                  title: 'Western Ghats High-Wire Biosphere',
                  coords: 'LAT 18°31′N · LON 73°51′E · ELEV 560M',
                  crops: 'Grounded Tomato, Selected Brinjal, Considered Broccoli, Reliable Cabbage, Red Chilly',
                  specs: 'HEPA ISO Class 6 Positive-Pressure Airlocks · 68.2% Optimal Ambient RH',
                },
                {
                  code: 'DUTCH R&D GLASSHOUSE',
                  title: 'Westland Precision Photoperiod Lab',
                  coords: 'LAT 52°04′12″N · LON 04°29′30″E',
                  crops: 'Colour Capsicum (Red / Yellow / Green Export Grade A1)',
                  specs: 'Automated Diffused Glass Roof · CO₂ Enrichment & Refractive Brix Calibration',
                },
                {
                  code: '3G BIOSPHERE FACILITY',
                  title: 'Parthenocarpic Cucurbit Division',
                  coords: 'LAT 23°04′N · LON 72°35′E',
                  crops: 'Mini Cucumber (100% Gynoecious Seedless)',
                  specs: 'ISO 22000 / GAP Certified · High-Wire Vertical Cordon Training',
                },
                {
                  code: 'SOUTHERN HYDROPONIC LAB',
                  title: '920M Altitude Sterile NFT Complex',
                  coords: 'LAT 12.9716°N · LON 77.5946°E · ALT 920M MSL',
                  crops: 'Lettuce & Greens (Romaine, Butterhead, Lollo Rosso)',
                  specs: 'Zero Soil Contact · 95% Closed-Loop Nutrient Recirculation',
                },
              ].map((fac) => (
                <div
                  key={fac.code}
                  className="bg-[#F4F3EE] border border-[#15241C]/15 p-6 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="font-mono-tabular text-[10px] uppercase tracking-[0.22em] text-[#2F6346]">
                      {fac.code}
                    </div>
                    <h3 className="font-serif-editorial text-2xl text-[#15241C] mt-1">
                      {fac.title}
                    </h3>
                    <div className="font-mono-tabular text-[11px] text-[#5C625E] mt-1">
                      {fac.coords}
                    </div>
                    <p className="text-xs text-[#434844] mt-3 leading-relaxed">
                      <strong className="font-medium text-[#15241C]">Active Cultivars:</strong>{' '}
                      {fac.crops}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#15241C]/10 font-mono-tabular text-[11px] text-[#15241C]">
                    {fac.specs}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. TECHNICAL DATA TABLE */}
          {activeModal === 'technical-data' && (
            <div className="overflow-x-auto border border-[#15241C]/20">
              <table className="w-full text-left border-collapse font-mono-tabular text-xs">
                <thead>
                  <tr className="bg-[#15241C] text-[#FBF9F5] uppercase tracking-[0.15em] text-[10px]">
                    <th className="py-3.5 px-4">Seq</th>
                    <th className="py-3.5 px-4">Specimen</th>
                    <th className="py-3.5 px-4">Scientific Taxon</th>
                    <th className="py-3.5 px-4">Primary Metric</th>
                    <th className="py-3.5 px-4">Cold Chain</th>
                    <th className="py-3.5 px-4">Export Packaging</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#15241C]/12">
                  {SPECIMENS.map((s, i) => (
                    <tr
                      key={s.numberLabel}
                      className={i % 2 === 0 ? 'bg-[#FBF9F5]' : 'bg-[#F4F3EE]/70'}
                    >
                      <td className="py-3 px-4 font-semibold text-[#2F6346]">
                        {s.numberLabel} / 08
                      </td>
                      <td className="py-3 px-4 font-sans-editorial font-medium text-[#15241C]">
                        {s.title}
                      </td>
                      <td className="py-3 px-4 font-serif-editorial italic text-sm text-[#434844]">
                        {s.scientificName}
                      </td>
                      <td className="py-3 px-4 text-[#15241C]">{s.brixOrPrimaryMetric}</td>
                      <td className="py-3 px-4 text-[#15241C]">{s.storageTemp}</td>
                      <td className="py-3 px-4 text-[#434844]">{s.packagingSummary}</td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSpecimen(s.index);
                            onClose();
                          }}
                          className="px-2.5 py-1 bg-[#15241C] text-[#FBF9F5] hover:bg-[#2F6346] text-[10px] uppercase tracking-wider cursor-pointer whitespace-nowrap"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 5. REQUEST SPEC SHEET */}
          {activeModal === 'request-spec' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="font-mono-tabular text-xs uppercase tracking-[0.18em] text-[#5C625E]">
                  Select Botanical Specimens for Export Dossier ({selectedCrops.length} / 8 Selected)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SPECIMENS.map((s) => {
                    const checked = selectedCrops.includes(s.index);
                    return (
                      <button
                        key={s.numberLabel}
                        type="button"
                        onClick={() => toggleCropSelection(s.index)}
                        className={`p-3 border text-left flex items-center justify-between transition-colors cursor-pointer ${
                          checked
                            ? 'bg-[#F4F3EE] border-[#15241C] text-[#15241C]'
                            : 'bg-transparent border-[#15241C]/20 text-[#5C625E]'
                        }`}
                      >
                        <div>
                          <div className="font-mono-tabular text-[10px] uppercase tracking-widest text-[#2F6346]">
                            {s.numberLabel} · {s.storageTemp}
                          </div>
                          <div className="font-serif-editorial text-lg">{s.title}</div>
                        </div>
                        <div
                          className={`w-4 h-4 border flex items-center justify-center ${
                            checked
                              ? 'bg-[#15241C] border-[#15241C] text-white'
                              : 'border-[#15241C]/40'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F4F3EE] border border-[#15241C]/15 p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="font-mono-tabular text-xs uppercase tracking-[0.18em] text-[#15241C]">
                    Consignee & Corridor Details
                  </div>
                  <div>
                    <label className="block font-mono-tabular text-[10px] uppercase tracking-wider text-[#5C625E] mb-1">
                      Organization / Importer Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Nordic Fresh B.V."
                      className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#15241C]/30 focus:border-[#15241C] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tabular text-[10px] uppercase tracking-wider text-[#5C625E] mb-1">
                      Primary Cold-Chain Corridor
                    </label>
                    <input
                      type="text"
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FBF9F5] border border-[#15241C]/30 focus:border-[#15241C] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#15241C]/10">
                  <button
                    type="button"
                    onClick={handleDownloadSpecSheet}
                    disabled={selectedCrops.length === 0}
                    className="w-full py-3 px-4 bg-[#15241C] hover:bg-[#2F6346] disabled:opacity-40 text-[#FBF9F5] font-mono-tabular text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official Spec Dossier (.TXT)</span>
                  </button>
                  {submitted && (
                    <p className="font-mono-tabular text-[11px] text-[#2F6346] text-center">
                      Specification sheet generated and downloaded for {selectedCrops.length}{' '}
                      cultivars.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
