import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { AuraLogo } from './AuraLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinks } from './SocialLinks';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, ArrowUpRight, Mail, MapPin } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuoteModal
}) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; labelKey: string; defaultLabel: string }[] = [
    { id: 'home', labelKey: 'nav.home', defaultLabel: 'Home' },
    { id: 'products', labelKey: 'nav.products', defaultLabel: 'Products' },
    { id: 'manufacturing', labelKey: 'nav.manufacturing', defaultLabel: 'Manufacturing' },
    { id: 'about', labelKey: 'nav.about', defaultLabel: 'About' },
    { id: 'contact', labelKey: 'nav.contact', defaultLabel: 'Contact' }
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#0F0F0F]/95 backdrop-blur-md border-white/10 py-3 shadow-2xl'
          : 'bg-[#0F0F0F] border-white/10 py-3.5'
      }`}
    >
      {/* Top Micro-Bar for Export Manufacturing Credibility */}
      <div className="hidden lg:block border-b border-white/5 pb-2 mb-2 text-[11px] text-zinc-400">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
              <span className="text-white font-medium">{t('nav.factoryLocation', 'Factory: Nazimabad, Karachi, Pakistan')}</span>
            </span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-400 uppercase tracking-widest text-[10px]">{t('nav.tagline', 'Cap Manufacturer & Exporter')}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:auraglobalindustries@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#F27D26] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F27D26]" />
              auraglobalindustries@gmail.com
            </a>
            <span className="text-zinc-700">|</span>
            <SocialLinks variant="compact" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Company Logo */}
        <AuraLogo
          size="md"
          showTagline={!isScrolled}
          onClick={() => handleNavClick('home')}
        />

        {/* Desktop Navigation Links (Sleek uppercase tracking-widest) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-widest">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t(item.labelKey, item.defaultLabel)}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#F27D26]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA & Language Switcher Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

          <button
            id="nav-get-quote-btn"
            onClick={onOpenQuoteModal}
            className="sleek-btn-white px-5 py-2 rounded-sm hover:bg-[#F27D26] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
          >
            <span>{t('nav.getQuote', 'Get a Quote')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Controls (Language Switcher + Quote + Hamburger) */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />

          <button
            id="mobile-quote-btn"
            onClick={onOpenQuoteModal}
            className="sleek-btn-primary px-2.5 py-1.5 rounded-sm text-[10px] uppercase font-bold"
          >
            {t('nav.getQuote', 'Quote')}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-sm bg-zinc-900 border border-white/10 text-zinc-200 hover:text-white cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-[#0A0A0A] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-sm text-sm uppercase tracking-wider font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#F27D26]/10 text-[#F27D26] border-l-2 border-[#F27D26]'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {t(item.labelKey, item.defaultLabel)}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full sleek-btn-primary py-3 rounded-sm text-center font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>{t('nav.getQuote', 'Get a Custom Quote')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="text-xs text-zinc-400 space-y-1.5 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
                Nazimabad, Karachi, Pakistan
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F27D26]" />
                auraglobalindustries@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
