import React from 'react';
import { PageId } from '../types';
import { AuraLogo } from './AuraLogo';
import { SocialLinks } from './SocialLinks';
import {
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Globe2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0A0A0A] border-t border-white/10 text-zinc-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <AuraLogo size="md" showTagline={true} onClick={() => handleNav('home')} />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm pt-2">
              <strong className="text-white font-medium">Aura Global Industries</strong> is an international cap manufacturer & exporter located in Karachi, Pakistan. Specializing in private label headwear, bespoke embroidery, custom designs, and high-volume export manufacturing.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-zinc-900 border border-[#D4AF37]/30 text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                <Globe2 className="w-3 h-3" /> Export Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-zinc-900 border border-white/10 text-[10px] uppercase tracking-wider text-zinc-300">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> Quality Assured
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-medium">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('manufacturing')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Manufacturing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Partners Information */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-heading">
              Executive Partners
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-sm bg-zinc-900/70 border border-white/5">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Syed Hashim Hussain Rizvi</p>
                <p className="text-[11px] text-[#D4AF37] font-semibold">Partner</p>
                <p className="text-[11px] text-zinc-400 mt-1">Strategic Operations & Global Export Relations</p>
              </div>

              <div className="p-3 rounded-sm bg-zinc-900/70 border border-white/5">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Syed Masoom Raza</p>
                <p className="text-[11px] text-[#D4AF37] font-semibold">Partner</p>
                <p className="text-[11px] text-zinc-400 mt-1">Technical Manufacturing & Quality Engineering</p>
              </div>
            </div>
          </div>

          {/* Contact & Factory Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-heading">
              Factory Hub
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Nazimabad, Karachi, Pakistan</p>
                  <p className="text-[11px] text-zinc-500">Hub of Headwear Manufacturing</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:auraglobalindustries@gmail.com"
                    className="text-zinc-200 hover:text-[#D4AF37] transition-colors break-all"
                  >
                    auraglobalindustries@gmail.com
                  </a>
                  <p className="text-[11px] text-zinc-500">Official B2B Inquiries</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="footer-quote-btn"
                  onClick={onOpenQuoteModal}
                  className="w-full sleek-btn-primary py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Request Custom Production</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                Official Channels
              </span>
              <SocialLinks variant="compact" />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-zinc-500">
          <p>© 2026 Aura Global Industries. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:auraglobalindustries@gmail.com" className="hover:text-white transition-colors">auraglobalindustries@gmail.com</a>
            <span>•</span>
            <span>Nazimabad, Karachi, Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

