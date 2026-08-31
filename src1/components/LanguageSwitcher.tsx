import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'expanded';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'compact',
  className = ''
}) => {
  const { currentLanguage, currentLanguageOption, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      id="language-switcher-container"
      className={`relative inline-block text-left select-none ${className}`}
    >
      {/* Trigger Button */}
      <button
        id="language-toggle-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[#141414] hover:bg-[#1C1C1C] border border-white/15 hover:border-amber-500/50 text-zinc-300 hover:text-white transition-all text-xs font-mono font-medium cursor-pointer shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Switch Language / زبان تبدیل کریں"
      >
        <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="text-[11px] uppercase tracking-wider font-semibold">
          {currentLanguageOption.code.toUpperCase()}
        </span>
        <span className="text-xs">{currentLanguageOption.flag}</span>
        <ChevronDown
          className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-amber-400' : ''
          }`}
        />
      </button>

      {/* Sleek Floating Dropdown Menu */}
      {isOpen && (
        <div
          id="language-dropdown-menu"
          className="absolute right-0 mt-1.5 w-44 rounded-sm bg-[#0E0E0E] border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1.5 border-b border-white/10 text-[9px] font-mono uppercase tracking-widest text-zinc-500 flex items-center justify-between">
            <span>Select Language</span>
            <span className="text-amber-500/80">Global Export</span>
          </div>

          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 text-amber-400 font-semibold'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-sans text-xs">{lang.nativeName}</span>
                      <span className="text-[9px] font-mono text-zinc-500">{lang.label}</span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
