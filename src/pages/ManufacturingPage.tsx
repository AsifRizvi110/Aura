import React, { useState } from 'react';
import { MANUFACTURING_STEPS } from '../data/companyData';
import {
  Factory,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Package,
  Layers,
  Scissors,
  Wrench,
  Flame,
  Globe,
  ArrowRight,
  Cpu
} from 'lucide-react';

interface ManufacturingPageProps {
  onOpenQuoteModal: () => void;
}

export const ManufacturingPage: React.FC<ManufacturingPageProps> = ({ onOpenQuoteModal }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStepData = MANUFACTURING_STEPS.find(s => s.stepNumber === activeStep) || MANUFACTURING_STEPS[0];

  const stageIcons = [
    <Layers key="1" className="w-5 h-5" />,
    <Cpu key="2" className="w-5 h-5" />,
    <Scissors key="3" className="w-5 h-5" />,
    <Wrench key="4" className="w-5 h-5" />,
    <Sparkles key="5" className="w-5 h-5" />,
    <Layers key="6" className="w-5 h-5" />,
    <ShieldCheck key="7" className="w-5 h-5" />,
    <Flame key="8" className="w-5 h-5" />,
    <Package key="9" className="w-5 h-5" />,
    <Globe key="10" className="w-5 h-5" />
  ];

  return (
    <div id="manufacturing-page-root" className="pt-32 sm:pt-36 pb-20 space-y-20">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
          <Factory className="w-3.5 h-3.5" />
          <span>Karachi Facility Engineering</span>
        </div>

        {/* Required Heading */}
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
          Professional Cap Manufacturing
        </h1>

        {/* Required Exact Introduction */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          At Aura Global Industries, every cap goes through a structured manufacturing process designed to maintain quality, consistency and professional finishing.
        </p>
      </section>

      {/* Interactive Process Pipeline Viewer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dark-industrial-card rounded-3xl border border-white/15 p-6 lg:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase font-semibold text-[#D4AF37] tracking-wider">
                Interactive Factory Tour
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Step-by-Step Production Architecture
              </h2>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300">
              Active Stage: <strong className="text-[#D4AF37]">{currentStepData.stepNumber} of 10</strong>
            </span>
          </div>

          {/* Stepper Buttons Slider */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {MANUFACTURING_STEPS.map((s, idx) => (
              <button
                key={s.stepNumber}
                onClick={() => setActiveStep(s.stepNumber)}
                className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer border ${
                  activeStep === s.stepNumber
                    ? 'bg-gradient-to-b from-[#D4AF37] to-[#B8860B] text-black border-[#D4AF37] shadow-lg font-bold'
                    : 'bg-slate-950/70 text-slate-400 hover:text-white border-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-[11px] font-bold">0{s.stepNumber}</span>
                <span className="text-[10px] truncate max-w-full leading-tight font-medium">
                  {s.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Feature Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
              <img
                src={currentStepData.imageUrl}
                alt={`${currentStepData.title} at Aura Global Industries Factory`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-slate-300">
                <span className="text-[#D4AF37] font-semibold">Factory Checkpoint: </span>
                {currentStepData.highlights[0]}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                  STAGE 0{currentStepData.stepNumber}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  {currentStepData.title}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStepData.detailedDesc}
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-white uppercase tracking-wider">
                  Key Stage Deliverables:
                </p>
                <div className="space-y-2">
                  {currentStepData.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DETAILED PRODUCTION SECTIONS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Comprehensive Stage Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From technical design consultation in Karachi to international export customs clearance.
          </p>
        </div>

        {/* 1. Material Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Section 01</span>
            <h3 className="font-heading text-2xl font-bold text-white">Material Selection</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We conduct thorough fabric selection according to design, durability, comfort, weight, and customer requirements. We inspect colorfastness, shrinkage rating, weave tension, and tensile strength before the cutting line begins.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> High-grade combed cotton, heavy chino twill, ripstop & performance mesh
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Premium buckram fusing for firm, lasting crown shapes
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10]">
            <img
              src="/images/Custom Fabric Options Headwear Fabric.png"
              alt="Material Selection at Aura Global Industries"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 2. Design & Development */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] md:order-2">
            <img
              src="/images/Design & Development.png"
              alt="Design and Development CAD Pattern Engineering"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3 md:order-1">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Section 02</span>
            <h3 className="font-heading text-2xl font-bold text-white">Design & Development</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We engineer custom patterns, crown profiles, panel shapes, closure styles, pantone-matched dyes, logos, and branding elements. Our CAD pattern grading ensures exact fits across all standard adult and custom size scales.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Tech pack evaluation and digital mockups
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Pre-production sample prototyping for client sign-off
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Cutting & Stitching */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Section 03 & 04</span>
            <h3 className="font-heading text-2xl font-bold text-white">Accurate Cutting & Stitching</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Accurate fabric cutting and preparation utilizing hydraulic multi-ply die cutters. Professional stitching and assembly by skilled machine operators using high-tenacity thread with strict stitch density calibration (8-10 stitches per inch).
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Multi-ply zero distortion die cutting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Heavy-duty dual-needle lockstitch machines for peak durability
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10]">
            <img
              src="/images/Accurate Cutting & Stitching.png"
              alt="Precision stitching line in Karachi factory"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4. Embroidery & Printing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] md:order-2">
            <img
              src="/images/05 Embroidery  Printing.png"
              alt="High-density 3D puff embroidery"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3 md:order-1">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Section 05</span>
            <h3 className="font-heading text-2xl font-bold text-white">Embroidery & Printing</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Custom logo embroidery, prints, and branding options. We provide multi-head computerized 3D foam puff embroidery, flat thread embroidery, screen printing, high-density silicone prints, woven patches, and embossed leather tags.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> 3D Puff Embroidery (3mm to 5mm EVA foam depth)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Screen, silicone gel, sublimation, and reflective 3M heat transfers
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Finishing & Quality Control */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Section 06 & 07</span>
            <h3 className="font-heading text-2xl font-bold text-white">Finishing & Quality Control</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Final shaping, steam mold blocking, ultrasonic trimming, and comprehensive inspection for stitching, embroidery, printing, sizing, shape, and overall finishing.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Heated pneumatic cap blocking to lock in crown silhouette
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> 100% individual inspection against customer approved golden sample
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10]">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="Quality Control audit at Aura Global Industries"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 6. Packaging & Dispatch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] md:order-2">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
              alt="Professional Packaging for export"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3 md:order-1">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Section 08</span>
            <h3 className="font-heading text-2xl font-bold text-white">Packaging & Global Dispatch</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Professional packaging and preparation for dispatch. Fitted with cardboard crown stays, moisture-proof polybags, barcode labels, and packed into heavy 5-ply export master cartons for containerized sea freight or air express.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Custom retail hangtags, barcodes, and inner cartons
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Direct logistics from Port of Karachi to global destinations
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Production Booking Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#141A28] to-slate-900 border border-[#D4AF37]/30 text-center space-y-6">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Schedule a Manufacturing Consultation
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Send your tech packs, embroidery artwork, and target volume to our Karachi production team for direct manufacturer quoting and turnaround estimates.
          </p>
          <button
            onClick={onOpenQuoteModal}
            className="gold-btn-gradient px-8 py-3.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-xl"
          >
            <span>Request Factory Production Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
