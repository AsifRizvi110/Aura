import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'ur' | 'ar' | 'es' | 'de';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ur', label: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.manufacturing': 'Manufacturing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.getQuote': 'Get a Quote',
    'nav.factoryLocation': 'Factory: Nazimabad, Karachi, Pakistan',
    'nav.tagline': 'Cap Manufacturer & Exporter',

    // Hero
    'hero.badge': 'Karachi Factory Hub • Global Cap Manufacturer',
    'hero.titleLine1': 'PREMIUM CAPS.',
    'hero.titleLine2': 'GLOBAL QUALITY.',
    'hero.description': 'Aura Global Industries is a professional cap manufacturer based in Karachi, Pakistan, delivering premium-quality caps with modern manufacturing, custom designs, quality fabrics and reliable production for local and international businesses.',
    'hero.exploreBtn': 'Explore Collection',
    'hero.factoryBtn': 'Our Factory',
    'hero.quoteBtn': 'Get a Quote',
    'hero.metricWorkflow': 'Workflow',
    'hero.metricService': 'Service',
    'hero.metricLogistics': 'Logistics',
    'hero.metric10Step': '10-Step QA',
    'hero.metricOEM': 'OEM / ODM',
    'hero.metricDirectExport': 'Direct Export',
    'hero.factoryHub': 'Factory Hub',
    'hero.productionUnit': 'Karachi Production Unit',
    'hero.execPartners': 'Executive Partners',
    'hero.quoteBanner': '“We manufacture caps that combine quality materials, modern design and professional craftsmanship.”',

    // Modals & CTA
    'quote.title': 'Request Manufacturing Quote',
    'quote.subtitle': 'Get custom volume pricing from our Karachi factory production desk',
    'quote.fullName': 'Full Name',
    'quote.email': 'Email Address',
    'quote.phone': 'Phone / WhatsApp',
    'quote.company': 'Company / Brand Name',
    'quote.productType': 'Product Category',
    'quote.quantity': 'Estimated Quantity (MOQ: 100 pcs)',
    'quote.notes': 'Custom Specifications / Embroidery Requirements',
    'quote.submit': 'Submit Quote Request',

    // WhatsApp
    'wa.chat': 'WhatsApp Chat',
    'wa.directDesk': 'Direct Export Desk',
    'wa.avgReply': 'Avg. reply: Under 15 mins',
    'wa.verifiedFactory': 'Verified Factory',
    'wa.startChat': 'Start WhatsApp Chat'
  },
  ur: {
    // Nav
    'nav.home': 'ہوم',
    'nav.products': 'پروڈکٹس',
    'nav.manufacturing': 'مینوفیکچرنگ',
    'nav.about': 'ہمارے بارے میں',
    'nav.contact': 'رابطہ',
    'nav.getQuote': 'کوٹیشن حاصل کریں',
    'nav.factoryLocation': 'فیکٹری: ناظم آباد، کراچی، پاکستان',
    'nav.tagline': 'کیپ مینوفیکچرر اور ایکسپورٹر',

    // Hero
    'hero.badge': 'کراچی فیکٹری ہب • عالمی کیپ مینوفیکچرر',
    'hero.titleLine1': 'پریمیم کیپس۔',
    'hero.titleLine2': 'عالمی معیار۔',
    'hero.description': 'اورا گلوبل انڈسٹریز ناظم آباد، کراچی میں قائم ایک مستند کیپ مینوفیکچرنگ فیکٹری ہے، جو جدید پروڈکشن، کسٹم ڈیزائنز اور بہترین فیبرک کے ساتھ ملکی اور بین الاقوامی برانڈز کو سپلائی کرتی ہے۔',
    'hero.exploreBtn': 'کلیکشن دیکھیں',
    'hero.factoryBtn': 'ہماری فیکٹری',
    'hero.quoteBtn': 'کوٹیشن حاصل کریں',
    'hero.metricWorkflow': 'ورک فلو',
    'hero.metricService': 'سروس',
    'hero.metricLogistics': 'لاجسٹکس',
    'hero.metric10Step': '10 مرحلہ کوالٹی چیک',
    'hero.metricOEM': 'OEM / ODM آرڈرز',
    'hero.metricDirectExport': 'براہ راست ایکسپورٹ',
    'hero.factoryHub': 'فیکٹری یونٹ',
    'hero.productionUnit': 'کراچی پروڈکشن یونٹ',
    'hero.execPartners': 'ایگزیکٹو پارٹنرز',
    'hero.quoteBanner': '“ہم معیاری مٹیریل، جدید ڈیزائن اور شاندار کاریگری کے ساتھ اعلیٰ ترین کیپس تیار کرتے ہیں۔”',

    // Modals & CTA
    'quote.title': 'مینوفیکچرنگ کوٹیشن کی درخواست',
    'quote.subtitle': 'کراچی فیکٹری پروڈکشن ڈیسک سے بلک قیمتیں حاصل کریں',
    'quote.fullName': 'پورا نام',
    'quote.email': 'ای میل ایڈریس',
    'quote.phone': 'فون / واٹس ایپ نمبر',
    'quote.company': 'کمپنی / برانڈ کا نام',
    'quote.productType': 'پروڈکٹ کیٹگری',
    'quote.quantity': 'تعداد (کم از کم MOQ: 100 پیسز)',
    'quote.notes': 'کسٹم کڑھائی اور برانڈنگ تفصیلات',
    'quote.submit': 'کوٹیشن جمع کروائیں',

    // WhatsApp
    'wa.chat': 'واٹس ایپ رابطہ',
    'wa.directDesk': 'ڈائریکٹ ایکسپورٹ ڈیسک',
    'wa.avgReply': 'جواب کا اوسط وقت: 15 منٹ',
    'wa.verifiedFactory': 'تصدیق شدہ فیکٹری',
    'wa.startChat': 'واٹس ایپ پر بات کریں'
  },
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.manufacturing': 'التصنيع',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.getQuote': 'طلب عرض أسعار',
    'nav.factoryLocation': 'المصنع: ناظم آباد، كراتشي، باكستان',
    'nav.tagline': 'مصنع ومصدّر القبعات الفاخرة',

    // Hero
    'hero.badge': 'مركز تصنيع كراتشي • مصنّع قبعات عالمي',
    'hero.titleLine1': 'قبعات فاخرة.',
    'hero.titleLine2': 'جودة عالمية.',
    'hero.description': 'شركة أورا جلوبال إندستريز هي مصنع رائد للقبعات مقره كراتشي، باكستان، يقدم تصنيعاً متميزاً وتصاميم مخصصة وأقمشة عالية الجودة للتصدير إلى الأسواق العالمية.',
    'hero.exploreBtn': 'استكشف المجموعة',
    'hero.factoryBtn': 'مصنعنا',
    'hero.quoteBtn': 'طلب عرض أسعار',
    'hero.metricWorkflow': 'سير العمل',
    'hero.metricService': 'الخدمة',
    'hero.metricLogistics': 'الشحن والتصدير',
    'hero.metric10Step': 'فحص جودة من 10 خطوات',
    'hero.metricOEM': 'تصنيع OEM / ODM',
    'hero.metricDirectExport': 'تصدير مباشر للخليج والعالم',
    'hero.factoryHub': 'مركز المصنع',
    'hero.productionUnit': 'وحدة إنتاج كراتشي',
    'hero.execPartners': 'الشركاء التنفيذيون',
    'hero.quoteBanner': '“نصنع قبعات تجمع بين المواد الفاخرة، التصميم العصري، والحرفية الاحترافية.”',

    // Modals & CTA
    'quote.title': 'طلب عرض أسعار التصنيع',
    'quote.subtitle': 'احصل على أسعار مخصصة للكميات من مكتب الإنتاج بمصنع كراتشي',
    'quote.fullName': 'الاسم الكامل',
    'quote.email': 'البريد الإلكتروني',
    'quote.phone': 'الهاتف / واتساب',
    'quote.company': 'اسم الشركة / العلامة التجارية',
    'quote.productType': 'فئة المنتج',
    'quote.quantity': 'الكمية المقدرة (الحد الأدنى: 100 قطعة)',
    'quote.notes': 'المواصفات وتطريز الشعار المطلوب',
    'quote.submit': 'إرسال طلب السعر',

    // WhatsApp
    'wa.chat': 'محادثة واتساب',
    'wa.directDesk': 'مكتب التصدير المباشر',
    'wa.avgReply': 'متوسط الرد: أقل من 15 دقيقة',
    'wa.verifiedFactory': 'مصنع معتمد',
    'wa.startChat': 'بدء المحادثة عبر واتساب'
  },
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.products': 'Productos',
    'nav.manufacturing': 'Fabricación',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.getQuote': 'Pedir Cotización',
    'nav.factoryLocation': 'Fábrica: Nazimabad, Karachi, Pakistán',
    'nav.tagline': 'Fabricante y Exportador de Gorras',

    // Hero
    'hero.badge': 'Centro Industrial Karachi • Fabricante Global',
    'hero.titleLine1': 'GORRAS PREMIUM.',
    'hero.titleLine2': 'CALIDAD GLOBAL.',
    'hero.description': 'Aura Global Industries es un fabricante profesional de gorras con sede en Karachi, Pakistán, que ofrece producción moderna, diseños personalizados y telas de alta calidad para marcas internacionales.',
    'hero.exploreBtn': 'Ver Colección',
    'hero.factoryBtn': 'Nuestra Fábrica',
    'hero.quoteBtn': 'Pedir Cotización',
    'hero.metricWorkflow': 'Flujo de Trabajo',
    'hero.metricService': 'Servicio',
    'hero.metricLogistics': 'Exportación',
    'hero.metric10Step': 'Control 10 Pasos',
    'hero.metricOEM': 'OEM / ODM',
    'hero.metricDirectExport': 'Exportación Directa',
    'hero.factoryHub': 'Centro de Fábrica',
    'hero.productionUnit': 'Unidad de Producción Karachi',
    'hero.execPartners': 'Socios Ejecutivos',
    'hero.quoteBanner': '“Fabricamos gorras que combinan materiales de primera calidad, diseño moderno y mano de obra profesional.”',

    // Modals & CTA
    'quote.title': 'Solicitar Cotización de Fabricación',
    'quote.subtitle': 'Obtenga precios por volumen directamente de nuestra planta en Karachi',
    'quote.fullName': 'Nombre Completo',
    'quote.email': 'Correo Electrónico',
    'quote.phone': 'Teléfono / WhatsApp',
    'quote.company': 'Empresa / Marca',
    'quote.productType': 'Categoría de Producto',
    'quote.quantity': 'Cantidad Estimada (MOQ: 100 uds)',
    'quote.notes': 'Especificaciones y Bordados',
    'quote.submit': 'Enviar Solicitud',

    // WhatsApp
    'wa.chat': 'Chat de WhatsApp',
    'wa.directDesk': 'Mesa de Exportación Directa',
    'wa.avgReply': 'Respuesta media: < 15 min',
    'wa.verifiedFactory': 'Fábrica Verificada',
    'wa.startChat': 'Iniciar Chat en WhatsApp'
  },
  de: {
    // Nav
    'nav.home': 'Startseite',
    'nav.products': 'Produkte',
    'nav.manufacturing': 'Fertigung',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.getQuote': 'Angebot anfordern',
    'nav.factoryLocation': 'Fabrik: Nazimabad, Karachi, Pakistan',
    'nav.tagline': 'Kappenhersteller & Exporteur',

    // Hero
    'hero.badge': 'Karatschi Fabrik-Hub • Globaler Kappenhersteller',
    'hero.titleLine1': 'PREMIUM KAPPEN.',
    'hero.titleLine2': 'GLOBALE QUALITÄT.',
    'hero.description': 'Aura Global Industries ist ein professioneller Kappenhersteller mit Sitz in Karatschi, Pakistan, der erstklassige Headwear mit moderner Fertigung und zuverlässiger Produktion liefert.',
    'hero.exploreBtn': 'Kollektion erkunden',
    'hero.factoryBtn': 'Unsere Fabrik',
    'hero.quoteBtn': 'Angebot anfordern',
    'hero.metricWorkflow': 'Workflow',
    'hero.metricService': 'Service',
    'hero.metricLogistics': 'Logistik',
    'hero.metric10Step': '10-Stufen QS',
    'hero.metricOEM': 'OEM / ODM',
    'hero.metricDirectExport': 'Direktexport',
    'hero.factoryHub': 'Fabrik-Standort',
    'hero.productionUnit': 'Karatschi Produktionseinheit',
    'hero.execPartners': 'Geschäftsführende Gesellschafter',
    'hero.quoteBanner': '„Wir fertigen Kappen, die hochwertige Materialien, modernes Design und präzise Handwerkskunst vereinen.“',

    // Modals & CTA
    'quote.title': 'Fertigungsangebot anfordern',
    'quote.subtitle': 'Erhalten Sie individuelle Mengenpreise direkt aus unserer Fabrik in Karatschi',
    'quote.fullName': 'Vollständiger Name',
    'quote.email': 'E-Mail-Adresse',
    'quote.phone': 'Telefon / WhatsApp',
    'quote.company': 'Unternehmen / Marke',
    'quote.productType': 'Produktkategorie',
    'quote.quantity': 'Geschätzte Menge (Mindestbestellmenge: 100 Stk.)',
    'quote.notes': 'Spezifikationen & Stickanforderungen',
    'quote.submit': 'Angebotsanfrage absenden',

    // WhatsApp
    'wa.chat': 'WhatsApp Chat',
    'wa.directDesk': 'Direkter Export-Desk',
    'wa.avgReply': 'Antwortzeit: < 15 Min.',
    'wa.verifiedFactory': 'Geprüfter Hersteller',
    'wa.startChat': 'WhatsApp Chat starten'
  }
};

interface LanguageContextType {
  currentLanguage: LanguageCode;
  currentLanguageOption: LanguageOption;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aura_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) return saved;
    }
    return 'en';
  });

  const currentLanguageOption = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  const isRTL = currentLanguageOption.dir === 'rtl';

  const setLanguage = (code: LanguageCode) => {
    if (TRANSLATIONS[code]) {
      setCurrentLanguage(code);
      if (typeof window !== 'undefined') {
        localStorage.setItem('aura_lang', code);
      }
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[currentLanguage];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const defaultDict = TRANSLATIONS.en;
    if (defaultDict && defaultDict[key]) {
      return defaultDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, currentLanguageOption, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
