import React from 'react';

interface AuraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showTagline?: boolean;
  variant?: 'full' | 'emblem-only' | 'badge';
  className?: string;
  onClick?: () => void;
}

export const AuraLogo: React.FC<AuraLogoProps> = ({
  size = 'md',
  showTagline = true,
  variant = 'full',
  className = '',
  onClick
}) => {
  const sizeConfig = {
    sm: { height: 38, width: showTagline ? 180 : 150, emblemSize: 34 },
    md: { height: 48, width: showTagline ? 230 : 190, emblemSize: 44 },
    lg: { height: 64, width: showTagline ? 290 : 240, emblemSize: 58 },
    xl: { height: 80, width: showTagline ? 360 : 300, emblemSize: 76 },
    '2xl': { height: 110, width: showTagline ? 480 : 400, emblemSize: 105 },
    hero: { height: 160, width: showTagline ? 620 : 520, emblemSize: 150 }
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}
      id="aura-brand-logo"
      title="Aura Global Industries - Together For A Stronger Future"
    >
      {/* 3D Metallic AG Globe Emblem SVG */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: currentSize.emblemSize, height: currentSize.emblemSize }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gold Metallic Gradients */}
            <linearGradient id="agGoldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="25%" stopColor="#F5B731" />
              <stop offset="50%" stopColor="#DF8918" />
              <stop offset="75%" stopColor="#F9D462" />
              <stop offset="100%" stopColor="#A85707" />
            </linearGradient>

            <linearGradient id="agGoldGradDark" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="40%" stopColor="#B45309" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>

            <linearGradient id="agGoldBevel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="30%" stopColor="#FBBF24" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            {/* Silver Chrome Metallic Gradients */}
            <linearGradient id="agSilverChrome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#E5E7EB" />
              <stop offset="45%" stopColor="#9CA3AF" />
              <stop offset="70%" stopColor="#4B5563" />
              <stop offset="85%" stopColor="#D1D5DB" />
              <stop offset="100%" stopColor="#1F2937" />
            </linearGradient>

            <linearGradient id="agSilverShine" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="50%" stopColor="#F3F4F6" />
              <stop offset="100%" stopColor="#9CA3AF" />
            </linearGradient>

            {/* Globe Gradients */}
            <radialGradient id="agGlobeBg" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            <linearGradient id="agGlobeRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <filter id="agGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND GLOBE WITH GOLD CONTINENT MESH */}
          <g transform="translate(45, 0)">
            {/* Globe Sphere */}
            <circle cx="95" cy="65" r="48" fill="url(#agGlobeBg)" stroke="url(#agGoldBevel)" strokeWidth="2.5" />
            
            {/* Lat / Long grid lines */}
            <ellipse cx="95" cy="65" rx="46" ry="18" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.6" />
            <ellipse cx="95" cy="65" rx="46" ry="34" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.6" />
            <ellipse cx="95" cy="65" rx="20" ry="46" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.6" />
            <line x1="95" y1="19" x2="95" y2="111" stroke="#D97706" strokeWidth="0.8" opacity="0.6" />
            <line x1="49" y1="65" x2="141" y2="65" stroke="#D97706" strokeWidth="0.8" opacity="0.6" />

            {/* Stylized Gold Continents Silhouette */}
            <path
              d="M75 42 Q82 38 90 44 T105 40 T120 48 T128 60 Q122 70 115 68 T102 75 T88 70 T75 58 Z"
              fill="url(#agGoldGradLight)"
              opacity="0.85"
            />
            <path
              d="M85 75 Q92 78 98 86 T94 98 T84 92 T80 82 Z"
              fill="url(#agGoldGradLight)"
              opacity="0.8"
            />
            <path
              d="M110 72 Q120 74 126 84 T118 92 T108 85 Z"
              fill="url(#agGoldGradLight)"
              opacity="0.8"
            />

            {/* Back portion of Gold Orbital Halo Ring */}
            <path
              d="M32 68 C35 38 90 20 152 35 C170 39 178 48 174 56 C170 64 150 72 130 78"
              fill="none"
              stroke="url(#agGlobeRing)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>

          {/* 3D CHROME SILVER 'G' (INTERTWINED ON RIGHT) */}
          <g transform="translate(10, 5)">
            {/* Shadow behind G */}
            <path
              d="M102 60 C125 58 152 70 155 96 C158 122 138 148 108 150 C78 152 62 132 65 110 L90 110 C88 122 96 130 110 130 C124 130 132 118 130 102 C128 88 118 80 102 80 L102 60 Z"
              fill="#000"
              opacity="0.4"
            />

            {/* Main 3D Silver G Body */}
            <path
              d="M98 56 C124 54 154 68 156 94 C158 120 138 146 106 148 C76 150 60 130 62 108 L88 108 C86 120 94 128 108 128 C122 128 130 116 128 100 C126 86 116 78 98 78 L98 56 Z"
              fill="url(#agSilverChrome)"
              stroke="#FFF"
              strokeWidth="1.2"
            />

            {/* G Horizontal Spur Bar */}
            <path
              d="M110 98 L152 98 L152 118 L124 118 L124 106"
              fill="url(#agSilverChrome)"
              stroke="#FFF"
              strokeWidth="1"
            />
            {/* G Inner Bevel Highlight */}
            <path
              d="M100 62 C122 60 148 72 150 94 L142 94 C140 76 120 66 100 68 Z"
              fill="url(#agSilverShine)"
              opacity="0.9"
            />
          </g>

          {/* FRONT PORTION OF GOLD ORBITAL RING */}
          <g transform="translate(45, 0)">
            <path
              d="M152 35 C175 42 178 54 165 65 C145 80 95 98 42 92 C22 90 15 82 22 72 C28 64 52 56 80 50"
              fill="none"
              stroke="url(#agGoldBevel)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M150 36 C172 43 175 52 163 63 C143 78 95 96 44 90"
              fill="none"
              stroke="#FFFBEB"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* 3D SCULPTED GOLD 'A' (INTERTWINED OVER G & GLOBE) */}
          <g>
            {/* Left Leg Shadow */}
            <polygon points="78,16 98,16 38,155 12,155" fill="#000" opacity="0.3" transform="translate(3,3)" />

            {/* Left Leg of A */}
            <polygon
              points="78,16 98,16 38,155 12,155"
              fill="url(#agGoldGradLight)"
              stroke="url(#agGoldBevel)"
              strokeWidth="1.5"
            />
            {/* Left Leg Bevel Ridge */}
            <polygon points="78,16 88,16 28,155 12,155" fill="url(#agGoldGradDark)" opacity="0.65" />
            <polygon points="88,16 98,16 38,155 28,155" fill="#FFFBEB" opacity="0.4" />

            {/* Right Leg of A */}
            <polygon
              points="78,16 98,16 158,155 132,155"
              fill="url(#agGoldGradLight)"
              stroke="url(#agGoldBevel)"
              strokeWidth="1.5"
            />
            {/* Right Leg Bevel Ridge */}
            <polygon points="88,16 98,16 158,155 145,155" fill="url(#agGoldGradDark)" opacity="0.75" />
            <polygon points="78,16 88,16 145,155 132,155" fill="#FFFBEB" opacity="0.4" />

            {/* Crossbar of A */}
            <polygon
              points="38,102 135,102 142,122 30,122"
              fill="url(#agGoldGradLight)"
              stroke="url(#agGoldBevel)"
              strokeWidth="1.2"
            />
            {/* Crossbar highlight */}
            <polygon points="38,102 135,102 137,108 36,108" fill="#FFFBEB" opacity="0.7" />
            <polygon points="36,114 139,114 142,122 30,122" fill="#78350F" opacity="0.6" />

            {/* Top Peak Crown Bevel */}
            <polygon points="78,16 98,16 88,38" fill="#FEF08A" opacity="0.9" />
          </g>

          {/* GLOSS HIGHLIGHT FLARES */}
          <circle cx="88" cy="20" r="3" fill="#FFFFFF" filter="url(#agGlow)" />
          <circle cx="155" cy="95" r="2.5" fill="#FFFFFF" filter="url(#agGlow)" />
          <circle cx="34" cy="112" r="2" fill="#FFFFFF" filter="url(#agGlow)" />
        </svg>
      </div>

      {/* TYPOGRAPHY SECTION (MATCHING THE UPLOADED LOGO) */}
      {variant !== 'emblem-only' && (
        <div className="flex flex-col justify-center">
          {/* Main "AURA" with Gold 3D Sculpted Typography */}
          <div className="flex items-center">
            <span
              className="font-heading font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2A3] via-[#F59E0B] to-[#92400E] drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)] select-none"
              style={{
                fontSize: size === 'sm' ? '18px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : size === 'xl' ? '40px' : size === '2xl' ? '54px' : '72px',
                fontFamily: "'Cinzel', 'Playfair Display', serif",
                letterSpacing: '0.04em'
              }}
            >
              AURA
            </span>
          </div>

          {/* Sub "GLOBAL INDUSTRIES" in Polished Chrome Silver */}
          <div className="flex items-center -mt-0.5">
            <span
              className="font-heading font-extrabold tracking-widest leading-none text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-zinc-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] uppercase select-none"
              style={{
                fontSize: size === 'sm' ? '8px' : size === 'md' ? '11px' : size === 'lg' ? '14px' : size === 'xl' ? '18px' : size === '2xl' ? '24px' : '32px',
                letterSpacing: '0.18em'
              }}
            >
              GLOBAL INDUSTRIES
            </span>
          </div>

          {/* Tagline "TOGETHER FOR A STRONGER FUTURE" with Golden Bounding Accent Rules */}
          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-[#F59E0B] opacity-80" />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] font-semibold uppercase tracking-[0.22em] leading-none whitespace-nowrap select-none"
                style={{
                  fontSize: size === 'sm' ? '6.5px' : size === 'md' ? '8px' : size === 'lg' ? '10px' : size === 'xl' ? '12px' : size === '2xl' ? '15px' : '18px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              >
                TOGETHER FOR A STRONGER FUTURE
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#F59E0B] to-[#F59E0B] opacity-80" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
