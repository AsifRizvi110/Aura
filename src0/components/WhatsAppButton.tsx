import React, { useState } from 'react';
import { AuraLogo } from './AuraLogo';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowUpRight,
  Clock
} from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '923421509973',
  defaultMessage = 'Hello Aura Global Industries! I am interested in custom cap manufacturing for my brand. Please share pricing and catalogue details.'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState(defaultMessage);

  const presetMessages = [
    {
      label: 'Request Cap Quote',
      text: 'Hi Aura Global Industries, I would like to get a quote for a custom bulk cap manufacturing order.'
    },
    {
      label: 'Sample / Prototype',
      text: 'Hi! Can you provide lead times and cost for 1-5 pre-production physical samples with 3D embroidery?'
    },
    {
      label: 'MOQ & Export Rates',
      text: 'Hi, what is your standard MOQ and air/ocean freight shipping options from Karachi to our location?'
    }
  ];

  const handleOpenWhatsApp = (messageText: string) => {
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="whatsapp-floating-container"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none"
    >
      {/* Interactive Chat Popup Card */}
      {isOpen && (
        <div
          id="whatsapp-chat-popup"
          className="mb-3 w-[320px] sm:w-[360px] bg-[#0E0E0E] border border-emerald-500/40 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-zinc-200 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200"
        >
          {/* Header */}
          <div className="bg-[#121212] px-4 py-3.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AuraLogo size="sm" showTagline={false} variant="emblem-only" />
                {/* Active Online Pulse Dot */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                    Aura Global Industries
                  </h4>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 py-0.2 rounded-sm font-mono uppercase font-bold">
                    Direct
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F27D26]" /> Nazimabad, Karachi • Factory Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-sm text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close WhatsApp card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3.5 bg-[#090909]">
            {/* Direct Notice */}
            <div className="p-2.5 rounded-sm bg-[#141414] border border-white/5 space-y-1">
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Connect directly with our export production team for instant sample inquiries, tech pack reviews, and bulk cap quotation.
              </p>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> Avg. reply: Under 15 mins
                </span>
                <span className="text-[#F27D26] flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Verified Factory
                </span>
              </div>
            </div>

            {/* Quick Prompt Options */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                Quick Template Messages:
              </span>
              <div className="flex flex-col gap-1.5">
                {presetMessages.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCustomMsg(preset.text);
                      handleOpenWhatsApp(preset.text);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-sm bg-[#121212] hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 text-[11px] text-zinc-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">{preset.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[10px] font-mono uppercase text-zinc-400">
                Or write your custom inquiry:
              </label>
              <textarea
                rows={2}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-2.5 py-1.5 rounded-sm bg-[#121212] border border-white/15 focus:border-emerald-500 focus:outline-none text-xs text-white placeholder:text-zinc-600 resize-none font-sans"
              />
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleOpenWhatsApp(customMsg)}
              className="w-full py-2.5 px-4 rounded-sm bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Start WhatsApp Chat</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modern Floating Trigger Button with Radar Pulse Animations */}
      <div className="relative group flex flex-row-reverse items-center gap-3">
        <button
          id="whatsapp-floating-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0E0E0E] border-2 border-emerald-500/70 hover:border-emerald-400 flex items-center justify-center text-white shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all duration-300 cursor-pointer group-hover:scale-105"
          aria-label="Open WhatsApp Chat with Aura Global Industries"
        >
          {/* Concentric Radar Ping Waves */}
          <span className="absolute -inset-1.5 rounded-full bg-emerald-500/20 animate-ping opacity-75 pointer-events-none" />
          <span className="absolute -inset-3 rounded-full border border-emerald-500/30 animate-pulse pointer-events-none" />

          {/* Metallic Inner Ring */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 flex items-center justify-center shadow-inner">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white transition-transform group-hover:scale-110 duration-200" />
          </div>

          {/* Active Status Badge */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#0E0E0E]" />
          </span>
        </button>

        {/* Hover Pill Tooltip */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0E0E0E]/95 backdrop-blur-md border border-emerald-500/40 text-xs text-zinc-200 shadow-xl cursor-pointer hover:border-emerald-400 transition-all group-hover:-translate-x-1"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-emerald-400">
              WhatsApp Chat
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">• Direct Export Desk</span>
          </div>
        )}
      </div>
    </div>
  );
};
