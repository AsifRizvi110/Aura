import React, { useState } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, FAQ_ITEMS } from '../data/companyData';
import { AuraLogo } from '../components/AuraLogo';
import {
  MapPin,
  Building2,
  Users,
  ShieldCheck,
  Globe2,
  CheckCircle,
  ArrowRight,
  Mail,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Clock,
  Truck,
  Layers,
  Sparkles,
  DollarSign,
  Send
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-moq-1');

  const focusPillars = [
    { title: 'Quality Assurance', desc: 'Uncompromising standards across fabric GSM inspection, stitching tension, and embroidery accuracy.' },
    { title: 'Craftsmanship', desc: 'Expert technical tailors and pattern engineers with decades of headwear manufacturing mastery.' },
    { title: 'Modern Designs', desc: 'Contemporary silhouettes adapted to global streetwear, sportswear, and private label fashion trends.' },
    { title: 'Custom OEM/ODM', desc: 'End-to-end private label production manufactured strictly according to client tech packs.' },
    { title: 'Customer Commitment', desc: 'Transparent communication, rapid sample turnaround, and dedicated export account managers.' },
    { title: 'Modern Machinery', desc: 'Multi-head computerized embroidery, pneumatic steam shaping molds, and 10-stage workflows.' },
    { title: 'Long-term Partnerships', desc: 'Strategic manufacturing partnerships supporting international brands as their supply chain scales.' }
  ];

  const faqCategories = [
    { label: 'All Queries', value: 'all', icon: HelpCircle },
    { label: 'MOQs & Volume', value: 'moq', icon: Layers },
    { label: 'Lead Times', value: 'lead-times', icon: Clock },
    { label: 'Shipping & Freight', value: 'shipping', icon: Truck },
    { label: 'Customization', value: 'customization', icon: Sparkles },
    { label: 'Quality & QC', value: 'quality', icon: ShieldCheck },
    { label: 'Payment Terms', value: 'payment', icon: DollarSign }
  ];

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = selectedFaqCategory === 'all' || faq.category === selectedFaqCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.categoryLabel.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      (faq.highlights && faq.highlights.some(h => h.toLowerCase().includes(faqSearchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId(prev => (prev === id ? null : id));
  };

  // Schema.org structured data (Organization / LocalBusiness) — helps Google
  // show rich results (address, contact, logo) for this page. Rendered as
  // JSON-LD, invisible to users, read by search engine crawlers.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Aura Global Industries',
    description:
      'Professional cap manufacturer based in Karachi, Pakistan, delivering premium-quality custom caps, OEM/ODM headwear manufacturing, and private label production for local and international businesses.',
    email: 'auraglobalindustries@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nazimabad, Karachi',
      addressCountry: 'PK'
    },
    areaServed: 'Worldwide',
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Custom Manufactured Caps & Headwear (OEM/ODM)'
      }
    }
  };

  return (
    <div id="about-page-root" className="pt-28 sm:pt-36 pb-20 space-y-20">
      {/* SEO: structured data so search engines understand this is a
          Karachi-based cap manufacturer (helps rich snippets / local SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ========================================================================= */}
      {/* 1. PAGE HEADER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 flex flex-col items-center">
        <div className="p-6 rounded-sm bg-[#0E0E0E]/90 border border-amber-500/20 shadow-[0_10px_35px_rgba(245,158,11,0.1)] inline-block">
          <AuraLogo size="xl" showTagline={true} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
          <Building2 className="w-3.5 h-3.5" />
          <span>Our Heritage & Corporate Profile</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight">
          About Aura Global Industries
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Aura Global Industries is a professional cap manufacturer based in Karachi, Pakistan, delivering premium-quality caps with modern manufacturing, custom designs, quality fabrics and reliable production for local and international businesses.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORPORATE PROFILE & FACTORY STORY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sleek-card rounded-sm p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono block">
                Corporate Manufacturing Vision
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-snug">
                Delivering World-Class Cap Manufacturing from Karachi
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Operating out of Nazimabad, Karachi—Pakistan’s primary industrial textile epicentre—Aura Global Industries has established a reputation for headwear manufacturing excellence. We blend precision pattern engineering, specialized high-speed machinery, and skilled craftsmanship to produce high-grade caps that compete on the international market.
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Whether supporting emerging fashion labels, multinational corporations with custom apparel uniforms, or global distributors requiring high-volume container shipments, our Karachi facility provides dedicated OEM/ODM manufacturing tailored to exact technical specifications.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-sm bg-[#141414] border border-white/5 space-y-1 font-mono">
                  <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">Facility Hub</p>
                  <p className="text-xs font-bold text-white uppercase font-sans">Nazimabad, Karachi</p>
                  <p className="text-[10px] text-zinc-500">Direct Access to Major Sea & Air Ports</p>
                </div>

                <div className="p-4 rounded-sm bg-[#141414] border border-white/5 space-y-1 font-mono">
                  <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">Export Focus</p>
                  <p className="text-xs font-bold text-white uppercase font-sans">OEM / ODM Headwear</p>
                  <p className="text-[10px] text-zinc-500">100% Private Label Customization</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
  <div
    className="rounded-sm overflow-hidden border border-white/10 aspect-[4/3] bg-black shadow-2xl"
    role="img"
    aria-label="Workers manufacturing custom caps inside Aura Global Industries' factory in Nazimabad, Karachi"
  >
    <video
      src="/images/Workers_manufacturing_caps_in_fa…_202608200317.mp4"
      poster="/images/factory-workers-manufacturing-caps-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      title="Aura Global Industries factory floor — cap manufacturing in Karachi"
      className="w-full h-full object-cover"
    >
      Your browser does not support embedded videos. This video shows workers
      manufacturing custom caps at the Aura Global Industries factory in
      Nazimabad, Karachi.
    </video>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE PRINCIPLES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] font-mono">
            Core Foundations
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            What Drives Aura Global Industries
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400">
            Our company principles ensure high quality and dependable delivery for all clients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {focusPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm bg-[#0F0F0F] border border-white/10 hover:border-[#D4AF37]/40 transition-all space-y-2.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#D4AF37]">
                  0{idx + 1}
                </span>

                <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
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
      </section>

      {/* ========================================================================= */}
      {/* 4. OUR EXECUTIVE PARTNERS */}
      {/* ========================================================================= */}
      <section id="partners-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
            <Users className="w-3.5 h-3.5" />
            <span>Executive Leadership</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight ">
            Our Partners
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400">
            Leading Aura Global Industries with strategic operational expertise and technical headwear manufacturing mastery.
          </p>
        </div>

        {/* 2 Partner Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto ">
          {COMPANY_INFO.partners.map((partner, idx) => (
            <div
              key={idx}
              className="sleek-card rounded-sm p-6 sm:p-8 space-y-5 hover:border-[#D4AF37]/40 transition-all group"
            >
              <div className="flex items-center gap-4">

                {/* Partner Image */}
                <div className="w-14 h-14 rounded-sm overflow-hidden bg-[#141414] border border-[#D4AF37]/30 shrink-0 ">
                  <img
                    src={partner.imageUrl}
                    alt={
                      partner.imageAlt ||
                      `${partner.name}, ${partner.role} at Aura Global Industries — Karachi-based cap manufacturer`
                    }
                    loading="lazy"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
  {partner.name}
</h3>

                  <p className="text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase font-mono">
                    {partner.role}
                  </p>

                  <p className="text-[10px] text-zinc-500 uppercase">
                    Aura Global Industries
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-[#141414] border border-white/5 text-xs text-zinc-300 leading-relaxed">
                {partner.bio}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-zinc-400">
                <span className="text-[10px] font-mono uppercase text-zinc-500">
                  Executive Leadership
                </span>

                <span className="text-[#D4AF37] text-xs font-semibold flex items-center gap-1">
                  Verified Partner
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NEW: FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
      {/* ========================================================================= */}
      <section id="faq-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>International Buyer Knowledge Base</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Find immediate answers regarding Minimum Order Quantities (MOQs), prototype and bulk production lead times, worldwide shipping from Karachi, custom branding, and payment terms.
          </p>
        </div>

        {/* FAQ Filter & Search Control Panel */}
        <div className="space-y-4">
          <div className="p-3 sm:p-4 rounded-sm bg-[#0F0F0F] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {faqCategories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedFaqCategory === cat.value;

                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedFaqCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4AF37] text-white shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                placeholder="Search FAQs (e.g. MOQ, transit, sample)..."
                className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#0A0A0A] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-sm bg-[#0F0F0F] border border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                Standard MOQ
              </span>

              <span className="text-xs font-bold text-white uppercase font-mono">
                100 - 300 Pcs
              </span>
            </div>

            <div className="p-3 rounded-sm bg-[#0F0F0F] border border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                Sample Turnaround
              </span>

              <span className="text-xs font-bold text-[#D4AF37] uppercase font-mono">
                5 - 7 Days
              </span>
            </div>

            <div className="p-3 rounded-sm bg-[#0F0F0F] border border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                Air / Sea Freight
              </span>

              <span className="text-xs font-bold text-white uppercase font-mono">
                Direct Export
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 text-center bg-[#0F0F0F] rounded-sm border border-white/10 space-y-3">
              <p className="text-xs text-zinc-400">
                No questions found matching "{faqSearchQuery}".
              </p>

              <button
                onClick={() => {
                  setSelectedFaqCategory('all');
                  setFaqSearchQuery('');
                }}
                className="text-xs text-[#D4AF37] hover:underline uppercase font-bold tracking-wider cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isExpanded = expandedFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-sm border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#0F0F0F] border-[#D4AF37]/50 shadow-lg'
                      : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded-sm border border-[#D4AF37]/30 shrink-0 mt-0.5 sm:mt-0">
                        0{index + 1}
                      </span>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block">
                          {faq.categoryLabel}
                        </span>

                        <h3 className="font-heading text-sm sm:text-base font-bold text-white tracking-wide">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className="shrink-0 p-1.5 rounded-sm bg-[#141414] text-zinc-400 border border-white/5 mt-1 sm:mt-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content Body */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/5 text-xs text-zinc-300 space-y-4 animate-in fade-in duration-200">
                      <div className="leading-relaxed whitespace-pre-line text-zinc-300 text-xs sm:text-[13px]">
                        {faq.answer}
                      </div>

                      {/* Technical Highlights Chips */}
                      {faq.highlights && faq.highlights.length > 0 && (
                        <div className="pt-3 border-t border-white/5 space-y-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                            Key Specifications & Takeaways:
                          </span>

                          <div className="flex flex-wrap gap-2">
                            {faq.highlights.map((highlight, hIdx) => (
                              <div
                                key={hIdx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#141414] border border-white/10 text-[11px] text-zinc-200 font-mono"
                              >
                                <CheckCircle className="w-3 h-3 text-[#D4AF37] shrink-0" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Direct Inquiry / Question Callout Box */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#0F0F0F] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left max-w-xl">
            <h4 className="font-heading text-base sm:text-lg font-bold text-white uppercase tracking-tight">
              Have a Specific Tech Pack or Custom Export Requirement?
            </h4>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Our export management team in Nazimabad, Karachi provides custom quotation sheets, sampling schedules, and freight rate calculations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="sleek-btn-primary px-6 py-2.5 rounded-sm text-xs flex items-center gap-2 cursor-pointer shadow-md whitespace-nowrap"
            >
              <span>Request Custom Quote</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <a
              href="mailto:auraglobalindustries@gmail.com"
              className="sleek-btn-outline px-5 py-2.5 rounded-sm text-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Our Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FACTORY LOCATION SECTION */}
      {/* ========================================================================= */}
      <section id="factory-location-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm bg-[#0F0F0F] border border-white/10 p-8 sm:p-12 space-y-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
                <MapPin className="w-4 h-4" />
                <span>Production Facility Hub</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                Our Factory
              </h2>
              

              <p className="text-sm text-zinc-300 font-medium">
                Nazimabad, Karachi, Pakistan
              </p>
              
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="sleek-btn-primary px-8 py-3 rounded-sm text-xs flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap self-start md:self-auto"
            >
              <span>Visit / Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Map Visual Representation */}
          
            {/* Real Map Background */}
<div className="relative rounded-sm overflow-hidden border border-white/10 bg-black aspect-[21/9] min-h-[280px]">

  {/* Karachi / Nazimabad Map */}
  <iframe
    src="https://www.google.com/maps?q=Nazimabad%2C%20Karachi%2C%20Pakistan&output=embed"
    className="absolute inset-0 w-full h-full border-0 grayscale opacity-80"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Aura Global Industries - Nazimabad Karachi"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/30 pointer-events-none" />

  {/* Factory Pin */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative flex flex-col items-center">

      <div className="absolute w-32 h-32 rounded-full border border-[#D4AF37]/40 animate-ping opacity-30" />

      <div className="relative z-10 px-5 py-3 rounded-sm bg-[#0A0A0A]/95 backdrop-blur-md border border-[#D4AF37] shadow-2xl text-center">
        <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 justify-center uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          Aura Global Industries
        </p>

        <p className="text-[10px] sm:text-[11px] text-[#D4AF37] font-medium font-mono mt-1">
          Nazimabad, Karachi, Pakistan
        </p>
      </div>

      <div className="w-3 h-3 bg-[#D4AF37] rotate-45 -mt-1.5 shadow-lg" />
    </div>
  </div>

  {/* Bottom Information */}
  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-sm bg-black/90 backdrop-blur-md border border-white/10 text-xs text-zinc-300">

    <span className="flex items-center gap-2">
      <Globe2 className="w-4 h-4 text-[#D4AF37]" />
      Karachi Textile Export Corridor
    </span>

    <a
      href="mailto:Info@auraglobalindustries.com"
      className="text-[#D4AF37] hover:underline font-semibold flex items-center gap-1 font-mono"
    >
      <Mail className="w-3.5 h-3.5" />
      Info@auraglobalindustries.com
    </a>

  </div>
</div>


        </div>
      </section>
    </div>
  );
};