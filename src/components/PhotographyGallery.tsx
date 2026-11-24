import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Maximize2,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  ImageSlotSpec,
  PhotographyAsset,
  getApprovedPhotographs,
} from '../data/photography';

/**
 * Hero right-side centerpiece:
 * Clean, clearly labeled illustrative UI preview of Verity inside an elegant browser frame.
 * Does NOT claim to be a live screenshot until real screenshots are uploaded.
 */
export function HeroVerityPreview({
  onOpenProject,
}: {
  onOpenProject?: () => void;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border border-[rgba(184,164,255,0.24)] bg-[#160E22]/90 overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]"
    >
      {/* Browser Top Chrome */}
      <div className="px-4 py-2.5 border-b border-[rgba(184,164,255,0.16)] bg-[#120B1C] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B57]/75" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D96BFF]/75" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#B8A4FF]/55" />
        </div>
        <span className="font-mono text-[10px] text-[#C6B9DA] truncate">
          verity.local / borrower-dashboard
        </span>
        <span className="font-mono text-[10px] text-[#E79EFF] shrink-0">
          Illustrative Preview
        </span>
      </div>

      {/* Illustrative Verity UI Mockup inside Browser Frame */}
      <div className="p-4 sm:p-5 bg-[#0D0814]/95 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[rgba(184,164,255,0.12)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#E79EFF]">
              Verity · Controlled Simulation
            </p>
            <p className="font-display text-base font-semibold text-[#F7F3FB] mt-0.5">
              Borrower Offer &amp; Permission View
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#B8A4FF] border border-[rgba(184,164,255,0.25)] bg-[#160E22] px-2.5 py-1">
            <ShieldCheck className="w-3 h-3 text-[#E79EFF]" aria-hidden="true" />
            <span>0 duplicate requests</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-[rgba(184,164,255,0.18)] bg-[#160E22] p-3">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#E79EFF]">Simulated Lender A</span>
              <span className="text-[#C6B9DA]">Approved by rule</span>
            </div>
            <p className="mt-1.5 text-xs text-[#F7F3FB] font-medium">
              Clear offer breakdown verified by server rules
            </p>
            <p className="mt-1 text-[11px] text-[#9687AF] leading-[1.45]">
              AI explains verified terms only — consent checked before send.
            </p>
          </div>

          <div className="border border-[rgba(255,107,87,0.28)] bg-[#1A0E1B]/90 p-3">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#FF6B57]">Lost-Response Test</span>
              <span className="text-[#F7F3FB]">Protected</span>
            </div>
            <p className="mt-1.5 text-xs text-[#F7F3FB] font-medium">
              107 backend · 4 browser tests passed
            </p>
            <p className="mt-1 text-[11px] text-[#C6B9DA] leading-[1.45]">
              5-trial retry experiment: 0 duplicates vs 5 in unsafe flow.
            </p>
          </div>
        </div>
      </div>

      <figcaption className="px-4 py-3 border-t border-[rgba(184,164,255,0.14)] flex flex-wrap items-center justify-between gap-3 bg-[#160E22]">
        <span className="text-xs text-[#F7F3FB]">
          Verity — an AI lending reliability project I built.
        </span>
        {onOpenProject ? (
          <button
            type="button"
            onClick={onOpenProject}
            className="font-mono text-[11px] text-[#E79EFF] hover:text-[#F7F3FB] underline underline-offset-4 cursor-pointer shrink-0"
          >
            Inspect Verity
          </button>
        ) : (
          <span className="font-mono text-[10px] text-[#9687AF]">
            Real app screenshots pending
          </span>
        )}
      </figcaption>
    </motion.figure>
  );
}

export function AboutPhotoFrame() {
  return (
    <figure className="group relative border border-[rgba(184,164,255,0.22)] bg-[#160E22] overflow-hidden">
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#0D0814]">
        <img
          src="/assets/aistudio/image_6793fd79.png"
          alt="Portrait of Riya Mahato"
          loading="lazy"
          style={{ objectPosition: '50% 22%' }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <figcaption className="px-4 py-3 border-t border-[rgba(184,164,255,0.14)] flex items-center justify-between gap-2 text-xs">
        <span className="font-mono text-[11px] text-[#E79EFF]">
          Riya Mahato
        </span>
        <span className="text-[#C6B9DA]">New Delhi, India</span>
      </figcaption>
    </figure>
  );
}

export function ProjectScreenshotSlots({
  projectName,
  slots,
}: {
  projectName: string;
  slots: ImageSlotSpec[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-xs text-[#E79EFF] uppercase tracking-[0.1em]">
          Prepared Screenshot Slots · {projectName}
        </p>
        <span className="font-mono text-[11px] text-[#9687AF]">
          Ready for real app screenshots
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {slots.map((slot, idx) => (
          <div
            key={slot.id}
            className="border border-dashed border-[rgba(184,164,255,0.32)] bg-[#0D0814]/85 p-4 flex flex-col justify-between min-h-[144px]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-[#E79EFF]">
                SCREEN 0{idx + 1}
              </span>
              <ImagePlus className="w-4 h-4 text-[#B8A4FF]" aria-hidden="true" />
            </div>
            <div className="mt-3">
              <p className="font-display text-sm font-semibold text-[#F7F3FB]">
                {slot.title}
              </p>
              <p className="mt-1 text-xs text-[#9687AF] leading-[1.5]">
                {slot.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BeyondTheCodeGalleryProps {
  onInspect: (asset: PhotographyAsset) => void;
}

export function BeyondTheCodeGallery({ onInspect }: BeyondTheCodeGalleryProps) {
  const photos = getApprovedPhotographs();
  if (photos.length === 0) return null;

  const dominant = photos[1] ?? photos[0];
  const mediumTop = photos[2];
  const mediumBottom = photos[3];
  const secondaryPair = [photos[4], photos[0]].filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {dominant && (
          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group relative border border-[rgba(184,164,255,0.22)] bg-[#160E22] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => onInspect(dominant)}
              className="block w-full text-left cursor-pointer focus:outline-none"
              aria-label={`Expand ${dominant.category} photograph`}
            >
              <div className={`${dominant.aspectRatioClass} w-full overflow-hidden bg-[#0D0814]`}>
                <img
                  src={dominant.publicSrc}
                  alt={dominant.altText}
                  loading="lazy"
                  style={{ objectPosition: dominant.objectPosition }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <span className="absolute top-3 right-3 w-10 h-10 bg-[#0D0814]/80 border border-[rgba(184,164,255,0.3)] text-[#F7F3FB] flex items-center justify-center group-hover:border-[#D96BFF] transition-colors">
                <Maximize2 className="w-4 h-4" aria-hidden="true" />
              </span>
            </button>
            <figcaption className="p-5 sm:p-6 border-t border-[rgba(184,164,255,0.14)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#E79EFF]">
                  {dominant.category}
                </p>
                <p className="mt-1.5 text-sm sm:text-[15px] text-[#F7F3FB]">
                  {dominant.caption}
                </p>
              </div>
              <span className="font-mono text-[11px] text-[#9687AF] shrink-0">
                Click to expand
              </span>
            </figcaption>
          </motion.figure>
        )}

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:pt-8">
          {[mediumTop, mediumBottom].filter(Boolean).map((photo, idx) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08 * (idx + 1), ease: [0.16, 1, 0.3, 1] }}
              className="group relative border border-[rgba(184,164,255,0.2)] bg-[#160E22] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => onInspect(photo)}
                className="block w-full text-left cursor-pointer focus:outline-none"
                aria-label={`Expand ${photo.category} photograph`}
              >
                <div className={`${photo.aspectRatioClass} w-full overflow-hidden bg-[#0D0814]`}>
                  <img
                    src={photo.publicSrc}
                    alt={photo.altText}
                    loading="lazy"
                    style={{ objectPosition: photo.objectPosition }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <span className="absolute top-3 right-3 w-9 h-9 bg-[#0D0814]/80 border border-[rgba(184,164,255,0.3)] text-[#F7F3FB] flex items-center justify-center group-hover:border-[#D96BFF] transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </button>
              <figcaption className="p-4 border-t border-[rgba(184,164,255,0.14)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#B8A4FF]">
                  {photo.category}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#C6B9DA] leading-[1.5]">
                  {photo.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {secondaryPair.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {secondaryPair.map((photo, idx) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
              className={`${
                idx === 0 ? 'md:col-span-5' : 'md:col-span-7 md:mt-6'
              } group relative border border-[rgba(184,164,255,0.2)] bg-[#160E22] overflow-hidden`}
            >
              <button
                type="button"
                onClick={() => onInspect(photo)}
                className="block w-full text-left cursor-pointer focus:outline-none"
                aria-label={`Expand ${photo.category} photograph`}
              >
                <div className={`${photo.aspectRatioClass} w-full overflow-hidden bg-[#0D0814]`}>
                  <img
                    src={photo.publicSrc}
                    alt={photo.altText}
                    loading="lazy"
                    style={{ objectPosition: photo.objectPosition }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <span className="absolute top-3 right-3 w-9 h-9 bg-[#0D0814]/80 border border-[rgba(184,164,255,0.3)] text-[#F7F3FB] flex items-center justify-center group-hover:border-[#D96BFF] transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </button>
              <figcaption className="p-4 sm:p-5 border-t border-[rgba(184,164,255,0.14)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#FF6B57]">
                    {photo.category}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#C6B9DA] leading-[1.5]">
                    {photo.caption}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}
    </div>
  );
}

interface PhotoLightboxProps {
  asset: PhotographyAsset | null;
  onClose: () => void;
  onSelect: (asset: PhotographyAsset) => void;
}

export function PhotoLightbox({ asset, onClose, onSelect }: PhotoLightboxProps) {
  const photos = getApprovedPhotographs();
  const currentIndex = asset ? photos.findIndex((p) => p.id === asset.id) : -1;

  useEffect(() => {
    if (!asset) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && photos.length > 1) {
        onSelect(photos[(currentIndex + 1) % photos.length]);
      }
      if (e.key === 'ArrowLeft' && photos.length > 1) {
        onSelect(photos[(currentIndex - 1 + photos.length) % photos.length]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [asset, currentIndex, onClose, onSelect, photos]);

  return (
    <AnimatePresence>
      {asset && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={asset.category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#0D0814]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full border border-[rgba(184,164,255,0.28)] bg-[#160E22] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(184,164,255,0.16)]">
              <span className="font-mono text-xs text-[#E79EFF]">
                {asset.category} · {currentIndex + 1} / {photos.length}
              </span>
              <div className="flex items-center gap-2">
                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        onSelect(photos[(currentIndex - 1 + photos.length) % photos.length])
                      }
                      aria-label="Previous photograph"
                      className="w-10 h-10 flex items-center justify-center border border-[rgba(184,164,255,0.22)] text-[#F7F3FB] hover:border-[#D96BFF] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelect(photos[(currentIndex + 1) % photos.length])}
                      aria-label="Next photograph"
                      className="w-10 h-10 flex items-center justify-center border border-[rgba(184,164,255,0.22)] text-[#F7F3FB] hover:border-[#D96BFF] cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close lightbox"
                  className="w-10 h-10 flex items-center justify-center border border-[rgba(184,164,255,0.22)] text-[#F7F3FB] hover:border-[#D96BFF] cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="max-h-[72vh] overflow-hidden bg-[#0D0814] flex items-center justify-center">
              <img
                src={asset.publicSrc}
                alt={asset.altText}
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 border-t border-[rgba(184,164,255,0.16)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <p className="text-sm text-[#F7F3FB]">{asset.caption}</p>
              <span className="font-mono text-xs text-[#9687AF] shrink-0">
                {asset.projectAssociation}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function HeroPortraitFrame() {
  return <HeroVerityPreview />;
}

export function ExperiencePhotoGallery() {
  const [selected, setSelected] = useState<PhotographyAsset | null>(null);
  return (
    <>
      <BeyondTheCodeGallery onInspect={setSelected} />
      <PhotoLightbox
        asset={selected}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
      />
    </>
  );
}
