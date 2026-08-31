import {
  ProductItem,
  ProductCategory,
  FabricMaterial,
  ManufacturingStep,
  PartnerProfile,
  FAQItem
} from '../types';

export const COMPANY_INFO = {
  name: 'Aura Global Industries',
  tagline: 'Together For A Stronger Future',
  subTagline: 'Premium Caps. Professional Manufacturing. Global Quality.',
  businessType: 'Cap Manufacturer & Exporter',
  industry: 'Headwear / Caps Manufacturing',
  location: 'Nazimabad, Karachi, Pakistan',
  email: 'auraglobalindustries@gmail.com',
  socialLinks: {
    tiktok: 'https://www.tiktok.com/@auraglobalindustries',
    instagram: 'https://www.instagram.com/reel/DcEx96bqdZd/?igsh=anF6ZWZlbW5laDVs',
    facebook: 'https://www.facebook.com/asifrizvi'
  },
  partners: [
    {
      name: 'Syed Hashim Hussain Rizvi',
      role: 'Partner',
      bio: 'Directing strategic business operations, global client relationships, and export supply chain management at Aura Global Industries.',
      imageAlt: 'Syed Hashim Hussain Rizvi - Partner at Aura Global Industries',
      imageUrl: '/images/hashim.jpg'
    },
    {
      name: 'Syed Masoom Raza',
      role: 'Partner',
      bio: 'Overseeing modern manufacturing operations, technical pattern engineering, quality assurance protocols, and factory production standards.',
      imageAlt: 'Syed Masoom Raza - Partner at Aura Global Industries',
      imageUrl: '/images/masoom.jpeg'
    }
  ] as PartnerProfile[]
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-1',
    name: 'Baseball Caps',
    slug: 'baseball',
    description: 'Classic curved-visor 6-panel structured caps built for sportswear, lifestyle brands, and promotional apparel.',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    itemCount: 'High Volume Capacity'
  },
  {
    id: 'cat-2',
    name: 'Snapback Caps',
    slug: 'snapback',
    description: 'Structured flat-brim caps featuring adjustable snap closures, reinforced crown fusing, and premium street appeal.',
    imageUrl: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80',
    itemCount: 'Customizable Closures'
  },
  {
    id: 'cat-3',
    name: 'Trucker Caps',
    slug: 'trucker',
    description: 'Breathable high-density nylon mesh back panels paired with structured foam or twill front panels.',
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80',
    itemCount: 'Breathable Mesh Options'
  },
  {
    id: 'cat-4',
    name: '5-Panel Caps',
    slug: '5-panel',
    description: 'Streamlined low-profile camper crowns with side ventilation eyelets and flat peak construction.',
    imageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=800&q=80',
    itemCount: 'Modern Streetwear Fit'
  },
  {
    id: 'cat-5',
    name: '6-Panel Caps',
    slug: '6-panel',
    description: 'Timeless crown silhouette with balanced panel distribution and reinforced buckram inner lining.',
    imageUrl: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80',
    itemCount: 'Core Industry Standard'
  },
  {
    id: 'cat-6',
    name: 'Dad Caps',
    slug: 'dad-cap',
    description: 'Unstructured relaxed crowns crafted from soft enzyme-washed cotton twill with pre-curved visors.',
    imageUrl: '/images/Embroidered Washed Dad Cap.jpg',
    itemCount: 'Vintage Washed Finishes'
  },
  {
    id: 'cat-7',
    name: 'Flat Brim Caps',
    slug: 'flat-brim',
    description: 'Sharp urban aesthetics with multi-stitch flat visors, contrast under-brim fabrics, and rigid front panels.',
    imageUrl: '/images/Flat Brim Snapback Pro.jpg',
    itemCount: 'Precision Edge Stitching'
  },
  {
    id: 'cat-8',
    name: 'Sports Caps',
    slug: 'sports',
    description: 'Lightweight moisture-wicking synthetic textiles with quick-dry sweatbands and reflective accents.',
    imageUrl: '/images/Sports Performance Quick Dry Cap.jpg',
    itemCount: 'Technical Fabrics'
  },
  {
    id: 'cat-9',
    name: 'Mesh Caps',
    slug: 'mesh',
    description: 'All-around athletic mesh and hybrid ventilated caps engineered for hot climates and high activity.',
    imageUrl: '/images/mesh Headwear Fabric.png',
    itemCount: 'Max Airflow Design'
  },
  {
    id: 'cat-10',
    name: 'Custom Caps',
    slug: 'custom',
    description: 'Full custom OEM/ODM development tailored to client tech packs, pantone dyes, and bespoke trims.',
    imageUrl: '/images/Custom Logo Corduroy Cap.jpg',
    itemCount: 'Bespoke Private Label'
  },
  {
    id: 'cat-11',
    name: 'Embroidered Caps',
    slug: 'embroidered',
    description: 'High-definition 3D puff embroidery, metallic thread accents, and high-density flat needlework.',
    imageUrl: '/images/Multi Position Embroidered Cap.jpg',
    itemCount: '3D Puff & Flat Thread'
  },
  {
    id: 'cat-12',
    name: 'Printed Caps',
    slug: 'printed',
    description: 'Silkscreen, rubberized high-build silicone, digital heat transfer, and all-over sublimation prints.',
    imageUrl: '/images/All Over Sublimation & Silicone Printed Cap.jpg',
    itemCount: 'Silicone & Screen Print'
  }
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Premium Cotton Baseball Cap',
    category: 'Baseball Caps',
    categorySlug: 'baseball',
    description: 'Structured 6-panel premium heavy-brushed cotton twill cap with pre-curved visor and adjustable brass buckle slider.',
    material: '100% Heavy Brushed Cotton Twill (280 GSM)',
    closure: 'Metal Buckle with Tuck-in Grommet',
    panels: '6-Panel Structured with Hard Buckram',
    customization: ['3D Puff Front Embroidery', 'Woven Back Label', 'Custom Seam Taping', 'Metal Eyelets'],
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    altText: 'Premium Cotton Baseball Cap by Aura Global Industries',
    featured: true
  },
  {
    id: 'prod-2',
    name: 'Classic 6-Panel Structured Cap',
    category: '6-Panel Caps',
    categorySlug: '6-panel',
    description: 'Firm front panel construction offering perfect logo presentation, stitched sweatband, and 6 embroidered eyelets.',
    material: 'Premium Poly-Cotton Blend (65/35)',
    closure: 'Hook & Loop (Velcro) or Snapback',
    panels: '6-Panel Pro-Stitched Crown',
    customization: ['Flat Embroidery', 'Printed Under-Visor', 'Embossed Sweatband', 'Custom Hangtag'],
    imageUrl: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80',
    altText: 'Classic 6-Panel Structured Cap - Aura Global Industries',
    featured: true
  },
  {
    id: 'prod-3',
    name: 'Premium Streetwear Snapback',
    category: 'Snapback Caps',
    categorySlug: 'snapback',
    description: 'Urban flat-brim snapback featuring a deep structured crown, 8 rows of visor stitching, and green contrast under-bill.',
    material: '100% Premium Acrylic Wool Feel (380 GSM)',
    closure: '7-Hole Plastic Snapback',
    panels: '6-Panel High Profile Structured',
    customization: ['3D High-Density Embroidery', 'Side Patch Stitching', 'Visor Foil Sticker', 'Custom Inner Tape'],
    imageUrl: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80',
    altText: 'Premium Streetwear Snapback Cap with flat brim',
    featured: true
  },
  {
    id: 'prod-4',
    name: 'Custom Breathable Trucker Cap',
    category: 'Trucker Caps',
    categorySlug: 'trucker',
    description: 'Retro style 5-panel foam front trucker cap with premium soft nylon mesh rear and matching plastic snap closure.',
    material: 'High-Density Foam Front & Durable Nylon Mesh Back',
    closure: 'Adjustable Poly Snapback',
    panels: '5-Panel Seamless Foam Crown',
    customization: ['High-Build Screen Print', 'Sublimated Front Panel', 'Woven Flag Label', 'Custom Mesh Color'],
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80',
    altText: 'Custom Breathable Trucker Cap - Aura Global Industries',
    featured: true
  },
  {
    id: 'prod-5',
    name: 'Embroidered Washed Dad Cap',
    category: 'Dad Caps',
    categorySlug: 'dad-cap',
    description: 'Unstructured relaxed low-profile dad cap crafted from soft enzyme-washed cotton twill for a modern casual aesthetic.',
    material: '100% Enzyme-Washed Chino Cotton Twill',
    closure: 'Self-Fabric Strap with Antique Brass Buckle',
    panels: '6-Panel Unstructured Soft Crown',
    customization: ['Micro-Embroidery', 'Distressed Bill Finish', 'Debossed Leather Patch', 'Custom Care Label'],
    imageUrl: '/images/Embroidered Washed Dad Cap.jpg',
    altText: 'Embroidered Washed Dad Cap in vintage chino cotton',
    featured: true
  },
  {
    id: 'prod-6',
    name: 'Sports Performance Quick-Dry Cap',
    category: 'Sports Caps',
    categorySlug: 'sports',
    description: 'Ultra-lightweight athletic cap with laser-perforated side ventilation panels and an antimicrobial moisture-wicking sweatband.',
    material: '100% Micro-Poly Performance Hydrophobic Fabric',
    closure: 'Elasticated Webbing with Quick-Release Clip',
    panels: '6-Panel Lightweight Ergonomic Crown',
    customization: ['Reflective 3M Prints', 'Silicone Gel Logo', 'Laser Perforation Patterns', 'Rubberized Pull Tab'],
    imageUrl: '/images/Sports Performance Quick Dry Cap.jpg',
    altText: 'Sports Performance Cap with laser cut ventilation',
    featured: true
  },
  {
    id: 'prod-7',
    name: 'Premium 5-Panel Camper Cap',
    category: '5-Panel Caps',
    categorySlug: '5-panel',
    description: 'Streetwear staple with low profile square front panel, metal ventilation eyelets on side quarters, and nylon webbing strap.',
    material: 'Heavy Canvas / Ripstop Cotton',
    closure: 'Nylon Webbing with Plastic Clip',
    panels: '5-Panel Low Profile Square Camper',
    customization: ['Woven Merrowed Patch', 'Screen Printed Front Panel', 'Custom Webbing Colors', 'Metal Screen Eyelets'],
    imageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=800&q=80',
    altText: 'Premium 5-Panel Camper Cap - Aura Global Industries'
  },
  {
    id: 'prod-8',
    name: 'Custom Logo Corduroy Cap',
    category: 'Custom Caps',
    categorySlug: 'custom',
    description: 'Luxury texture 8-wale ribbed corduroy cap with unstructured crown and contrast rope accent across the visor brim.',
    material: '100% Pure Cotton Ribbed Corduroy',
    closure: 'Matching Corduroy Strap with Brass Slider',
    panels: '6-Panel Unstructured Vintage Fit',
    customization: ['Braided Visor Rope', 'Direct Chainstitch Embroidery', 'Custom Satin Lining', 'Gold Embossed Label'],
    imageUrl: '/images/Custom Logo Corduroy Cap.jpg',
    altText: 'Custom Corduroy Cap with front visor rope'
  },
  {
    id: 'prod-9',
    name: 'Flat Brim Snapback Pro',
    category: 'Flat Brim Caps',
    categorySlug: 'flat-brim',
    description: 'Rigid front buckram with 8-stitch flat visor, contrast crown eyelets, and customized top button.',
    material: 'Poly-Wool Blend High Density Weave',
    closure: 'Dual-Color Snapback Closure',
    panels: '6-Panel High Profile Crown',
    customization: ['3D Metallic Puff Thread', 'Embroidered Eyelets', 'Printed Peak Underside', 'Internal Woven Label'],
    imageUrl: '/images/Flat Brim Snapback Pro.jpg',
    altText: 'Flat Brim Snapback Pro Cap'
  },
  {
    id: 'prod-10',
    name: 'Athletic Full Mesh Running Cap',
    category: 'Mesh Caps',
    categorySlug: 'mesh',
    description: 'Maximum ventilation cap constructed with hex-mesh panels and flexible EVA soft foam visor.',
    material: 'Technical Polyester Hex Mesh & Quick-Dry Spandex',
    closure: 'Micro-Velcro Strap with Rubber Pull',
    panels: '5-Panel Lightweight Sport Crown',
    customization: ['Reflective Heat Seal Transfers', 'Custom Contrast Piping', 'Woven Brand Tab'],
    imageUrl: '/images/Athletic Full Mesh Running Cap.jpg',
    altText: 'Athletic Full Mesh Running Cap'
  },
  {
    id: 'prod-11',
    name: 'Multi-Position Embroidered Cap',
    category: 'Embroidered Caps',
    categorySlug: 'embroidered',
    description: 'Bespoke cap with front 3D puff embroidery, left temple branding, right side heritage patch, and rear arch script.',
    material: '100% Chino Twill Cotton (300 GSM)',
    closure: 'Metal Buckle with Embossed Logo',
    panels: '6-Panel Medium Profile Crown',
    customization: ['4-Location Embroidery', 'Chenille Appliqué', 'Custom Inner Binding', 'Branded Metal Hardware'],
    imageUrl: '/images/Multi Position Embroidered Cap.jpg',
    altText: 'Multi-Position Embroidered Cap by Aura Global Industries'
  },
  {
    id: 'prod-12',
    name: 'All-Over Sublimation & Silicone Printed Cap',
    category: 'Printed Caps',
    categorySlug: 'printed',
    description: 'Vibrant edge-to-edge sublimation print combined with 3D raised tactile silicone logo on the front panels.',
    material: '100% Polyester Canvas & Microfiber',
    closure: 'Printed Elastic Band or Plastic Snap',
    panels: '5-Panel Seamless Graphic Crown',
    customization: ['Photographic All-Over Print', '3D Silicone Gel Badge', 'Custom Printed Sweatband', 'Hangtag Packaging'],
    imageUrl: '/images/All Over Sublimation & Silicone Printed Cap.jpg',
    altText: 'All-Over Sublimation and Silicone Printed Cap'
  }
];

export const FABRIC_MATERIALS: FabricMaterial[] = [
  {
    id: 'fab-1',
    name: 'Cotton',
    type: '100% Pure Natural Cotton / Brushed Cotton',
    description: 'Breathable, soft, and comfortable natural fiber ideal for daily lifestyle caps, washed dad caps, and premium fashion headwear.',
    characteristics: ['Natural breathability', 'Soft skin-friendly touch', 'Excellent dye receptivity', 'Durable everyday wear'],
    bestFor: 'Dad Caps, Classic Baseball Caps, Lifestyle Brands',
    imageUrl: '/images/Cotton Headwear Fabric.png'
  },
  {
    id: 'fab-2',
    name: 'Twill',
    type: 'Heavy Brushed & Chino Cotton Twill',
    description: 'Distinctive diagonal weave offering exceptional tensile strength, clean embroidery stability, and crisp panel structure.',
    characteristics: ['Distinct diagonal weave', 'Stiff crown structure', 'Supports heavy 3D embroidery', 'Abrasion resistant'],
    bestFor: 'Structured 6-Panel Caps, Snapbacks, Corporate Uniforms',
    imageUrl: '/images/Twill Headwear Fabric.png'
  },
  {
    id: 'fab-3',
    name: 'Polyester',
    type: 'Hydrophobic Micro-Polyester & Poly-Twill',
    description: 'Engineered synthetic textile designed for moisture management, high color fastness, wrinkle resistance, and quick drying.',
    characteristics: ['Moisture-wicking', 'UV-resistant & colorfast', 'Quick drying', 'Lightweight & durable'],
    bestFor: 'Sports Performance, Outdoor Caps, Printed Caps',
    imageUrl: '/images/Polyester Headwear Fabric.png'
  },
  {
    id: 'fab-4',
    name: 'Denim',
    type: 'Raw & Washed Indigo Denim (10oz - 14oz)',
    description: 'Authentic cotton denim with distinct texture, enzyme wash options, stone washes, and raw selvedge aesthetics.',
    characteristics: ['Rugged street appeal', 'Custom wash effects', 'Heavy structural weight', 'Timeless durability'],
    bestFor: 'Streetwear Caps, Vintage Collections, Custom Brands',
    imageUrl: '/images/Denim Headwear Fabric.png'
  },
  {
    id: 'fab-5',
    name: 'Canvas',
    type: 'Heavy Duty Duck Canvas',
    description: 'Tightly woven plain weave fabric providing heavy-duty structural integrity and excellent tear resistance.',
    characteristics: ['Heavy duty weight', 'Clean flat surface', 'High tear resistance', 'Workwear durability'],
    bestFor: '5-Panel Camper Caps, Workwear Headwear, Outdoor Gear',
    imageUrl: '/images/Canvas Headwear Fabric.png'
  },
  {
    id: 'fab-6',
    name: 'Mesh',
    type: 'Polyester Trucker Mesh & Athletic Hex Mesh',
    description: 'High-airflow open knit mesh engineered to maximize air circulation while maintaining crown shape.',
    characteristics: ['Maximum airflow ventilation', 'Ultra lightweight', 'Flexible and resilient', 'Classic trucker aesthetic'],
    bestFor: 'Trucker Caps, Running Caps, Summer Headwear',
    imageUrl: '/images/mesh Headwear Fabric.png'
  },
  {
    id: 'fab-7',
    name: 'Corduroy',
    type: 'Ribbed Cotton Corduroy (6-wale to 14-wale)',
    description: 'Textured ribbed velvet pile fabric imparting a luxury vintage tactile feel and rich depth of color.',
    characteristics: ['Tactile ribbed texture', 'Warm luxury finish', 'Unique vintage appearance', 'Premium drape'],
    bestFor: 'Vintage Caps, Winter Collections, Boutique Apparel',
    imageUrl: '/images/Corduroy Headwear Fabric.png'
  },
  {
    id: 'fab-8',
    name: 'Custom Fabric Options',
    type: 'Wool Blends, Ripstop, Leather & Satin',
    description: 'Specialty fabrics sourced and tailored according to client tech pack requirements, Pantone dyes, and custom textures.',
    characteristics: ['Custom Pantone matched', 'Bespoke weave patterns', 'Water-repellent coatings', 'Sustainable organic options'],
    bestFor: 'Private Label Fashion Brands, Specialty Contract Orders',
    imageUrl: '/images/Custom Fabric Options Headwear Fabric.png'
  }
];

export const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    stepNumber: 1,
    title: 'Fabric & Material Selection',
    shortDesc: 'Inspection and verification of raw textiles, twills, mesh, canvas, and buckram fusing.',
    detailedDesc: 'Every production batch begins with strict material inspection. We verify yarn count, GSM weight, tensile strength, and color consistency to ensure the fabric meets the exact client specification.',
    iconName: 'Layers',
    highlights: ['GSM Weight Verification', 'Colorfastness Lab Checks', 'Buckram Stiffness Grading'],
    imageUrl: '/images/01 Fabric & Material Selection.png'
  },
  {
    stepNumber: 2,
    title: 'Pattern & Design Development',
    shortDesc: 'Precision CAD pattern grading, panel dimensional mapping, and custom prototype sampling.',
    detailedDesc: 'Our technical pattern engineers translate client tech packs into precise panel templates. Crown height, visor curve radius, sweatband depth, and seam allowances are calibrated down to the millimeter.',
    iconName: 'Compass',
    highlights: ['CAD Pattern Engineering', 'Crown Profile Calibration', 'Pre-Production Prototyping'],
    imageUrl: '/images/02 Pattern & Design Development.png'
  },
  {
    stepNumber: 3,
    title: 'Cutting',
    shortDesc: 'High-precision multi-ply hydraulic die cutting and laser contour cutting for uniform panel shapes.',
    detailedDesc: 'Fabrics are layered and cut with heavy-duty precision dies. Accurate cutting guarantees identical panel sizing and zero distortion across thousands of production units.',
    iconName: 'Scissors',
    highlights: ['Multi-Ply Die Press Cutting', 'Zero-Distortion Tolerances', 'Precision Visor Core Cutting'],
    imageUrl: '/images/03 Cutting.png'
  },
  {
    stepNumber: 4,
    title: 'Stitching',
    shortDesc: 'Specialized industrial sewing machines for panel joining, seam binding, and visor edge stitching.',
    detailedDesc: 'Expert craftsmen assemble individual panels using specialized chainstitch and lockstitch machines. Seams are joined with high-tenacity polyester threads for superior durability.',
    iconName: 'Wrench',
    highlights: ['High-Tenacity Threading', 'Consistent Stitch Density (8-10 SPI)', 'Reinforced Stress Points'],
    imageUrl: '/images/04 Stitching.png'
  },
  {
    stepNumber: 5,
    title: 'Embroidery / Printing',
    shortDesc: 'Multi-head computerized embroidery machines, 3D foam puff application, and high-density printing.',
    detailedDesc: 'Front panels and components are customized using high-speed multi-head computerized embroidery systems with Madeira/Gunold threads, rubberized silicone prints, or high-definition heat transfers.',
    iconName: 'Sparkles',
    highlights: ['3D Puff Embroidery (3mm-5mm)', 'Multi-Color Flat Needlework', 'Silicone & Sublimation Printing'],
    imageUrl: '/images/05 Embroidery  Printing.png'
  },
  {
    stepNumber: 6,
    title: 'Assembly',
    shortDesc: 'Integration of structured front buckram, moisture-absorbing sweatbands, visors, and closures.',
    detailedDesc: 'All components converge: pre-curved or flat visors are inserted, moisture-wicking sweatbands are stitched, branded woven seam tapes are applied, and snap/buckle closures are securely anchored.',
    iconName: 'Cpu',
    highlights: ['Branded Seam Taping', 'Cushioned Sweatband Insertion', 'Hardware & Closure Attachment'],
    imageUrl: '/images/06 Assembly.png'
  },
  {
    stepNumber: 7,
    title: 'Quality Inspection',
    shortDesc: 'Comprehensive multi-point QA audit inspecting stitch tension, panel symmetry, and embroidery clarity.',
    detailedDesc: 'Each unit undergoes stringent quality control. QA inspectors evaluate stitch integrity, eyelet placement, crown symmetry, embroidery alignment, and size uniformity against approved master samples.',
    iconName: 'ShieldCheck',
    highlights: ['100% In-Line QA Checks', 'Symmetry & Sizing Audits', 'Zero Loose Threads Guarantee'],
    imageUrl: '/images/07 Quality Inspection.png'
  },
  {
    stepNumber: 8,
    title: 'Final Finishing',
    shortDesc: 'Pneumatic steam blocking, industrial cap mold shaping, thread trimming, and crown contouring.',
    detailedDesc: 'Caps are placed onto specialized heated pneumatic blocking molds to lock in their pristine shape. High-pressure steam eliminates wrinkles and activates internal fuses for a sharp showroom silhouette.',
    iconName: 'Flame',
    highlights: ['Heated Mold Steam Blocking', 'Crown Shape Setting', 'Ultrasonic Thread Trimming'],
    imageUrl: '/images/08 Final Finishing.png'
  },
  {
    stepNumber: 9,
    title: 'Packaging',
    shortDesc: 'Custom hangtags, barcode stickers, cardboard crown inserts, moisture-resistant individual polybags.',
    detailedDesc: 'Finished caps are fitted with cardboard crown protectors to preserve shape during transit, poly-bagged individually or in sets, barcoded, and packed into heavy 5-ply export master cartons.',
    iconName: 'PackageCheck',
    highlights: ['Crown Shape Cardboard Inserts', 'Custom Branded Polybags & Tags', '5-Ply Export Master Cartons'],
    imageUrl: '/images/09 Packaging.png'
  },
  {
    stepNumber: 10,
    title: 'Dispatch',
    shortDesc: 'Container loading, sea freight / air freight logistics, and global customs documentation handling.',
    detailedDesc: 'Orders are dispatched from our Karachi manufacturing facility directly to Karachi Port (Qasim/KPT) or Jinnah International Airport for seamless international delivery worldwide.',
    iconName: 'Globe',
    highlights: ['Direct Karachi Sea & Air Logistics', 'Complete Export Documentation', 'Worldwide Freight Forwarding'],
    imageUrl: '/images/10 Dispatch.png'
  }
];

export const QUALITY_PILLARS = [
  {
    title: 'Premium Fabrics',
    desc: 'Heavy combed cotton, durable twills, poly blends, ripstop, and breathable meshes selected for superior texture and longevity.'
  },
  {
    title: 'Strong Stitching',
    desc: 'Reinforced dual-needle lockstitching and 8-10 stitches per inch ensuring robust seam tension that withstands prolonged wear.'
  },
  {
    title: 'Comfortable Fitting',
    desc: 'Ergonomically curved visors, soft absorbent sweatbands, and adjustable closures engineered for all-day comfort.'
  },
  {
    title: 'Durable Construction',
    desc: 'Resilient buckram crown support that retains its shape through rigorous cleaning, shipping, and active outdoor use.'
  },
  {
    title: 'High-Quality Embroidery',
    desc: 'Computerized multi-head embroidery delivering sharp 3D puff relief, high thread density, and ultra-fine flat lettering.'
  },
  {
    title: 'Clean Printing',
    desc: 'High-definition screen printing, rubberized 3D silicone gel, and vibrant sublimation that resist cracking and peeling.'
  },
  {
    title: 'Professional Finishing',
    desc: 'Pneumatic steam blocking, ultrasonic thread cleanup, and crown form stabilization for pristine showroom presentation.'
  },
  {
    title: 'Consistent Sizing',
    desc: 'Standardized circumference dimensions (58cm standard adult, adjustable 54-62cm) with strict dimensional tolerances.'
  },
  {
    title: 'Quality Control Throughout',
    desc: 'Continuous inline audits at every stage from initial fabric inspection to final carton packing.'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Quality Manufacturing',
    desc: 'Professional production with attention to finishing, stitch tension, and dimensional consistency across high volumes.',
    iconName: 'Award'
  },
  {
    title: 'Custom Designs',
    desc: 'Caps can be developed according to customer designs, tech packs, brand guidelines, and unique styling specifications.',
    iconName: 'Palette'
  },
  {
    title: 'Premium Materials',
    desc: 'Multiple fabric and material options are available including cotton, twill, mesh, canvas, corduroy, and technical poly.',
    iconName: 'Layers'
  },
  {
    title: 'Professional Finishing',
    desc: 'Focus on precision stitching, 3D/flat embroidery, screen & silicone printing, steam shaping, and custom trims.',
    iconName: 'Sparkles'
  },
  {
    title: 'Bulk Manufacturing',
    desc: 'Optimized industrial capacity suitable for fashion brands, corporate businesses, wholesalers, retailers, and bulk buyers.',
    iconName: 'Factory'
  },
  {
    title: 'Export Ready',
    desc: 'Professional manufacturing and logistic approach suitable for international business standards and worldwide freight.',
    iconName: 'Globe'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-moq-1',
    category: 'moq',
    categoryLabel: 'Minimum Order Quantities (MOQs)',
    question: 'What is your Minimum Order Quantity (MOQ) for custom cap manufacturing?',
    answer: 'Our standard Minimum Order Quantity (MOQ) for fully customized private label caps is 100 to 300 pieces per design and colorway using our extensive library of stocked premium fabrics (such as heavy brushed cotton, structured twill, acrylic-wool, and breathable sports meshes). For bespoke Pantone-dyed fabrics or custom-molded metal buckle hardware, the typical MOQ starts at 500 pieces.',
    highlights: [
      'Standard MOQ: 100–300 pcs per style/colorway',
      'Prototype sampling: 1–5 physical pre-production pieces',
      'Custom Pantone-dyed fabrics: 500+ pcs'
    ]
  },
  {
    id: 'faq-moq-2',
    category: 'moq',
    categoryLabel: 'Minimum Order Quantities (MOQs)',
    question: 'Can we split our order across multiple colorways or cap sizes?',
    answer: 'Yes. For bulk orders exceeding 500 pieces, you can split the total quantity across multiple complementary colorways (for example, 250 units in Black and 250 units in Charcoal Heather) as long as the base silhouette and embroidery embroidery digitizing remain identical. Most of our caps feature adjustable strap/snapback closures with standard 58cm circumference (fitting 54–62cm), but custom juvenile or oversized head sizing can also be accommodated.',
    highlights: [
      'Multi-color splits available on orders over 500 pcs',
      'Unified embroidery/printing artwork across color variations',
      'Standard adult 58cm adjustable fitting or custom dimensional sizing'
    ]
  },
  {
    id: 'faq-lead-1',
    category: 'lead-times',
    categoryLabel: 'Lead Times & Production Cycles',
    question: 'What is the turnaround time for sample development and bulk production?',
    answer: 'Sample Development: Pre-production physical samples typically require 5 to 7 business days following digital tech pack & embroidery digitizing approval. We provide high-resolution macro photography and video walk-throughs prior to dispatching the physical prototype via DHL / FedEx Express (3–5 days transit).\n\nBulk Production: Standard bulk production cycles range between 15 to 25 business days from final sample sign-off and deposit confirmation, depending on order complexity, stitch counts, and total volume.',
    highlights: [
      'Sampling: 5–7 business days (+ express courier transit)',
      'Bulk Production: 15–25 business days',
      'Rush production scheduling available upon prior request'
    ]
  },
  {
    id: 'faq-lead-2',
    category: 'lead-times',
    categoryLabel: 'Lead Times & Production Cycles',
    question: 'Do you provide rush orders for urgent retail or event deadlines?',
    answer: 'Yes. Depending on current factory line capacity at our Nazimabad facility, we offer expedited rush manufacturing options for time-sensitive launches, corporate campaigns, and event headwear. Rush orders can be completed in as little as 10 to 14 business days, paired with prioritized air express cargo shipping.',
    highlights: [
      'Expedited 10–14 business days production for eligible orders',
      'Priority air express freight booking directly to your doorstep',
      'Dedicated project manager tracking your delivery milestone'
    ]
  },
  {
    id: 'faq-ship-1',
    category: 'shipping',
    categoryLabel: 'International Shipping & Logistics',
    question: 'How do you ship goods internationally from Karachi, Pakistan?',
    answer: 'Being centrally located in Karachi, Pakistan provides us with direct access to both international air freight hubs and major deep-water seaports (Karachi Port Trust / Port Qasim). We offer flexible global logistics solutions:\n\n• Air Express (DHL, FedEx, UPS): 3–5 business days transit for samples and small-to-mid volume orders.\n• Air Cargo Freight: 7–10 days airport-to-airport transit for medium-sized bulk consignments.\n• Ocean Freight (FCL / LCL): 20–35 days port-to-port transit for high-volume, cost-effective container shipments to North America, Europe, the Middle East, and Australia.',
    highlights: [
      'Air Express: DHL / FedEx / UPS (3–5 days door-to-door)',
      'Air Cargo: Airport-to-Airport (7–10 days)',
      'Ocean Freight: FCL & LCL from Karachi Port (20–35 days)'
    ]
  },
  {
    id: 'faq-ship-2',
    category: 'shipping',
    categoryLabel: 'International Shipping & Logistics',
    question: 'Which trade Incoterms and export documentation do you support?',
    answer: 'We operate under standard international commercial terms including FOB Karachi, CIF (Cost, Insurance & Freight), CFR, EXW (Ex Works), and DDP (Delivered Duty Paid) in select destinations. Every export shipment includes comprehensive customs compliance documentation: Commercial Invoice, Detailed Packing List, Bill of Lading / Airway Bill (AWB), Certificate of Origin (COO), and Form E export certifications.',
    highlights: [
      'Supported Incoterms: FOB Karachi, CIF, CFR, EXW, DDP',
      'Complete export documentation: COO, BL/AWB, Commercial Invoice, Packing List',
      'Smooth customs clearance support worldwide'
    ]
  },
  {
    id: 'faq-custom-1',
    category: 'customization',
    categoryLabel: 'Customization & Tech Packs',
    question: 'What artwork formats and tech packs are needed to start a custom cap design?',
    answer: 'We accept artwork in vector formats including Adobe Illustrator (.AI), PDF, .EPS, or high-resolution .PSD files. If you do not have a formal tech pack, our in-house pattern and CAD engineers can translate your sketches, reference photos, pantone color codes, and dimensional logo placements into a factory-grade digital mockup and production blueprint for your review.',
    highlights: [
      'Accepted formats: .AI, .PDF, .EPS, .PSD (vector paths preferred)',
      'Pantone Matching System (PMS) color accuracy',
      'Free CAD 2D/3D digital mockup creation assistance'
    ]
  },
  {
    id: 'faq-quality-1',
    category: 'quality',
    categoryLabel: 'Quality Control & Inspection',
    question: 'How do you ensure consistent quality across high-volume export orders?',
    answer: 'Quality is embedded into our 10-step manufacturing workflow. Every batch undergoes four inspection gates: incoming fabric GSM & colorfastness testing, embroidery/print precision audits, inline seam & crown assembly monitoring, and 100% final pre-packing inspection following AQL 2.5 international standards. We also welcome independent third-party inspection agencies (such as SGS, Intertek, or Bureau Veritas) appointed by the client before dispatch.',
    highlights: [
      'Strict adherence to AQL 2.5 international inspection criteria',
      '10-stage quality checkpoints throughout cutting, stitching & steam shaping',
      'Third-party pre-shipment inspections (SGS, Intertek) welcome'
    ]
  },
  {
    id: 'faq-payment-1',
    category: 'payment',
    categoryLabel: 'Payment Terms & Security',
    question: 'What are your standard payment terms for international buyers?',
    answer: 'For standard custom bulk manufacturing, our default terms are a 50% production deposit upon final sample approval, with the remaining 50% balance payable upon completion of production and pre-shipment inspection verification (accompanied by detailed photographic and video audit logs). We accept international Telegraphic Transfer (T/T Bank Wire) and Irrevocable Letters of Credit (L/C at sight) for large commercial container orders.',
    highlights: [
      'Standard terms: 50% deposit / 50% upon QC pre-shipment approval',
      'Payment methods: International T/T Bank Wire & Letter of Credit (L/C at sight)',
      'Complete inspection records & bill of lading verification'
    ]
  }
];

