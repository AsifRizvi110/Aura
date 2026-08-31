import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageId, ProductItem } from '../types';
import { CapCustomizer } from '../components/CapCustomizer';
import {
  PRODUCT_CATEGORIES,
  FABRIC_MATERIALS,
  MANUFACTURING_STEPS,
  QUALITY_PILLARS,
  WHY_CHOOSE_US
} from '../data/companyData';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Factory,
  Layers,
  ChevronRight,
  Send,
  MapPin,
  Check
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: (preselectedProduct?: string) => void;
  onSelectCategoryFilter: (categorySlug: string) => void;
  onSelectProductModal: (product: ProductItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onSelectCategoryFilter
}) => {
  const { t } = useLanguage();
  const [activeMaterialTab, setActiveMaterialTab] = useState<string>('fab-1');

  const selectedMaterial = FABRIC_MATERIALS.find(m => m.id === activeMaterialTab) || FABRIC_MATERIALS[0];

  return (
    <div id="home-page-root" className="space-y-20 sm:space-y-28 pb-16">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION - SLEEK INTERFACE THEME */}
      {/* ========================================================================= */}
      <section
        id="hero-section"
        className="relative pt-28 sm:pt-36 pb-16 lg:pb-20 overflow-hidden bg-sleek-grid border-b border-white/10"
      >
        {/* Sleek subtle ambient illumination */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left relative z-10 py-4">
              {/* Technical Cert / Export Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold w-fit rounded-sm bg-[#0F0F0F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>{t('hero.badge', 'Karachi Factory Hub • Global Cap Manufacturer')}</span>
              </div>

              {/* High-Impact Sleek Headline */}
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tighter uppercase">
                {t('hero.titleLine1', 'PREMIUM CAPS.')}<br />
                <span className="text-[#D4AF37]">{t('hero.titleLine2', 'GLOBAL QUALITY.')}</span>
              </h1>

              {/* Exact Supporting Text */}
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal">
                {t('hero.description', 'Aura Global Industries is a professional cap manufacturer based in Karachi, Pakistan, delivering premium-quality caps with modern manufacturing, custom designs, quality fabrics and reliable production for local and international businesses.')}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="hero-explore-products-btn"
                  onClick={() => onNavigate('products')}
                  className="sleek-btn-primary px-8 py-4 rounded-sm flex items-center justify-center gap-2 cursor-pointer font-bold text-xs uppercase tracking-wider"
                >
                  <span>{t('hero.exploreBtn', 'Explore Collection')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-factory-btn"
                  onClick={() => onNavigate('manufacturing')}
                  className="sleek-btn-outline px-8 py-4 rounded-sm flex items-center justify-center gap-2 cursor-pointer font-bold text-xs uppercase tracking-wider"
                >
                  <span>{t('hero.factoryBtn', 'Our Factory')}</span>
                </button>

                <button
                  id="hero-get-quote-btn"
                  onClick={() => onOpenQuoteModal()}
                  className="sleek-btn-white px-6 py-4 rounded-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-[#D4AF37] hover:text-white font-bold text-xs uppercase tracking-wider"
                >
                  <span>{t('hero.quoteBtn', 'Get a Quote')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Technical Spec Metrics */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{t('hero.metricWorkflow', 'Workflow')}</span>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">{t('hero.metric10Step', '10-Step QA')}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">{t('hero.metricService', 'Service')}</span>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">{t('hero.metricOEM', 'OEM / ODM')}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{t('hero.metricLogistics', 'Logistics')}</span>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">{t('hero.metricDirectExport', 'Direct Export')}</span>
                </div>
              </div>
            </div>

            {/* Right Sleek Industrial Manufacturing Panel */}
            <div className="lg:col-span-5 bg-[#0F0F0F] border border-white/10 p-6 sm:p-8 flex flex-col justify-between rounded-sm space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 flex items-center justify-between">
                    <span>Manufacturing Process</span>
                    <span className="text-[10px] text-zinc-500 font-mono">10 STAGES</span>
                  </h3>

                  {/* Micro Stepper */}
                  <div className="space-y-2.5">
                    {MANUFACTURING_STEPS.slice(0, 5).map((s, idx) => (
                      <div
                        key={s.stepNumber}
                        className={`flex items-center gap-4 group transition-colors cursor-pointer ${
                          idx === 4 ? 'text-[#D4AF37] font-bold' : 'text-zinc-300 hover:text-white'
                        }`}
                        onClick={() => onNavigate('manufacturing')}
                      >
                        <span className="text-[11px] font-mono text-zinc-500 group-hover:text-[#D4AF37]">
                          0{s.stepNumber}
                        </span>
                        <span className="text-xs uppercase tracking-wider border-b border-white/5 flex-grow pb-1">
                          {s.title}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Factory Hub Card */}
                <div className="bg-[#141414] p-5 border border-white/5 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Factory Hub</h3>
                    <span className="text-[10px] font-mono text-[#D4AF37]">PK-KHI</span>
                  </div>
                  <p className="text-xs text-zinc-400">Nazimabad, Karachi, Pakistan</p>
                  
                  {/* Visual Factory Preview Frame */}
                  <div className="w-full h-28 bg-[#1A1A1A] rounded-sm overflow-hidden border border-white/10 relative group">
                    <img
                      src="/images/map.jpg"
                      alt="Aura Global Industries Cap Production"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[10px] text-white uppercase tracking-widest font-semibold bg-black/70 px-3 py-1 rounded-sm border border-white/10">
                        Karachi Production Unit
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Partners Footer in Hero */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 tracking-widest">Executive Partners</p>
                  <p className="text-xs font-semibold text-zinc-200">Syed Hashim Hussain Rizvi • Syed Masoom Raza</p>
                </div>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs text-[#D4AF37] hover:underline uppercase font-bold text-[10px] tracking-wider"
                >
                  About Us →
                </button>
              </div>
            </div>
          </div>

          {/* Mandatory Short Company Introduction */}
          <div className="mt-12 p-6 rounded-sm bg-[#0F0F0F] border border-white/10 text-center">
            <p className="font-heading text-base sm:text-xl text-zinc-200 font-semibold tracking-tight">
              “We manufacture caps that combine quality materials, modern design and professional craftsmanship.”
            </p>
            <p className="text-[11px] text-[#D4AF37] uppercase tracking-[0.25em] mt-2 font-mono">
              Aura Global Industries • Nazimabad, Karachi, Pakistan
            </p>
          </div>
        </div>
      </section>


          {/* =========================================================
    360° CAP CUSTOMIZER
    HERO KE BAAD
========================================================= */}
<section
  id="cap-customizer-section"
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
>
  <CapCustomizer />
</section>

      {/* ========================================================================= */}
      {/* 2. PRODUCT QUALITY SECTION */}
      {/* ========================================================================= */}
      <section id="quality-section"></section>

      {/* ========================================================================= */}
      {/* 2. PRODUCT QUALITY SECTION */}
      {/* ========================================================================= */}
      <section id="quality-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Manufacturing Standards</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Quality That Makes the Difference
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            At Aura Global Industries, our production methodology centers on dimensional stability, stitch precision, durable materials, and stringent quality control.
          </p>
        </div>

        {/* 9 Quality Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUALITY_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="sleek-card p-6 rounded-sm space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#D4AF37]">
                  0{idx + 1}
                </span>
                <Check className="w-3.5 h-3.5 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
                {pillar.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Material Selection Note */}
        <div className="mt-6 p-4 rounded-sm bg-[#0F0F0F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>Different fabrics and materials can be selected according to customer requirements, design, season and application.</span>
          </p>
          <button
            onClick={() => onOpenQuoteModal()}
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer"
          >
            Fabric Consultation <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FABRIC & MATERIAL SECTION */}
      {/* ========================================================================= */}
      <section id="materials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
            <Layers className="w-3.5 h-3.5" />
            <span>Raw Materials Catalog</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Premium Materials & Fabrics
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto">
            Material selection can be customized according to the customer's design and requirements. Explore our core headwear textiles below:
          </p>
        </div>

        {/* Material Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none justify-start lg:justify-center">
          {FABRIC_MATERIALS.map((fabric) => (
            <button
              key={fabric.id}
              onClick={() => setActiveMaterialTab(fabric.id)}
              className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeMaterialTab === fabric.id
                  ? 'bg-[#D4AF37] text-white shadow-md'
                  : 'bg-[#0F0F0F] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {fabric.name}
            </button>
          ))}
        </div>

        {/* Active Material Showcase Card */}
        <div className="mt-6 bg-[#0F0F0F] rounded-sm border border-white/10 overflow-hidden p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative rounded-sm overflow-hidden aspect-[4/3] border border-white/10 bg-black">
              <img
                src={selectedMaterial.imageUrl}
                alt={`${selectedMaterial.name} fabric close-up - Aura Global Industries`}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain block"
              />
              <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] border border-white/10">
                {selectedMaterial.type}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-mono block">
                  Material Specification
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                  {selectedMaterial.name} Headwear Fabric
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedMaterial.description}
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">
                  Key Material Characteristics:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedMaterial.characteristics.map((char, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 bg-[#141414] p-2.5 rounded-sm border border-white/5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-zinc-500">Best Application: </span>
                  <strong className="text-white uppercase font-semibold">{selectedMaterial.bestFor}</strong>
                </div>

                <button
                  onClick={() => onOpenQuoteModal(`Custom ${selectedMaterial.name} Cap`)}
                  className="sleek-btn-primary px-5 py-2.5 rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request {selectedMaterial.name} Sample</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Fabric Cards Summary Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FABRIC_MATERIALS.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveMaterialTab(m.id)}
              className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                activeMaterialTab === m.id
                  ? 'bg-[#141414] border-[#D4AF37]'
                  : 'bg-[#0F0F0F] border-white/5 hover:border-white/20'
              }`}
            >
              <p className="font-bold text-xs text-white uppercase tracking-wider">{m.name}</p>
              <p className="text-[10px] text-zinc-500 truncate mt-0.5">{m.bestFor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MANUFACTURING SECTION ON HOME PAGE */}
      {/* ========================================================================= */}
      <section
        id="manufacturing-timeline-section"
        className="relative bg-[#0F0F0F] py-14 sm:py-18 border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0A0A0A]">
              <Factory className="w-3.5 h-3.5" />
              <span>Production Pipeline</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              From Fabric to Finished Cap
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Aura Global Industries pays attention to detail at every stage of manufacturing. Experience our 10-step precision workflow:
            </p>
          </div>

          {/* 10-Step Timeline Visual Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {MANUFACTURING_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-4 rounded-sm bg-[#0A0A0A] border border-white/10 hover:border-[#D4AF37]/40 transition-all group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] px-2 py-0.5 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                      STAGE 0{step.stepNumber}
                    </span>
                  </div>

                  <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {step.shortDesc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 text-[10px] text-zinc-500 font-mono truncate">
                  {step.highlights[0]}
                </div>
              </div>
            ))}
          </div>

          {/* Mandatory Button */}
          <div className="text-center pt-2">
            <button
              id="explore-manufacturing-cta-btn"
              onClick={() => onNavigate('manufacturing')}
              className="sleek-btn-primary px-8 py-3.5 rounded-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Explore Our Manufacturing Process</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRODUCT CATEGORIES SECTION */}
      {/* ========================================================================= */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Headwear Catalog</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Explore Our Cap Collection
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              From classic sports caps to urban snapbacks, 5-panels, and bespoke embroidered headwear, our Karachi facility is equipped to manufacture all silhouettes.
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>View Full Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="sleek-card rounded-sm overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={cat.imageUrl}
                    alt={`${cat.name} by Aura Global Industries`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] bg-black/80 px-2 py-0.5 rounded-sm border border-white/10">
                    {cat.itemCount}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    onSelectCategoryFilter(cat.slug);
                    onNavigate('products');
                  }}
                  className="w-full py-2 px-3 rounded-sm bg-[#141414] hover:bg-[#D4AF37] text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>View Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHY CHOOSE US SECTION */}
      {/* ========================================================================= */}
      <section id="why-choose-us-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-sm bg-[#0F0F0F] border border-white/10 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0A0A0A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Export Advantages</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Why Choose Aura Global Industries?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              We provide an integrated manufacturing partnership for international brands, wholesalers, and retail distributors requiring high standards and reliable delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-sm bg-[#0A0A0A] border border-white/10 hover:border-[#D4AF37]/40 transition-all space-y-3 group"
              >
                <div className="w-9 h-9 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <ShieldCheck className="w-4 h-4" />
                </div>

                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Consultation CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="font-heading font-bold text-white text-base uppercase tracking-tight">
                Ready to manufacture your brand's next cap line?
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Reach out directly to our team in Nazimabad, Karachi for sampling & technical spec review.
              </p>
            </div>

            <button
              onClick={() => onOpenQuoteModal()}
              className="sleek-btn-primary px-7 py-3 rounded-sm flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-lg"
            >
              <span>Get Custom Quote</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
