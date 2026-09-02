import React, { useState, useEffect } from 'react';
import {
  Shield,
  Crosshair,
  Layers,
  Check,
  ArrowUpRight,
  Sparkles,
  Info,
  Search,
  Eye,
  Award,
  Zap,
  GraduationCap,
  Building2,
  Home
} from 'lucide-react';

interface TacticalItem {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  targetSector: string;
  description: string;
  material: string;
  closure: string;
  imageUrl: string;
  features: string[];
}

const TACTICAL_CATALOG: TacticalItem[] = [
  // ===================== MILITARY & ARMED FORCES =====================
  {
    id: 'tac-01',
    name: 'Military Operator Patch Cap',
    category: 'Military & Army',
    categorySlug: 'military',
    targetSector: 'Armed Forces & Special Ops',
    description: 'Front loop velcro panel (3x2 inch) designed for unit morale patches with rear name-tape loop and no-button crown for ear-pro compatibility.',
    material: 'Ripstop Cotton / Poly Blend (50/50)',
    closure: 'Hook & Loop Tactical Strap',
    imageUrl: '/images/Tactical 01.jpeg',
    features: ['Front/Rear Loop Velcro', 'Anti-Glare Under-Visor', 'No-Button Headset Crown']
  },
  {
    id: 'tac-02',
    name: 'Mil-Spec Camo Boonie Hat',
    category: 'Military & Army',
    categorySlug: 'military',
    targetSector: 'Field Operations & Desert Camo',
    description: '360-degree wide protective brim with foliage loops, screen brass ventilation eyelets, and adjustable retention paracord strap.',
    material: 'Heavy-Duty Mil-Spec Ripstop',
    closure: 'Adjustable Chin Strap w/ Cord Lock',
    imageUrl: '/images/Tactical 02.jpeg',
    features: ['Foliage Webbing Loops', 'Brass Vented Eyelets', 'Full Weather Shield']
  },
  {
    id: 'tac-03',
    name: 'Laser-Cut Combat Operator Cap',
    category: 'Military & Army',
    categorySlug: 'military',
    targetSector: 'Commando & Quick Response',
    description: 'High-endurance operator cap featuring precision laser-cut hexagon perforations for maximum thermal airflow during high-intensity operations.',
    material: '4-Way Stretch Performance Nylon',
    closure: 'Rubberized Elastic Pull Strap',
    imageUrl: '/images/Tactical 03.jpeg',
    features: ['Laser-Cut Hex Airflow', 'Subdued PVC Compatibility', 'Moisture-Wicking Headband']
  },

  // ===================== CADET COLLEGES & MILITARY ACADEMIES =====================
  {
    id: 'tac-cadet-01',
    name: 'Cadet College Official Drill Cap',
    category: 'Cadet College',
    categorySlug: 'cadet',
    targetSector: 'Cadet Colleges & Training Academies',
    description: 'High-structure formal drill cap tailored with heavy buckram, reinforced peak, golden metallic badge mounting loop, and brass side ventilation eyelets.',
    material: 'Superfine Wool Blend / Heavy Cotton Twill',
    closure: 'Classic Brass Buckle with Fabric Tuck-in',
    imageUrl: '/images/Tactical 04.jpeg',
    features: ['Metal Badge Reinforcement', 'Heavy Drill Buckram', 'Cadet Regimental Colorway']
  },
  {
    id: 'tac-cadet-02',
    name: 'Military Academy House Cap',
    category: 'Cadet College',
    categorySlug: 'cadet',
    targetSector: 'Squadron & College Houses',
    description: 'Customized regimental house cap for cadets featuring precision high-density embroidered college insignia, piped peak lines, and sweat-resistant interior lining.',
    material: '100% Export-Grade Cotton Chino Twill',
    closure: 'Velcro Strap with Custom Cadet Serial Tag',
    imageUrl: '/images/Tactical 05.jpeg',
    features: ['Custom House Colors', '3D Metallic Thread Crest', 'Inside Cadre Name Label']
  },

  // ===================== RESIDENTIAL & HOME SECURITY GUARDS =====================
  {
    id: 'tac-sec-home-01',
    name: 'Residential Home Security Guard Cap',
    category: 'Home Security',
    categorySlug: 'home-security',
    targetSector: 'Housing Societies, Bungalows & Gated Estates',
    description: 'Smart uniform guard cap designed for residential watchmen and gated housing societies. Features crisp embroidered security logo, sweatband, and sun-protective visor.',
    material: 'Durable Poly-Cotton Drill Fabric',
    closure: 'Adjustable Velcro Back Strap',
    imageUrl: '/images/Tactical 066.png',
    features: ['Residential Security Crest', 'All-Day Outdoor Breathability', 'Fade-Proof Sunlight Fabric']
  },

  // ===================== PRIVATE SECURITY & GUARD SERVICES =====================
  {
    id: 'tac-sec-01',
    name: 'Private Security Patrol Guard Cap',
    category: 'Private Security',
    categorySlug: 'security',
    targetSector: 'Commercial & Facility Guard Services',
    description: 'Durable uniform cap featuring front gold or silver bullion badge embroidery, silver reflective visor sandwich piping for night visibility, and fade-resistant fabric.',
    material: 'Heavy-Duty Twill (Dacron/Cotton Blend)',
    closure: 'Adjustable Hook & Loop Closure',
    imageUrl: '/images/Tactical 06.png',
    features: ['Reflective Night Piping', 'Fade-Resistant Sun Dye', 'High-Density Security Crest']
  },
  {
    id: 'tac-sec-02',
    name: 'VIP Close Protection Officer Cap',
    category: 'Private Security',
    categorySlug: 'security',
    targetSector: 'Executive Protection & Escort Teams',
    description: 'Sleek all-black low-profile tactical cap with subdued tonal 3D logo embroidery, internal comfort sweatband, and anti-glare peak for bodyguards.',
    material: 'Water-Repellent Poly-Cotton Twill',
    closure: 'Metal Embossed Clamp Strap',
    imageUrl: '/images/Tactical 01.jpeg',
    features: ['Low-Profile Stealth Black', 'Water-Repellent Finish', 'Anti-Glare Under-Peak']
  },
  {
    id: 'tac-sec-03',
    name: 'Airport & Cargo Security Patrol Cap',
    category: 'Private Security',
    categorySlug: 'security',
    targetSector: 'Aviation, Ports & Logistics Security',
    description: 'High-visibility safety accents combined with tactical black/navy structure, built to withstand extreme sun, moisture, and continuous shifts.',
    material: 'Ballistic Breathable Mesh + Heavy Twill',
    closure: 'Reinforced Snapback Closure',
    imageUrl: '/images/Tactical 08.jpg',
    features: ['Hi-Vis Safety Trim', 'Breathable Rear Mesh', 'Reinforced Front Panels']
  }
];

interface TacticalHeadwearPageProps {
  onOpenQuoteModal: (productName?: string) => void;
}

export const TacticalHeadwearPage: React.FC<TacticalHeadwearPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<TacticalItem | null>(null);

  // =========================================================
  // AUTOMATIC SEO META, CANONICAL & JSON-LD SCHEMA INJECTION
  // =========================================================
  useEffect(() => {
    // 1. Dynamic Page Title
    const originalTitle = document.title;
    document.title = 'Tactical, Military & Security Guard Caps Manufacturer | Aura Global Industries';

    // 2. Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Bulk manufacturer & exporter of tactical caps, military boonie hats, cadet college drill caps, and private security guard headwear in Karachi, Pakistan.'
      );
    }

    // 3. Canonical URL Tag
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    let createdCanonical = false;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
      createdCanonical = true;
    }
    canonical.setAttribute('href', window.location.href);

    // 4. Structured JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'tactical-schema-jsonld';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: 'Tactical, Military & Uniform Headwear Catalog',
      itemListElement: TACTICAL_CATALOG.map((item, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Product',
          name: item.name,
          category: item.category,
          description: item.description,
          image: `https://auraglobalindustries.com${item.imageUrl}`,
          material: item.material
        }
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      const existingScript = document.getElementById('tactical-schema-jsonld');
      if (existingScript) existingScript.remove();
      if (createdCanonical && canonical) {
        canonical.remove();
      }
    };
  }, []);

  const filterTabs = [
    { label: 'All Tactical & Uniform', value: 'all' },
    { label: 'Military & Army', value: 'military' },
    { label: 'Cadet Colleges', value: 'cadet' },
    { label: 'Home Security', value: 'home-security' },
    { label: 'Private Security', value: 'security' }
  ];

  const filteredItems = TACTICAL_CATALOG.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.categorySlug === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetSector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="tactical-page-root" className="pt-28 sm:pt-36 pb-20 space-y-12">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
          <Crosshair className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>TACTICAL, SECURITY & CADET UNIFORM HEADWEAR</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight">
          Tactical, Security & <span className="text-[#D4AF37]">Cadet Headwear</span>
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Contract manufacturing for military units, private security companies, residential watchmen fleets, cadet colleges, and enforcement agencies across Pakistan and global export markets. Manufactured with reinforced ripstop, regimental metallic crests, and night-patrol reflective trims.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-white/10 text-[10px] uppercase tracking-wider text-zinc-300 rounded-sm">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" /> Military Ripstop & Camo
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-white/10 text-[10px] uppercase tracking-wider text-zinc-300 rounded-sm">
            <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" /> Cadet Drill & House Caps
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-white/10 text-[10px] uppercase tracking-wider text-zinc-300 rounded-sm">
            <Home className="w-3.5 h-3.5 text-[#D4AF37]" /> Home Security Guards
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-white/10 text-[10px] uppercase tracking-wider text-zinc-300 rounded-sm">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Corporate Security Regalia
          </span>
        </div>
      </section>

      {/* 2. FILTER & SEARCH SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-3 sm:p-4 rounded-sm bg-[#0F0F0F] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.value
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by cadet, home security, or camo..."
              aria-label="Search tactical headwear models"
              className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#0A0A0A] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 px-2 font-mono">
          <span>SHOWING <strong className="text-white">{filteredItems.length}</strong> MIL-SPEC & UNIFORM DESIGNS</span>
          <span className="text-[#D4AF37]">CUSTOM CONTRACT MANUFACTURING (MOQ: 300 PCS)</span>
        </div>

        {/* 3. PRODUCT CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="rounded-sm bg-[#0F0F0F] border border-white/10 hover:border-[#D4AF37]/50 transition-all group flex flex-col justify-between overflow-hidden shadow-xl"
              itemScope
              itemType="https://schema.org/Product"
            >
              <div>
                {/* Optimized Picture Container */}
                <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={`${item.name} - ${item.category}`}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    itemProp="image"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90 pointer-events-none" />

                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] bg-black/90 backdrop-blur-md px-2.5 py-0.5 rounded-sm border border-white/10 w-fit">
                      {item.category}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-zinc-300 bg-zinc-900/90 backdrop-blur-md px-2 py-0.5 rounded-sm border border-white/5 w-fit">
                      {item.targetSector}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="absolute bottom-3 right-3 p-2 rounded-sm bg-black/85 text-white hover:text-[#D4AF37] border border-white/10 backdrop-blur-md text-[11px] flex items-center gap-1.5 cursor-pointer uppercase font-semibold z-10"
                    title={`View technical specifications for ${item.name}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Specs</span>
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h2 itemProp="name" className="font-heading text-base font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
                      {item.name}
                    </h2>
                    <p itemProp="description" className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs bg-[#141414] p-3 rounded-sm border border-white/5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 text-[11px]">TEXTILE:</span>
                      <span className="text-zinc-300 font-sans text-xs truncate max-w-[65%]">
                        {item.material}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 text-[11px]">STRAP:</span>
                      <span className="text-zinc-300 font-sans text-xs truncate">
                        {item.closure}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.features.map((feat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-sm bg-white/5 text-zinc-300 border border-white/10"
                        >
                          <Check className="w-2.5 h-2.5 text-[#D4AF37]" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenQuoteModal(`Uniform/Tactical: ${item.name}`)}
                  className="w-full bg-[#D4AF37] hover:bg-[#b89528] text-black font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  <span>Request Bulk Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. SECTOR CAPABILITIES TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="p-8 rounded-sm bg-[#0F0F0F] border border-white/10 space-y-6">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
              Institutional & Guard Uniform Manufacturing Standards
            </h2>
            <p className="text-xs text-zinc-400">
              Tailored specifically to meet the rigid uniform dress regulations of residential societies, academies, and enforcement forces:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
            <div className="p-5 rounded-sm bg-[#141414] border border-white/5 space-y-2.5">
              <span className="text-[#D4AF37] font-bold uppercase tracking-wider block font-mono flex items-center gap-2">
                <Shield className="w-4 h-4" /> Armed Forces & Combat
              </span>
              <p className="text-zinc-300 leading-relaxed">
                Anti-glare visor linings, zero top-button construction for ear-pro safety, and authentic IR-compliant loop panels for military night operations.
              </p>
            </div>

            <div className="p-5 rounded-sm bg-[#141414] border border-white/5 space-y-2.5">
              <span className="text-[#D4AF37] font-bold uppercase tracking-wider block font-mono flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Cadet Colleges & Drill
              </span>
              <p className="text-zinc-300 leading-relaxed">
                Brass eyelets, metallic badge backing plates, exact house regimental colors (Red, Green, Blue, Maroon), and laser-engraved brass buckles.
              </p>
            </div>

            <div className="p-5 rounded-sm bg-[#141414] border border-white/5 space-y-2.5">
              <span className="text-[#D4AF37] font-bold uppercase tracking-wider block font-mono flex items-center gap-2">
                <Home className="w-4 h-4" /> Home & Society Guards
              </span>
              <p className="text-zinc-300 leading-relaxed">
                Clean professional look for residential watchmen, bungalow gatekeepers, and housing society patrols with sweat-resistant lining and sun-shield visors.
              </p>
            </div>

            <div className="p-5 rounded-sm bg-[#141414] border border-white/5 space-y-2.5">
              <span className="text-[#D4AF37] font-bold uppercase tracking-wider block font-mono flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Corporate & VIP Security
              </span>
              <p className="text-zinc-300 leading-relaxed">
                High-density embroidered bullion crests, silver/gold reflective night patrol sandwich piping, and sun-fade resistant poly-cotton fabrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALLOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-sm bg-gradient-to-r from-[#141414] via-[#0F0F0F] to-[#141414] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl text-center sm:text-left">
            <h2 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
              Tender Orders, Society Batches & Security Guard Uniforms
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We manufacture customized batch orders for housing societies, security guard fleets, cadet college annual enrollments, and international export buyers.
            </p>
          </div>

          <button
            onClick={() => onOpenQuoteModal('Society / Security Batch Tender')}
            className="bg-[#D4AF37] hover:bg-[#b89528] text-black font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-sm flex items-center gap-2 cursor-pointer shadow-xl whitespace-nowrap transition-all"
          >
            <span>Inquire for Uniform Batch</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* QUICK SPECS MODAL */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-white/20 p-6 rounded-sm max-w-md w-full space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-[#D4AF37] font-mono uppercase block">{activeModalItem.category}</span>
                <h3 className="font-heading text-base font-bold text-white uppercase">
                  {activeModalItem.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-zinc-400 hover:text-white text-xs cursor-pointer uppercase font-mono"
              >
                [CLOSE]
              </button>
            </div>
            <p className="text-xs text-zinc-300">{activeModalItem.description}</p>
            <div className="text-xs space-y-1 bg-black/60 p-3 rounded-sm border border-white/5 font-mono">
              <p><strong className="text-[#D4AF37]">SECTOR:</strong> {activeModalItem.targetSector}</p>
              <p><strong className="text-[#D4AF37]">FABRIC:</strong> {activeModalItem.material}</p>
              <p><strong className="text-[#D4AF37]">CLOSURE:</strong> {activeModalItem.closure}</p>
            </div>
            <button
              onClick={() => {
                const name = activeModalItem.name;
                setActiveModalItem(null);
                onOpenQuoteModal(`Uniform: ${name}`);
              }}
              className="w-full bg-[#D4AF37] text-black font-bold text-xs uppercase py-2.5 rounded-sm hover:bg-[#b89528] cursor-pointer transition-colors"
            >
              Request Institutional Sample
            </button>
          </div>
        </div>
      )}
    </div>
  );
};