import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface SocialLinksProps {
  variant?: 'compact' | 'expanded' | 'minimal';
  className?: string;
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'compact',
  className = '',
  showLabels = false
}) => {
  const socials = [
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@auraglobalindustries',
      url: COMPANY_INFO.socialLinks?.tiktok || 'https://www.tiktok.com/@auraglobalindustries',
      color: 'hover:text-[#25F4EE] hover:border-[#FE2C55]/60 hover:shadow-[0_0_12px_rgba(254,44,85,0.3)]',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="15"
          height="15"
          fill="currentColor"
          className="shrink-0"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.83 4.46 6.27 6.27 0 0 0 1.88-4.46V8.62a8.28 8.28 0 0 0 4.88 1.58V6.75a4.83 4.83 0 0 1-1-.06Z" />
        </svg>
      )
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: 'Aura Global Video',
      url: COMPANY_INFO.socialLinks?.instagram || 'https://www.instagram.com/reel/DcEx96bqdZd/?igsh=anF6ZWZlbW5laDVs',
      color: 'hover:text-[#E1306C] hover:border-[#E1306C]/60 hover:shadow-[0_0_12px_rgba(225,48,108,0.3)]',
      icon: <Instagram className="w-4 h-4 shrink-0" />
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'asifrizvi',
      url: COMPANY_INFO.socialLinks?.facebook || 'https://www.facebook.com/asifrizvi',
      color: 'hover:text-[#1877F2] hover:border-[#1877F2]/60 hover:shadow-[0_0_12px_rgba(24,119,242,0.3)]',
      icon: <Facebook className="w-4 h-4 shrink-0" />
    }
  ];

  if (variant === 'expanded') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            id={`social-link-${s.id}`}
            className={`p-3.5 rounded-sm bg-[#121212] border border-white/10 hover:bg-[#1A1A1A] transition-all flex items-center gap-3 text-zinc-300 ${s.color} group`}
            title={`Visit ${s.name} (${s.handle})`}
          >
            <div className="p-2 rounded-sm bg-zinc-900 border border-white/10 group-hover:border-current transition-colors">
              {s.icon}
            </div>
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-bold font-heading text-white uppercase tracking-wider group-hover:text-current transition-colors">
                {s.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 truncate">
                {s.handle}
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {socials.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          id={`social-icon-${s.id}`}
          className={`p-2 rounded-sm bg-zinc-900/90 border border-white/10 text-zinc-400 hover:text-white transition-all ${s.color} flex items-center gap-1.5 shadow-sm`}
          aria-label={`${s.name} - ${s.handle}`}
          title={`${s.name}: ${s.handle}`}
        >
          {s.icon}
          {showLabels && (
            <span className="text-[11px] font-medium tracking-wide pr-1">
              {s.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};
